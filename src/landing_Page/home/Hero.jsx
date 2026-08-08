import './Hero.css'
import { Link } from 'react-router-dom';
function Hero() {
    return (
       
            <div className="hero mt-5" style={{boxShadow: "5px 5px 10px #00BFA6"}}>
                <div className="copy">
                    <p className="eyebrow">#1 Home Services Platform</p>
                    <h1>Home services at your <span>doorstep</span></h1>
                    <p>Professional experts. Quality service. On-time, at your convenience — booked in under a minute.</p>
                    <Link to='/services' className="cta text-decoration-none">Book a Service →</Link>
                </div>

                <div className="art">
                    <svg viewBox="0 0 400 380" width="100%" height="380" xmlns="http://www.w3.org/2000/svg">
                        
                        <rect x="70" y="70" width="220" height="70" rx="14" fill="#ffffff" stroke="#D7E4DF" stroke-width="2" />
                        <rect x="88" y="90" width="90" height="8" rx="4" fill="#DCEDE7" />
                        <circle cx="255" cy="105" r="10" fill="var(--brand-light)" />

                        
                        <path className="wave w1" d="M60 100 Q30 100 10 100" />
                        <path className="wave w2" d="M60 115 Q25 115 0 115" />
                        <path className="wave w3" d="M60 130 Q30 130 10 130" />

                       
                        <g className="tech-group">
                           
                            <rect x="150" y="170" width="90" height="120" rx="18" fill="var(--brand)" />
                            
                            <circle cx="195" cy="150" r="30" fill="#F2C29B" />
                            
                            <path d="M162 140 Q195 108 228 140 Q228 122 195 118 Q162 122 162 140Z" fill="var(--ink)" />
                            
                            <rect x="200" y="150" width="16" height="70" rx="8" fill="var(--brand)" transform="rotate(-25 200 150)" />
                            <circle cx="238" cy="115" r="10" fill="#F2C29B" />
                            
                            <rect x="160" y="285" width="24" height="55" rx="8" fill="var(--ink)" />
                            <rect x="206" y="285" width="24" height="55" rx="8" fill="var(--ink)" />
                        </g>

                       
                        <g className="spark s1" fill="var(--accent)">
                            <polygon points="252,90 256,100 266,100 258,106 261,116 252,110 243,116 246,106 238,100 248,100" />
                        </g>
                        <g className="spark s2" fill="var(--brand-light)">
                            <circle cx="300" cy="160" r="4" />
                        </g>
                        <g className="spark s3" fill="var(--accent)">
                            <circle cx="280" cy="200" r="3" />
                        </g>
                    </svg>

                    <div className="badge rating"><span class="star">★</span> 4.8 Our Rating</div>
                    <div className="badge customers">👥 10,000+ Happy Customers</div>
                </div>
            </div>
            
    );
}

export default Hero;