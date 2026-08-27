import { useState } from "react";
import { Link } from "react-router-dom";

function AdminButton() {
    const [hover, setHover] = useState(false);

    return (
        <li
            className="nav-item"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                border: "1px solid grey",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
            }}
        >
            <Link
                className="nav-link"
                to="/admin"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "black",
                }}
            >
                <i className="fa-solid fa-users-gear"></i>

                {hover && (
                    <span
                        style={{
                            transition: "opacity 0.3s ease",
                        }}
                    >
                        Admin
                    </span>
                )}
            </Link>
        </li>
    );
}

export default AdminButton;