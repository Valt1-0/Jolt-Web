import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
