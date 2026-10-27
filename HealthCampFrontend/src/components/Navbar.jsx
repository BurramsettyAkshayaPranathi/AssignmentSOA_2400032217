
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm health-navbar">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">
          <span className="brand-icon">+</span>
          <span>HealthCamp</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#healthCampNavbar"
          aria-controls="healthCampNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="healthCampNavbar">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#home">
              Home
            </a>

            <a className="nav-link" href="#register">
              Add Registration
            </a>

            <a className="nav-link" href="#registrations">
              View Records
            </a>

            <a className="nav-link" href="#find-registration">
              Find ID
            </a>

            <a className="nav-link" href="#about">
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
