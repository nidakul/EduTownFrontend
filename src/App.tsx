import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grades from "./pages/Grades/Grades";
import UserInformation from "./pages/UserInformation/UserInformation";
import RouteDefinitions from "./components/Routes/RouteDefinitions";


function App() {
  return (
    <RouteDefinitions />
  );
}

export default App;
