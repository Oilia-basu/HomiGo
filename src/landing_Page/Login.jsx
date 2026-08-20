

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // Later connect this with backend
    // axios.post("http://localhost:5000/api/auth/login", formData)

    navigate("/services");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">

      <div className="row shadow-lg rounded-4 overflow-hidden bg-white w-100" style={{ maxWidth: "1000px" }}>

        {/* Left Section */}
        <div className="col-md-5 d-none d-md-flex  text-white p-5 flex-column justify-content-between" style={{backgroundColor:"#00BFA6"}}>

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
              Welcome Back!
            </h2>

            <p className="text-light opacity-75">
              Login to HomiGo and book trusted home services
              whenever you need them.
            </p>
          </div>

        </div>

        {/* Right Section */}
        <div className="col-md-7 p-4 p-md-5">

          <div className="mx-auto" style={{ maxWidth: "420px" }}>

            <h2 className="fw-bold text-dark mb-2">
              Login
            </h2>

            <p className="text-secondary mb-4">
              Sign in to continue to HomiGo
            </p>

            <form onSubmit={handleSubmit}>

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
                  className="form-control form-control-lg"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Password */}
              <div className="mb-3">

                <div className="d-flex justify-content-between">

                  <label
                    htmlFor="password"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>

                  

                </div>

                <div className="input-group">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)} style={{backgroundColor:"#00BFA6"}}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              

              {/* Login Button */}
              <button
                type="submit"
                className="btn  btn-lg w-100" style={{backgroundColor:"#00BFA6"}}
              >
                Login
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

            {/* Signup */}
            <p className="text-center text-secondary mb-0">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="fw-semibold text-decoration-none"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;