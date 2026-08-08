import './BrowseByCategories.css'
import { Link } from 'react-router-dom';
function BrowseByCategories() {
    return (
        <div className="wrap mt-5">
            <h2>Browse by Categories</h2>
            <div className="grid">

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="spin" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="2"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /><rect x="8" y="8" width="8" height="8" rx="2" /></svg>
                    </div>
                    <div className="label">AC Repair</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="drip" viewBox="0 0 24 24" fill="var(--brand)"><path d="M12 2c3 4 6 8 6 12a6 6 0 1 1-12 0c0-4 3-8 6-12z" /></svg>
                    </div>
                    <div className="label">Cleaning</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="flash" viewBox="0 0 24 24" fill="var(--accent)"><path d="M9 2L4 14h5l-1 8 8-13h-5l3-7z" /></svg>
                    </div>
                    <div className="label">Salon</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="shake" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="2"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>
                    </div>
                    <div className="label">Electrician</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="drip" viewBox="0 0 24 24" fill="var(--brand-light)"><path d="M12 2s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12z" /></svg>
                    </div>
                    <div className="label">Plumbing</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="brush" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="2"><path d="M15 3l6 6-9 9H6v-6l9-9z" /><path d="M4 21h6" /></svg>
                    </div>
                    <div className="label">Painting</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg class="spinwash" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="13" r="5" /><circle cx="8" cy="6" r="1" fill="var(--brand)" /></svg>
                    </div>
                    <div className="label">Appliance Repair</div>
                </div>

                <div className="tile">
                    <div className="icon-circle">
                        <svg className="bounce" viewBox="0 0 24 24" fill="var(--ink)"><ellipse cx="12" cy="14" rx="6" ry="4" /><path d="M6 14L2 10M18 14l4-4M9 10l-2-5M15 10l2-5" /></svg>
                    </div>
                    <div className="label">Pest Control</div>
                </div>

            </div>
            <div className="row mt-5 allbranches ">
                <Link to='/services' className='text-decoration-none viewallbranches'>View all services</Link>
            </div>
        </div>

    );
}

export default BrowseByCategories;