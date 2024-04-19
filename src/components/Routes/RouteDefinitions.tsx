import { Route, Routes, Navigate } from "react-router-dom";
import Grades from "../../pages/Grades/Grades";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Navigation from "../Navbar/Navigation";
import "./routeDefinitions.css";

const RouteDefinitions = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return (
    <div className="route-container">
      {isAuthenticated && <Navigation />}
      <div className="main-content">
        {isAuthenticated && <Sidebar />}
        <div className="home-container">
          <Routes>
            {!isAuthenticated ? (
              <Route path="/login" element={<Login />} />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RouteDefinitions;


