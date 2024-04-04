import { Container, Nav, Navbar } from "react-bootstrap";
import PlatformOffcanvas from "../../components/Offcanvas/PlatformOffcanvas";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navbar/Navigation";

const Home = () => {
  return (
    <>
      <Navigation />
      <Sidebar />
    </>
  );
};

export default Home;
