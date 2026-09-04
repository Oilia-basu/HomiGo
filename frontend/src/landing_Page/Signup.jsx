import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // Send only the fields required by backend
      const response = await axios.post(
        "http://localhost:3002/signup",
        {
          fullname: formData.fullname,
          email: formData.email,
          phoneNo: formData.phoneNo,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Signup Response:", response.data);

      if (response.data.success) {
        setSuccess("Account created successfully!");

        // Redirect to login after successful signup
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(response.data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        setError(
          error.response.data.message || "Something went wrong"
        );
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">

      <div
        className="row shadow-lg rounded-4 overflow-hidden bg-white w-100"
        style={{ maxWidth: "1000px" }}
      >

        {/* LEFT SECTION */}
        <div
          className="col-md-5 d-none d-md-flex text-white p-5 flex-column justify-content-between"
          style={{ backgroundColor: "#00BFA6" }}
        >

          <div>
            <h1 className="fw-bold">
              Homi<span className="text-info">Go</span>
            </h1>

            <p className="text-light opacity-75">
              Your Home, Our Care.
            </p>
          </div>

          <div>
            <h2 className="fw-bold mb-3">
              Join HomiGo!
            </h2>

            <p className="text-light opacity-75">
              Create your account and get access to
              reliable and professional home services.
            </p>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-7 p-4 p-md-5">

          <div
            className="mx-auto"
            style={{ maxWidth: "450px" }}
          >

            <h2 className="fw-bold text-dark mb-2">
              Create Account
            </h2>

            <p className="text-secondary mb-4">
              Sign up to get started with HomiGo
            </p>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">

                <label
                  htmlFor="fullname"
                  className="form-label fw-semibold"
                >
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Email */}
              <div className="mb-3">

                <label
                  htmlFor="email"
                  className="form-label fw-semibold"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Phone */}
              <div className="mb-3">

                <label
                  htmlFor="phoneNo"
                  className="form-label fw-semibold"
                >
                  Phone Number
                </label>

                <input
                  type="tel"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter your phone number"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Password */}
              <div className="mb-3">

                <label
                  htmlFor="password"
                  className="form-label fw-semibold"
                >
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

              </div>

              {/* Confirm Password */}
              <div className="mb-3">

                <label
                  htmlFor="confirmPassword"
                  className="form-label fw-semibold"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

              </div>

              {/* Terms */}
              <div className="form-check mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  required
                />

                <label
                  className="form-check-label text-secondary small"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-decoration-none"
                  >
                    Terms & Conditions
                  </Link>
                </label>

              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="btn btn-lg w-100 text-white"
                style={{ backgroundColor: "#00BFA6" }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">

              <hr className="flex-grow-1" />

              <span className="mx-3 text-secondary small">
                OR
              </span>

              <hr className="flex-grow-1" />

            </div>

            {/* Login */}
            <p className="text-center text-secondary mb-0">

              Already have an account?{" "}

              <Link
                to="/login"
                className="fw-semibold text-decoration-none"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;
