
import "./MyBookingPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // ==============================
  // FETCH BOOKINGS
  // ==============================
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/mybookings",
          {
            withCredentials: true,
          }
        );


        if (response.data.success) {
          setBookings(response.data.bookings || []);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ==============================
  // CANCEL BOOKING
  // ==============================
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancellingId(bookingId);

      const response = await axios.patch(
        `http://localhost:3002/cancelbooking/${bookingId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Update the booking locally
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  status: "cancelled",
                }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Cancel booking error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to cancel booking"
      );
    } finally {
      setCancellingId(null);
    }
  };

  // ==============================
  // FORMAT DATE
  // ==============================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==============================
  // STATUS CLASS
  // ==============================
  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "status accepted";

      case "in_progress":
        return "status progress";

      case "completed":
        return "status completed";

      case "cancelled":
        return "status cancelled";

      default:
        return "status pending";
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="my-bookings-page">
        <div className="booking-container">
          <div className="booking-loading">
            <div className="spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // MAIN UI
  // ==============================
  return (
    <div className="my-bookings-page">

      <div className="booking-container">

        {/* PAGE HEADER */}
        <div className="booking-header">

          <div>
            <span className="booking-label">
              SERVICE HISTORY
            </span>

            <h1>My Bookings</h1>

            <p>
              Manage and track all your booked services
            </p>
          </div>

          <div className="booking-count">
            <span>{bookings.length}</span>
            <small>
              {bookings.length === 1
                ? "Booking"
                : "Bookings"}
            </small>
          </div>

        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (

          <div className="empty-bookings">

            <div className="empty-icon">
              📅
            </div>

            <h3>No bookings yet</h3>

            <p>
              You haven't booked any services yet.
              <br />
              Explore our services and book your first one.
            </p>

            <a
              href="/services"
              className="browse-services-btn"
            >
              Browse Services
            </a>

          </div>

        ) : (

          /* BOOKING GRID */
          <div className="booking-grid">

            {bookings.map((booking) => (

              <div
                className="booking-card"
                key={booking._id}
              >

                {/* CARD TOP */}
                <div className="booking-card-top">

                  <div className="service-icon">
                    🛠️
                  </div>

                  <div className="service-info">

                    <h3>
                      {booking.serviceName}
                    </h3>

                    <span>
                      Booking ID:{" "}
                      {booking._id.slice(-8).toUpperCase()}
                    </span>

                  </div>

                  <span
                    className={getStatusClass(
                      booking.status
                    )}
                  >
                    {booking.status
                      ?.replace("_", " ")
                      .toUpperCase()}
                  </span>

                </div>

                <div className="card-divider"></div>

                {/* DATE & TIME */}
                <div className="booking-details">

                  <div className="detail-item">

                    <div className="detail-icon">
                      📅
                    </div>

                    <div>
                      <small>Date</small>
                      <strong>
                        {formatDate(
                          booking.bookingDate
                        )}
                      </strong>
                    </div>

                  </div>

                  <div className="detail-item">

                    <div className="detail-icon">
                      🕐
                    </div>

                    <div>
                      <small>Time</small>
                      <strong>
                        {booking.bookingTime}
                      </strong>
                    </div>

                  </div>

                </div>

                {/* ADDRESS */}
                <div className="address-box">

                  <div className="address-icon">
                    📍
                  </div>

                  <div>
                    <small>Service Address</small>
                    <p>{booking.address}</p>
                  </div>

                </div>

                {/* QUANTITY */}
                <div className="quantity-row">

                  <span>
                    Quantity
                  </span>

                  <strong>
                    {booking.quantity}
                  </strong>

                </div>

                <div className="card-divider"></div>

                {/* PRICE */}
                <div className="price-section">

                  <div className="price-row">
                    <span>
                      Service Price
                    </span>

                    <span>
                      ₹{booking.price}
                    </span>
                  </div>

                  <div className="price-row">
                    <span>
                      Quantity
                    </span>

                    <span>
                      × {booking.quantity}
                    </span>
                  </div>

                  <div className="price-row total">
                    <strong>
                      Total Amount
                    </strong>

                    <strong>
                      ₹{booking.totalAmount}
                    </strong>
                  </div>

                </div>

                {/* PAYMENT STATUS */}
                <div className="payment-row">

                  <span>
                    Payment Status
                  </span>

                  <span
                    className={`payment-badge ${
                      booking.paymentStatus
                    }`}
                  >
                    {booking.paymentStatus
                      ?.toUpperCase()}
                  </span>

                </div>

                {/* ACTION */}
                <div className="booking-actions">

                  {booking.status !== "cancelled" &&
                    booking.status !== "completed" && (

                    <button
                      className="cancel-btn"
                      onClick={() =>
                        handleCancelBooking(
                          booking._id
                        )
                      }
                      disabled={
                        cancellingId === booking._id
                      }
                    >
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default MyBookingPage;


