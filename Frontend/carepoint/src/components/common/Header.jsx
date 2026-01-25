import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold" to="/">
        🩺 CarePoint
      </Link>

      <div className="ms-auto">
        <Link className="nav-link d-inline me-3" to="#">About</Link>
        <Link className="nav-link d-inline me-3" to="#">Services</Link>
        <Link className="btn btn-outline-primary" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
