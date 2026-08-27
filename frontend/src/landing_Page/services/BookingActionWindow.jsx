
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

  const [quantity, setQuantity] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

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

  const price = Number(service?.price || 0);
  const totalAmount = quantity * price;


  /* =====================================================
     START DRAGGING
  ===================================================== */

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const windowElement = e.currentTarget.parentElement;
    const rect = windowElement.getBoundingClientRect();

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


  /* =====================================================
     DRAGGING
  ===================================================== */

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const windowElement =
      document.querySelector(".homigo-booking-window");

    if (!windowElement) return;

    const windowWidth = windowElement.offsetWidth;
    const windowHeight = windowElement.offsetHeight;

    const maxX = window.innerWidth - windowWidth;
    const maxY = window.innerHeight - windowHeight;

    let newX =
      e.clientX - dragOffset.current.x;

    let newY =
      e.clientY - dragOffset.current.y;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({
      x: newX,
      y: newY,
    });
  };


  /* =====================================================
     STOP DRAGGING
  ===================================================== */

  const handleMouseUp = () => {
    setIsDragging(false);

    document.body.style.userSelect = "";
  };


  /* =====================================================
     MOUSE EVENTS
  ===================================================== */

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


  /* =====================================================
     BOOKING
  ===================================================== */

  const handleBooking = async () => {
  if (!bookingDate || !bookingTime || !address.trim()) {
    alert("Please fill in all booking details.");
    return;
  }

  try {
    setLoading(true);

    const bookingData = {
      // Dummy user for now
      user: "65f123456789abcdef123456",

      // Dynamic service ID
      service: service._id,

      // Dummy professional for now
      professional: "65f987654321abcdef654321",

      // Dynamic service information
      serviceName: service.name,

      // Dynamic form values
      bookingTime: bookingTime,
      bookingDate: bookingDate,

      // Dynamic quantity
      quantity: quantity,

      // Dynamic service price
      price: price,

      // Dynamic total
      totalAmount: totalAmount,

      // Dummy status
      status: "pending",

      // Dummy payment status
      paymentStatus: "pending",

      // Dynamic address
      address: address,
    };

    console.log("Booking Data:", bookingData);

    const response = await axios.post(
      "http://localhost:3002/newbooking",
      bookingData
    );

    console.log("Booking created:", response.data);

    alert("Service booked successfully!");

    closeBookingWindow();

  } catch (error) {
    console.error("Booking error:", error);

    alert(
      error.response?.data?.message ||
      "Something went wrong while booking the service."
    );

  } finally {
    setLoading(false);
  }
};


  /* =====================================================
     CANCEL
  ===================================================== */

  const handleCancel = () => {
    closeBookingWindow();
  };


  return (
    <div
      className={`homigo-booking-window card shadow-lg border-0 ${isDragging ? "opacity-75" : ""
        }`}
      style={
        position.x !== null
          ? {
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            right: "auto",
            bottom: "auto",
            width: "430px",
            maxWidth: "calc(100vw - 24px)",
            zIndex: 1050,
          }
          : {
            position: "fixed",
            right: "30px",
            bottom: "25px",
            width: "430px",
            maxWidth: "calc(100vw - 24px)",
            zIndex: 1050,
          }
      }
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="card-header border-0 text-white d-flex align-items-center justify-content-between py-3 px-3"
        style={{
          backgroundColor: "#00BFA6",
          cursor: isDragging
            ? "grabbing"
            : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <div>
          <h5 className="mb-0 fw-semibold">
            Book Service
          </h5>

          <small className="opacity-75">
            Schedule your home service
          </small>
        </div>

        <button
          type="button"
          className="btn btn-sm text-white border-0 rounded-circle"
          style={{
            backgroundColor:
              "rgba(255,255,255,0.15)",
            width: "32px",
            height: "32px",
          }}
          onMouseDown={(e) =>
            e.stopPropagation()
          }
          onClick={handleCancel}
        >
          <span className="fs-5">×</span>
        </button>
      </div>


      {/* =================================================
          SERVICE INFORMATION
      ================================================= */}

      <div className="card-body bg-light py-3">

        <div className="d-flex justify-content-between align-items-center">

          <div>
            <h6 className="mb-1 fw-semibold text-dark">
              {service?.name}
            </h6>

            <small className="text-secondary">
              Professional home service
            </small>
          </div>

          <div className="text-end">
            <small className="text-secondary d-block">
              Starting from
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
          BOOKING FORM
      ================================================= */}

      <div className="card-body px-3 py-3">

        {/* Quantity */}

        <div className="mb-3">

          <label className="form-label small fw-semibold text-dark">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            className="form-control"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(
                  1,
                  Number(e.target.value)
                )
              )
            }
          />

        </div>


        {/* Date */}

        <div className="mb-3">

          <label className="form-label small fw-semibold text-dark">
            Booking Date
          </label>

          <input
            type="date"
            className="form-control"
            value={bookingDate}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) =>
              setBookingDate(e.target.value)
            }
          />

        </div>


        {/* Time */}

        <div className="mb-3">

          <label className="form-label small fw-semibold text-dark">
            Preferred Time
          </label>

          <select
            className="form-select"
            value={bookingTime}
            onChange={(e) =>
              setBookingTime(e.target.value)
            }
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

        </div>


        {/* Address */}

        <div className="mb-2">

          <label className="form-label small fw-semibold text-dark">
            Service Address
          </label>

          <textarea
            className="form-control"
            rows="2"
            placeholder="Enter your complete address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

        </div>

      </div>


      {/* =================================================
          PRICE SUMMARY
      ================================================= */}

      <div className="px-3 pb-2">

        <div
          className="rounded-3 p-3"
          style={{
            backgroundColor: "#f0fdfa",
            border: "1px solid #ccfbf1",
          }}
        >

          <div className="d-flex justify-content-between mb-2">

            <span className="text-secondary small">
              Service Price
            </span>

            <span className="small">
              ₹{price}
            </span>

          </div>


          <div className="d-flex justify-content-between mb-2">

            <span className="text-secondary small">
              Quantity
            </span>

            <span className="small">
              {quantity}
            </span>

          </div>


          <hr className="my-2" />


          <div className="d-flex justify-content-between align-items-center">

            <span className="fw-semibold">
              Total Amount
            </span>

            <span
              className="fw-bold fs-5"
              style={{
                color: "#00BFA6",
              }}
            >
              ₹{totalAmount}
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="card-footer bg-white border-0 px-3 pb-3 pt-2">

        <div className="d-flex gap-2">

          <button
            type="button"
            className="btn btn-light border flex-fill"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn text-white flex-fill fw-semibold"
            style={{
              backgroundColor: "#00BFA6",
              borderColor: "#00BFA6",
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
            disabled={loading}
          >
            {loading
              ? "Booking..."
              : "Confirm Booking"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookingActionWindow;

