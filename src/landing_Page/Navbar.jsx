import { Link } from "react-router-dom";
function Navbar() {
    return (

        <nav className="navbar navbar-expand-sm navbar-light bg-light border-bottom">
            <div className="container p-2">
                <Link class="navbar-brand me-5" to="/"><img style={{ width: "60%" }} src="media/images/HomiGoLogo.png" alt="logo" /></Link>

                <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto ms-5 gap-3">
                        <li className="nav-item ">
                            <Link class="nav-link active" to="/services" >Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/becomeapartner">Become a Partner</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link active" to="/mybookings">My Bookings</Link>
                        </li>
                        <li className="nav-item " style={{border:"1px solid grey",borderRadius:"15%"}}>
                            <Link className="nav-link active" to="/login">Login</Link>
                        </li>
                        <li className="nav-item " style={{border:"1px solid #00BFA6",borderRadius:"15%",backgroundColor:"#00BFA6"} }>
                            <Link className="nav-link active" to="/signup">Sign Up</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    );
}

export default Navbar;