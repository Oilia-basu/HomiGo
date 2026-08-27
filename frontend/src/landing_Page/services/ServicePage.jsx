import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import "./ServicePage.css";

const ServicePage = () => {
    
    const [allServices,setAllServices] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3002/allservices").then((res)=>{
            console.log(res.data)
            setAllServices(res.data)
        })
    },[])

    const navigate = useNavigate();
    const location = useLocation();

    // Category routes
    const categoryRoutes = {
        "/acrepair": "AC Repair",
        "/cleaning": "Cleaning",
        "/salon": "Salon",
        "/electrician": "Electrician",
        "/plumbing": "Plumbing",
        "/painting": "Painting",
        "/appliancerepair": "Appliance Repair",
        "/pestcontrol": "Pest Control"
    };

    // Get category from current URL
    const selectedCategory =
        categoryRoutes[location.pathname] || "All Categories";

    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortBy, setSortBy] = useState("Popular");


    // Categories
    const categories = [
        "All Categories",
        "AC Repair",
        "Cleaning",
        "Salon",
        "Electrician",
        "Plumbing",
        "Painting",
        "Appliance Repair",
        "Pest Control"
    ];


    // Filter services
    const filteredServices = allServices
        .filter((service) => {

            const categoryMatch =
                selectedCategory === "All Categories" ||
                service.category === selectedCategory;

            const searchMatch =
                service.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const priceMatch =
                service.price <= maxPrice;

            const ratingMatch =
                selectedRating === 0 ||
                service.rating >= selectedRating;

            return (
                categoryMatch &&
                searchMatch &&
                priceMatch &&
                ratingMatch
            );
        })

        // Sorting
        .sort((a, b) => {

            if (sortBy === "Price: Low to High") {
                return a.price - b.price;
            }

            if (sortBy === "Price: High to Low") {
                return b.price - a.price;
            }

            if (sortBy === "Rating") {
                return b.rating - a.rating;
            }

            // Popular
            return b.reviews - a.reviews;
        });


    // Handle category click
    const handleCategoryClick = (category) => {

        if (category === "All Categories") {

            navigate("/services");

        } else {

            const routeMap = {
                "AC Repair": "/acrepair",
                "Cleaning": "/cleaning",
                "Salon": "/salon",
                "Electrician": "/electrician",
                "Plumbing": "/plumbing",
                "Painting": "/painting",
                "Appliance Repair": "/appliancerepair",
                "Pest Control": "/pestcontrol"
            };

            navigate(routeMap[category]);
        }
    };


    // Clear filters
    const clearFilters = () => {

        setSelectedRating(0);
        setMaxPrice(1000);
        setSearch("");
        setSortBy("Popular");
    };


    return (
        <div className="services-page">


            {/* ================= SEARCH BAR ================= */}

            <div className="services-search-container">

                <div className="search-box">

                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search for services..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            <div className="services-layout">


                {/* ================= LEFT SIDEBAR ================= */}

                <aside className="services-sidebar">

                    <h3>Categories</h3>


                    <div className="category-list">

                        {categories.map((category) => (

                            <button
                                key={category}

                                className={
                                    selectedCategory === category
                                        ? "category-btn active"
                                        : "category-btn"
                                }

                                onClick={() =>
                                    handleCategoryClick(category)
                                }
                            >

                                {category}

                            </button>

                        ))}

                    </div>


                    {/* ================= FILTERS ================= */}

                    <div className="filter-section">

                        <h3>Filters</h3>


                        {/* PRICE */}

                        <div className="filter-group">

                            <h4>Price Range</h4>

                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={maxPrice}

                                onChange={(e) =>
                                    setMaxPrice(
                                        Number(e.target.value)
                                    )
                                }

                                className="price-slider"
                            />


                            <div className="price-values">

                                <span>₹0</span>

                                <span>
                                    ₹{maxPrice}
                                </span>

                            </div>

                        </div>


                        {/* RATING */}

                        <div className="filter-group">

                            <h4>Rating</h4>


                            {[4.5, 4, 3.5].map((rating) => (

                                <label
                                    className="rating-option"
                                    key={rating}
                                >

                                    <input
                                        type="radio"
                                        name="rating"

                                        checked={
                                            selectedRating === rating
                                        }

                                        onChange={() =>
                                            setSelectedRating(rating)
                                        }
                                    />

                                    <span>
                                        ★ {rating} & above
                                    </span>

                                </label>

                            ))}

                        </div>


                        {/* CLEAR FILTER */}

                        <button
                            className="clear-filter"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                </aside>


                {/* ================= MAIN CONTENT ================= */}

                <main className="services-content">


                    {/* HEADING */}

                    <div className="services-heading">

                        <div>

                            <h1>

                                {selectedCategory === "All Categories"
                                    ? "Home Services"
                                    : `${selectedCategory} Services`}

                            </h1>


                            <p>
                                {filteredServices.length} services available
                            </p>

                        </div>


                        {/* SORT */}

                        <div className="sort-container">

                            <label>
                                Sort by
                            </label>


                            <select
                                value={sortBy}

                                onChange={(e) =>
                                    setSortBy(e.target.value)
                                }
                            >

                                <option value="Popular">
                                    Popular
                                </option>

                                <option value="Rating">
                                    Rating
                                </option>

                                <option value="Price: Low to High">
                                    Price: Low to High
                                </option>

                                <option value="Price: High to Low">
                                    Price: High to Low
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ================= SERVICE CARDS ================= */}

                    {filteredServices.length > 0 ? (

                        <div className="services-grid">

                            {filteredServices.map((service) => (

                                <div
                                    className="service-card"
                                    key={service.id}
                                >


                                    {/* IMAGE */}

                                    <div className="service-image-container">

                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="service-image"
                                        />

                                    </div>


                                    {/* CARD BODY */}

                                    <div className="service-card-body">


                                        <h3>
                                            {service.name}
                                        </h3>


                                        <p className="starting-price">
                                            Starts at ₹{service.price}
                                        </p>


                                        {/* RATING */}

                                        <div className="service-rating">

                                            <span>
                                                ★
                                            </span>

                                            <strong>
                                                {service.rating}
                                            </strong>

                                            <span>
                                                ({service.reviews})
                                            </span>

                                        </div>


                                        {/* BOOK BUTTON */}

                                        <button
                                            className="book-btn"

                                            onClick={() =>
                                                alert(
                                                    `Booking ${service.name}`
                                                )
                                            }
                                        >
                                            Book Now
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (


                        /* NO SERVICES */

                        <div className="no-services">

                            <h2>
                                No services found
                            </h2>

                            <p>
                                Try changing your filters or search.
                            </p>

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default ServicePage;

