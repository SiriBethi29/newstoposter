import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  Home,
  WandSparkles,
  Bookmark
} from "lucide-react";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <div className="logo-name">News2Posts</div>
          <div className="logo-subtitle">
            News → Ready-to-post
          </div>
        </div>
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          <Home size={17} />
          Home
        </Link>

        <Link
          to="/create"
          className={
            location.pathname === "/create"
              ? "nav-link active"
              : "nav-link"
          }
        >
          <WandSparkles size={17} />
          Create
        </Link>

        <Link
          to="/saved"
          className={
            location.pathname === "/saved"
              ? "nav-link active"
              : "nav-link"
          }
        >
          <Bookmark size={17} />
          Saved
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;