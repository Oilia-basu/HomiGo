import './HiringCard.css'
function HiringCard(p) {
    return (
        <>
            <div className="hr">
            <div className="hiring-card mt-5">
                <span className="hiring-tag">We're Hiring</span>

                <h2>{p.position}</h2>

                <p>
                    Earn up to <strong>{p.salary}</strong>
                </p>

                <button>Apply Now</button>
            </div>
            </div>
          
        </>
    );
}

export default HiringCard;