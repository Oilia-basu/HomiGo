import { Link } from "react-router-dom";
function Navbar() {
    return (

        <nav className="navbar navbar-expand-sm navbar-light bg-light border-bottom sticky-top">
            <div className="container d-flex justify-content-between align-items-center">

                <Link className="navbar-brand" to="/">
                    <img
                        src="media/images/HomiGoLogo.png"
                        alt="logo"
                        style={{ width: "60%" }}
                    />
                </Link>

                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav gap-3">

                        <li className="nav-item">
                            <Link className="nav-link active" to="/services">
                                Services
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" to="/becomeapartner">
                                Become a Partner
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" to="/mybookings">
                                My Bookings
                            </Link>
                        </li>

                        <li
                            className="nav-item"
                            style={{ border: "1px solid grey", borderRadius: "8px" }}
                        >
                            <Link className="nav-link active" to="/login">
                                Login
                            </Link>
                        </li>

                        <li
                            className="nav-item"
                            style={{
                                border: "1px solid #00BFA6",
                                borderRadius: "8px",
                                backgroundColor: "#00BFA6",
                            }}
                        >
                            <Link className="nav-link text-white" to="/signup">
                                Sign Up
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;