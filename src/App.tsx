import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grades from "./pages/Grades/Grades";
import UserInformation from "./pages/UserInformation/UserInformation";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home />}>
      <Route path="/" element= {<UserInformation />} />
      <Route path="/grades" element={<Grades />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
