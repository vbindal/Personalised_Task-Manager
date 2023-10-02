import useAuth from "../useAuth";
import axios from "../axios";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      const LOGOUT_URL = "/api/v1/users/logout";
      const response = await axios.post(LOGOUT_URL);

      if (response.status === 200) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAuth({});
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (

    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <div className="container-fluid">
        <h2>TASK MANAGER</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/home">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            {auth.email && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </li>
            )}
            {auth && <h6 style={{marginTop:"13px"}}>{auth.email}</h6>}
          </ul>
          
        </div>
      </div>
    </nav>
    );
    
};

export default Navbar;
