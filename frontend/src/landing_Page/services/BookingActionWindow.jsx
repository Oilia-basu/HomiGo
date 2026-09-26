import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import axios from "axios";
import GeneralContext from "./GeneralContext";

const BookingActionWindow = ({ service }) => {
  const { closeBookingWindow } = useContext(GeneralContext);

  // =====================================================
  // STATES
  // =====================================================

  const [quantity, setQuantity] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");

  // Phone number
  const [phoneNo, setPhoneNo] = useState("");

  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Bootstrap validation
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState("");

  // Promo
  const [isFirstOrder, setIsFirstOrder] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [checkingOrders, setCheckingOrders] = useState(true);

  // Window position
  const [position, setPosition] = useState({
    x: null,
    y: null,
  });

  const [isDragging, setIsDragging] = useState(false);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  // =====================================================
  // PRICE CALCULATION
  // =====================================================

  const price = Number(service?.price || 0);

  const subtotal = quantity * price;

  const discountAmount =
    isFirstOrder && promoCode === "WELCOME20"
      ? subtotal * 0.2
      : 0;

  const totalAmount = subtotal - discountAmount;

  // =====================================================
  // LOAD USER + CHECK FIRST ORDER
  // =====================================================

  useEffect(() => {
    const loadUserAndOrders = async () => {
      try {
        // -----------------------------------------------
        // LOAD LOGGED-IN USER
        // -----------------------------------------------

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);

            // Load phone number from user profile
            setPhoneNo(
              String(parsedUser?.phoneNo || "")
            );
          } catch (error) {
            console.error(
              "Unable to read saved user:",
              error
            );
          }
        }

        // -----------------------------------------------
        // CHECK PREVIOUS ORDERS
        // -----------------------------------------------

        if (!savedUser) {
          setIsFirstOrder(false);
          setPromoCode("");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mybookings`,
          {
            withCredentials: true,
          }
        );

        const orders =
          response.data.bookings ||
          response.data ||
          [];

        console.log(
          "Previous orders:",
          orders
        );

        if (orders.length === 0) {
          // First order
          setIsFirstOrder(true);
          setPromoCode("WELCOME20");
        } else {
          // Existing customer
          setIsFirstOrder(false);
          setPromoCode("");
        }
      } catch (error) {
        console.error(
          "Error checking previous orders:",
          error
        );

        // If we cannot verify orders,
        // do not give the discount.
        setIsFirstOrder(false);
        setPromoCode("");
      } finally {
        setCheckingOrders(false);
      }
    };

    loadUserAndOrders();
  }, []);

  // =====================================================
  // DRAGGING
  // =====================================================

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const windowElement =
      e.currentTarget.parentElement;

    const rect =
      windowElement.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setPosition({
      x: rect.left,
      y: rect.top,
    });

    setIsDragging(true);

    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const windowElement = document.querySelector(
      ".homigo-booking-window"
    );

    if (!windowElement) return;

    const windowWidth =
      windowElement.offsetWidth;

    const windowHeight =
      windowElement.offsetHeight;

    const maxX = Math.max(
      0,
      window.innerWidth - windowWidth
    );

    const maxY = Math.max(
      0,
      window.innerHeight - windowHeight
    );

    let newX =
      e.clientX - dragOffset.current.x;

    let newY =
      e.clientY - dragOffset.current.y;

    newX = Math.max(
      0,
      Math.min(newX, maxX)
    );

    newY = Math.max(
      0,
      Math.min(newY, maxY)
    );

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener(
        "mousemove",
        handleMouseMove
      );

      document.addEventListener(
        "mouseup",
        handleMouseUp
      );
    }

    return () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [isDragging]);

  // =====================================================
  // BOOKING
  // =====================================================

  const handleBooking = async () => {
    // Show Bootstrap validation
    setValidated(true);
    setFormError("");

    // -----------------------------------------------
    // CHECK LOGIN
    // -----------------------------------------------

    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      setFormError(
        "Please login before booking a service."
      );
      return;
    }

    let currentUser;

    try {
      currentUser = JSON.parse(savedUser);
    } catch (error) {
      console.error(
        "Invalid saved user:",
        error
      );

      setFormError(
        "Your login session is invalid. Please login again."
      );

      return;
    }

    // -----------------------------------------------
    // CLEAN VALUES
    // -----------------------------------------------

    const cleanedAddress =
      address.trim();

    const cleanedPhone =
      phoneNo.trim();

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    const isPhoneValid =
      /^\d{10}$/.test(cleanedPhone);

    if (
      !bookingDate ||
      !bookingTime ||
      !cleanedAddress ||
      !cleanedPhone ||
      !isPhoneValid
    ) {
      setFormError(
        "Please correct the highlighted fields before booking."
      );

      return;
    }

    try {
      setLoading(true);

      // =================================================
      // BOOKING DATA
      // =================================================

      const bookingData = {
        user: currentUser?._id,

        service: service._id,

        provider:
          "65f987654321abcdef654321",

        serviceName: service.name,

        bookingTime,

        bookingDate,

        quantity,

        // Original service price
        price,

        // Before discount
        subtotal,

        // Promo
        promoCode:
          isFirstOrder &&
          promoCode === "WELCOME20"
            ? "WELCOME20"
            : null,

        // Discount %
        discountPercentage:
          discountAmount > 0
            ? 20
            : 0,

        // Discount amount
        discountAmount,

        // Final amount
        totalAmount,

        status: "pending",

        paymentStatus: "pending",

        // Customer information
        phoneNo: cleanedPhone,

        address: cleanedAddress,
      };

      console.log(
        "Booking Data:",
        bookingData
      );

      // =================================================
      // CREATE BOOKING
      // =================================================

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/newbooking`,
          bookingData,
          {
            withCredentials: true,
          }
        );

      console.log(
        "Booking successful:",
        response.data
      );

      // =================================================
      // SHOW SUCCESS SCREEN
      // =================================================

      setBookingSuccess(true);

      // =================================================
      // CLOSE AFTER 2 SECONDS
      // =================================================

      setTimeout(() => {
        closeBookingWindow();
      }, 2000);

    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      // Show error inside form
      setFormError(
        error.response?.data?.message ||
          "Something went wrong while booking the service."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    closeBookingWindow();
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className={`homigo-booking-window card shadow-lg border-0 ${
        isDragging
          ? "opacity-75"
          : ""
      }`}
      style={
        position.x !== null
          ? {
              position: "fixed",
              left: `${position.x}px`,
              top: `${position.y}px`,
              right: "auto",
              bottom: "auto",

              width: "400px",
              maxWidth:
                "calc(100vw - 30px)",

              maxHeight:
                "calc(100vh - 30px)",

              overflowY: "auto",

              zIndex: 1050,
            }
          : {
              position: "fixed",

              right: "20px",
              bottom: "20px",

              width: "400px",
              maxWidth:
                "calc(100vw - 30px)",

              maxHeight:
                "calc(100vh - 30px)",

              overflowY: "auto",

              zIndex: 1050,
            }
      }
    >

      {/* =================================================
          SUCCESS SCREEN
      ================================================= */}

      {bookingSuccess ? (
        <>
          <style>
            {`
              @keyframes successCircle {
                0% {
                  transform: scale(0);
                  opacity: 0;
                }

                60% {
                  transform: scale(1.15);
                  opacity: 1;
                }

                100% {
                  transform: scale(1);
                  opacity: 1;
                }
              }

              @keyframes checkDraw {
                0% {
                  stroke-dashoffset: 60;
                }

                100% {
                  stroke-dashoffset: 0;
                }
              }

              @keyframes successText {
                0% {
                  transform: translateY(10px);
                  opacity: 0;
                }

                100% {
                  transform: translateY(0);
                  opacity: 1;
                }
              }

              .success-circle-animation {
                animation:
                  successCircle
                  0.45s
                  ease-out
                  forwards;
              }

              .success-check-animation {
                stroke-dasharray: 60;
                stroke-dashoffset: 60;
                animation:
                  checkDraw
                  0.45s
                  0.25s
                  ease-out
                  forwards;
              }

              .success-text-animation {
                animation:
                  successText
                  0.4s
                  0.35s
                  ease-out
                  both;
              }
            `}
          </style>

          <div
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{
              minHeight: "250px",
              padding: "30px 20px",
              backgroundColor: "#ffffff",
            }}
          >

            {/* Animated Circle */}

            <div
              className="success-circle-animation"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#d1fae5",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                marginBottom: "15px",

                boxShadow:
                  "0 5px 20px rgba(0, 191, 166, 0.20)",
              }}
            >

              {/* Animated Tick */}

              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M10 25L20 35L38 14"
                  stroke="#00BFA6"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="success-check-animation"
                />
              </svg>

            </div>

            {/* Animated Text */}

            <div className="success-text-animation">

              <h5
                className="fw-bold mb-1"
                style={{
                  color: "#1f2937",
                }}
              >
                Booking Confirmed!
              </h5>

              <p
                className="text-secondary mb-0"
                style={{
                  fontSize: "14px",
                }}
              >
                Your service has been booked successfully.
              </p>

            </div>

          </div>
        </>

      ) : (

        /* =================================================
           NORMAL BOOKING UI
        ================================================= */

        <>

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="card-header border-0 text-white d-flex align-items-center justify-content-between py-2 px-3"
            style={{
              backgroundColor: "#00BFA6",

              cursor: isDragging
                ? "grabbing"
                : "grab",

              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
            onMouseDown={handleMouseDown}
          >

            <div>

              <h6 className="mb-0 fw-semibold">
                Book Service
              </h6>

              <small
                style={{
                  fontSize: "11px",
                  opacity: 0.8,
                }}
              >
                Schedule your home service
              </small>

            </div>

            <button
              type="button"
              className="btn btn-sm text-white border-0 rounded-circle"
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.15)",

                width: "28px",
                height: "28px",
                padding: 0,
              }}
              onMouseDown={(e) =>
                e.stopPropagation()
              }
              onClick={handleCancel}
            >
              ×
            </button>

          </div>

          {/* =================================================
              SERVICE INFO
          ================================================= */}

          <div
            className="px-3 py-2"
            style={{
              backgroundColor: "#f8fafc",
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <div className="fw-semibold">
                  {service?.name}
                </div>

                <small className="text-secondary">
                  Professional home service
                </small>

              </div>

              <div className="text-end">

                <small className="text-secondary d-block">
                  Price
                </small>

                <span
                  className="fw-bold"
                  style={{
                    color: "#00BFA6",
                  }}
                >
                  ₹{price}
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div className="px-3 py-2">

            {/* API / GENERAL ERROR */}

            {formError && (
              <div
                className="alert alert-danger py-2 px-3 small mb-2"
                role="alert"
              >
                {formError}
              </div>
            )}

            {/* =================================================
                QUANTITY + DATE
            ================================================= */}

            <div className="row g-2 mb-2">

              {/* Quantity */}

              <div className="col-4">

                <label className="form-label small fw-semibold mb-1">
                  Qty
                </label>

                <input
                  type="number"
                  min="1"
                  className="form-control form-control-sm"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        Number(
                          e.target.value
                        )
                      )
                    )
                  }
                />

              </div>

              {/* Booking Date */}

              <div className="col-8">

                <label className="form-label small fw-semibold mb-1">
                  Booking Date
                </label>

                <input
                  type="date"
                  className={`form-control form-control-sm ${
                    validated &&
                    !bookingDate
                      ? "is-invalid"
                      : ""
                  }`}
                  value={bookingDate}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => {
                    setBookingDate(
                      e.target.value
                    );
                    setFormError("");
                  }}
                />

                {validated &&
                  !bookingDate && (
                    <div className="invalid-feedback">
                      Please select a booking date.
                    </div>
                  )}

              </div>

            </div>

            {/* =================================================
                TIME
            ================================================= */}

            <div className="mb-2">

              <label className="form-label small fw-semibold mb-1">
                Preferred Time
              </label>

              <select
                className={`form-select form-select-sm ${
                  validated &&
                  !bookingTime
                    ? "is-invalid"
                    : ""
                }`}
                value={bookingTime}
                onChange={(e) => {
                  setBookingTime(
                    e.target.value
                  );
                  setFormError("");
                }}
              >

                <option value="">
                  Select a time
                </option>

                <option value="09:00 AM">
                  09:00 AM
                </option>

                <option value="10:00 AM">
                  10:00 AM
                </option>

                <option value="11:00 AM">
                  11:00 AM
                </option>

                <option value="12:00 PM">
                  12:00 PM
                </option>

                <option value="01:00 PM">
                  01:00 PM
                </option>

                <option value="02:00 PM">
                  02:00 PM
                </option>

                <option value="03:00 PM">
                  03:00 PM
                </option>

                <option value="04:00 PM">
                  04:00 PM
                </option>

                <option value="05:00 PM">
                  05:00 PM
                </option>

                <option value="06:00 PM">
                  06:00 PM
                </option>

                <option value="07:00 PM">
                  07:00 PM
                </option>

                <option value="08:00 PM">
                  08:00 PM
                </option>

              </select>

              {validated &&
                !bookingTime && (
                  <div className="invalid-feedback">
                    Please select a preferred time.
                  </div>
                )}

            </div>

            {/* =================================================
                PHONE NUMBER
            ================================================= */}

            <div className="mb-2">

              <label className="form-label small fw-semibold mb-1">
                Phone Number
              </label>

              <input
                type="tel"
                className={`form-control form-control-sm ${
                  validated &&
                  (!phoneNo.trim() ||
                    !/^\d{10}$/.test(
                      phoneNo.trim()
                    ))
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter 10-digit phone number"
                value={phoneNo}
                maxLength="10"
                onChange={(e) => {

                  // Allow only numbers
                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setPhoneNo(value);
                  setFormError("");
                }}
              />

              {validated &&
                !phoneNo.trim() && (
                  <div className="invalid-feedback">
                    Phone number is required.
                  </div>
                )}

              {validated &&
                phoneNo.trim() &&
                !/^\d{10}$/.test(
                  phoneNo.trim()
                ) && (
                  <div className="invalid-feedback">
                    Enter a valid 10-digit phone number.
                  </div>
                )}

            </div>

            {/* =================================================
                FIRST ORDER PROMO
            ================================================= */}

            {isFirstOrder &&
              !checkingOrders && (
                <div
                  className="rounded-2 p-2 mb-2"
                  style={{
                    backgroundColor:
                      "#ecfdf5",

                    border:
                      "1px solid #a7f3d0",
                  }}
                >

                  <div className="d-flex justify-content-between align-items-center mb-1">

                    <small className="fw-semibold text-success">
                      🎉 First Order Offer
                    </small>

                    <small className="fw-bold text-success">
                      20% OFF
                    </small>

                  </div>

                  <div className="input-group input-group-sm">

                    <input
                      type="text"
                      className="form-control"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="Promo code"
                    />

                  </div>

                </div>
              )}

            {/* =================================================
                ADDRESS
            ================================================= */}

            <div className="mb-1">

              <label className="form-label small fw-semibold mb-1">
                Service Address
              </label>

              <textarea
                className={`form-control form-control-sm ${
                  validated &&
                  !address.trim()
                    ? "is-invalid"
                    : ""
                }`}
                rows="2"
                placeholder="Enter your complete address"
                value={address}
                onChange={(e) => {
                  setAddress(
                    e.target.value
                  );
                  setFormError("");
                }}
              />

              {validated &&
                !address.trim() && (
                  <div className="invalid-feedback">
                    Service address is required.
                  </div>
                )}

            </div>

          </div>

          {/* =================================================
              PRICE SUMMARY
          ================================================= */}

          <div className="px-3 pb-2">

            <div
              className="rounded-2 p-2"
              style={{
                backgroundColor:
                  "#f0fdfa",

                border:
                  "1px solid #ccfbf1",
              }}
            >

              {/* Subtotal */}

              <div className="d-flex justify-content-between">

                <small className="text-secondary">
                  Subtotal
                </small>

                <small>
                  ₹{subtotal.toFixed(2)}
                </small>

              </div>

              {/* Discount */}

              {discountAmount > 0 && (
                <div className="d-flex justify-content-between">

                  <small className="text-success">
                    Discount (20%)
                  </small>

                  <small className="text-success fw-semibold">
                    -₹
                    {discountAmount.toFixed(
                      2
                    )}
                  </small>

                </div>
              )}

              <hr className="my-1" />

              {/* Total */}

              <div className="d-flex justify-content-between align-items-center">

                <span className="fw-semibold">
                  Total
                </span>

                <span
                  className="fw-bold"
                  style={{
                    color: "#00BFA6",
                    fontSize: "18px",
                  }}
                >
                  ₹{totalAmount.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="px-3 pb-3">

            <div className="d-flex gap-2">

              <button
                type="button"
                className="btn btn-light border btn-sm flex-fill"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-sm text-white flex-fill fw-semibold"
                style={{
                  backgroundColor:
                    "#00BFA6",

                  borderColor:
                    "#00BFA6",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#00a990";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#00BFA6";
                }}
                onClick={handleBooking}
                disabled={
                  loading ||
                  checkingOrders
                }
              >

                {checkingOrders
                  ? "Checking..."
                  : loading
                  ? "Booking..."
                  : "Confirm Booking"}

              </button>

            </div>

          </div>

        </>

      )}

    </div>
  );
};

export default BookingActionWindow;
