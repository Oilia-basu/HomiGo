function Footer() {
    return (
        <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
            <div className="container border-top mt-5">
                    <img className="mt-5" src="media/images/HomiGoLogo.png" alt=""  style={{width:"10%",height:"20%"}}/>
                <div className="row mt-5">

                    <div className="col ">

                        <h1 className="fs-5">Company</h1>
                        <div className="text-muted">
                            <a className="text-muted text-decoration-none"  href="">About us</a>
                            <br />
                            <a className="text-muted text-decoration-none" href="">Investor Relations </a>
                            <br />
                            <a className="text-muted text-decoration-none" href="">Terms & conditions </a>
                            <br />
                            <a className="text-muted text-decoration-none" href="">Privacy policy</a>
                            <br />
                            <a className="text-muted text-decoration-none" href="">Anti-discrimination policy </a>
                            <br />
                            <a className="text-muted text-decoration-none" href="">Careers</a>
                            <br />
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="fs-5">For cutomers</h1>
                        <a className="text-muted text-decoration-none" href="">UC reviews </a>
                        <br />
                        <a className="text-muted text-decoration-none" href="">Categories near you</a>
                        <br />
                        <a className="text-muted text-decoration-none" href="">Contact us</a>

                    </div>
                    <div className="col">
                        <h1 className="fs-5">For professionals</h1>
                        <a className="text-muted text-decoration-none" href="">Register as a professional</a>

                    </div>
                    <div className="col">
                        <h1 className="fs-5">Social links</h1>
                    </div>
                </div>
                <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
                    <p>© 2026 Homigo. All rights reserved. Homigo is a college project developed for educational purposes, inspired by the concept of on-demand home services. This website is intended solely for learning and demonstration.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;