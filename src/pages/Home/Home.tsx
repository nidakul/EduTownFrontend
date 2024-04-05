import Navigation from "../../components/Navbar/Navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserInformation from "../UserInformation/UserInformation";

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="d-flex">
        <Sidebar />
        <UserInformation />
      </div>
    </>
  );
};

export default Home;
