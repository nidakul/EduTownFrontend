import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInformation from "./pages/UserInformation/UserInformation";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home />}>
      <Route path="/user-information" element={<UserInformation />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
