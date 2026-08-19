import { Link, useLocation } from "react-router-dom";
import AdminButton from "./admin/AdminButton";
import './Navbar.css'
function Navbar() {
    const location = useLocation();

    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top"
                style={{
                    height: "90px",
                    padding: "0",
                    zIndex: 1030,
                }}
            >
                <div
                    className="container px-2"
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* Logo */}
                    <Link
                        className="navbar-brand"
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0",
                        }}
                    >
                        <img
                            src="/media/images/HomiGoLogo.png"
                            alt="logo"
                            style={{
                                width: "140px",
                                height: "auto",
                                display: "block",
                            }}
                        />
                    </Link>

                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarSupportedContent"
                    >
                        <ul
                            className="navbar-nav gap-3"
                            style={{
                                alignItems: "center",
                            }}
                        >

                            {/* Services */}
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/services"
                                            ? "active-nav"
                                            : ""
                                    }`}
                                    to="/services"
                                >
                                    Services
                                </Link>
                            </li>

                            {/* Careers */}
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/careers"
                                            ? "active-nav"
                                            : ""
                                    }`}
                                    to="/careers"
                                >
                                    Careers
                                </Link>
                            </li>

                            {/* My Bookings */}
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/mybookings"
                                            ? "active-nav"
                                            : ""
                                    }`}
                                    to="/mybookings"
                                >
                                    My Bookings
                                </Link>
                            </li>

                            {/* Support */}
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/support"
                                            ? "active-nav"
                                            : ""
                                    }`}
                                    to="/support"
                                >
                                    Support
                                </Link>
                            </li>

                            {/* Login */}
                            <li
                                className="nav-item login"
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "8px",
                                }}
                            >
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    style={{
                                        padding: "8px 16px",
                                    }}
                                >
                                    Login
                                </Link>
                            </li>

                            {/* Sign Up */}
                            <li
                                className="nav-item signup"
                                style={{
                                    border: "1px solid #00BFA6",
                                    borderRadius: "8px",
                                    backgroundColor: "#00BFA6",
                                }}
                            >
                                <Link
                                    className="nav-link text-white"
                                    to="/signup"
                                    style={{
                                        padding: "8px 16px",
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </li>

                            <AdminButton />
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Space for fixed navbar */}
            <div style={{ height: "30px" }}></div>
        </>
    );
}

export default Navbar;