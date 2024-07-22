import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Navigation from "../Navbar/Navigation";
import "./routeDefinitions.css";
import Grades from "../../pages/Grades/Grades";
import AddStudent from "../../pages/Instructor/AddStudent/AddStudent";
import ExamDate from "../../pages/ExamDate/ExamDate";
import { Container, Row } from "react-bootstrap";
import AddGrades from "../../pages/Instructor/AddGrades/AddGrades";
import ListStudent from "../Student/ListStudent/ListStudent";
import NotFound from "../../pages/NotFound/NotFound";
import AddStudentGrade from "../AddStudentGrade/AddStudentGrade";

const RouteDefinitions = () => {
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) =>
      state.auth.isAuthenticated
  );

  console.log("isAuthenticated", isAuthenticated);
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
                <Route path="/grades" element={<Grades />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RouteDefinitions;

