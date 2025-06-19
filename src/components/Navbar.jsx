// Navbar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const { user, logout, isLoggedIn } = useAuth();
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Map", route: "/map" },
    { name: "dadadzd", route: "/verifyEmail", auth: false },
    { name: "Profile", route: "/profile", auth: true },
    { name: "Connexion", route: "/auth", auth: false },
  ];

  const filteredLinks = links.filter(
    (link) => link.auth === undefined || link.auth === isLoggedIn
  );

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${height}px`
        );
      }
    };

    updateNavHeight();

    const resizeObserver = new ResizeObserver(updateNavHeight);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    window.addEventListener("resize", updateNavHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateNavHeight);
    };
  }, [isOpen]);

  return (
    <nav ref={navRef} className="fixed w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="/"
          className="text-4xl font-extrabold text-[#70E575] tracking-wide"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Jolt
        </motion.a>

        <div className="hidden md:flex space-x-8 items-center">
          {filteredLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.route}
              className="text-gray-700 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#70E575] hover:after:w-full after:transition-all after:duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
            </motion.a>
          ))}
          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <img
                src={user.pp}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <button
                onClick={logout}
                className="text-red-500 font-medium hover:underline"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>

        {/* Burger button */}
        <button
          className="md:hidden focus:outline-none z-50 relative w-8 h-6 flex flex-col justify-between"
          onClick={toggleMenu}
          aria-label="Menu mobile"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-1 bg-[#70E575] rounded origin-left block"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-1 bg-[#70E575] rounded block"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-1 bg-[#70E575] rounded origin-left block"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-5">
              {filteredLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.route}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 text-lg font-medium hover:text-[#70E575] transition"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {link.name}
                </motion.a>
              ))}
              {isLoggedIn && (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.pp || "https://via.placeholder.com/150"}
                    alt="User"
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                  />
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-red-500 text-left font-medium hover:underline"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
