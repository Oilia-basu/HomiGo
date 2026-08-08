import './SpecialOffer.css'
function SpecialOffer() {
    return (
        <div className="banner mt-5Name">
            <div className="drift d1"></div>
            <div className="drift d2"></div>
            <div className="drift d3"></div>
            <div className="drift d4"></div>

            <div className="tag">
                <div className="badge-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M20.59 13.41L12 21.99a2 2 0 0 1-2.83 0L2 14.83V4a2 2 0 0 1 2-2h10.83a2 2 0 0 1 1.41.59l4.35 4.35a2 2 0 0 1 0 2.82z" /><circle cx="8" cy="8" r="1.5" fill="var(--brand)" /></svg>
                </div>
                <div className="copy">
                    <p className="kicker">Special Offer</p>
                    <h3>20% OFF on Your First Booking</h3>
                    <span className="code">Use Code: HOMIGO20</span>
                </div>
            </div>


        </div>
    );
}

export default SpecialOffer;