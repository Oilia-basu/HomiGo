import { Link } from "react-router-dom";
function Navbar() {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top ">
            <div className="container px-2 py-0">

                <Link className="navbar-brand" to="/" >
                    <img
                        src="media/images/HomiGoLogo.png"
                        alt="logo"
                        style={{ width: "60%" }}
                    />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav gap-3">

                        <li className="nav-item">
                            <Link className="nav-link active" to="/support">
                                Support
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

                        <li className="nav-item"
                            style={{ border: "1px solid grey", borderRadius: "8px" }}>
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