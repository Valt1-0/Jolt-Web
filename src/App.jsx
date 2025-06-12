import { BrowserRouter as Router, Routes, Route } from "react-router";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import WelcomeMessage from "./components/WelcomeMessage"; // Assure-toi d'avoir ce composant

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const welcomeCookie = getCookie('visited');
    if (!welcomeCookie) {
      setShowWelcome(true);
      setCookie('visited', 'true', 365);
    }

    return () => clearTimeout(timer);
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  return (
    <Router>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          {showWelcome && <WelcomeMessage onClose={() => setShowWelcome(false)} />}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
