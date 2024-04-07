import { Route, Routes } from "react-router-dom";
import Navigation from "../../components/Navbar/Navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserInformation from "../UserInformation/UserInformation";
import Grades from "../Grades/Grades";
import Login from "../Login/Login";

const Home = () => {
  return (
    <>
      {/* <Navigation />
      <div className="d-flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserInformation />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
      </div> */}
      <Login></Login>
    </>
  );
};

export default Home;
