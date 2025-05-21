import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="/"
          className="text-2xl font-bold text-[#70E575]"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Jolt
        </motion.a>

        <div className="hidden md:flex space-x-8">
          {["Accueil", "Carte", "Fonctionnalités", "Contact"].map((link, i) => (
            <motion.a
              key={i}
              href={`#${link.toLowerCase()}`}
              className="text-gray-700 font-medium hover:text-[#70E575] transition"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Burger menu mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { rotate: 0 },
              open: { rotate: 45 },
            }}
            className="w-6 h-0.5 bg-[#70E575] mb-1 rounded"
          />
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="w-6 h-0.5 bg-[#70E575] mb-1 rounded"
          />
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { rotate: 0 },
              open: { rotate: -45 },
            }}
            className="w-6 h-0.5 bg-[#70E575] rounded"
          />
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-white shadow-inner"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            {["Accueil", "Carte", "Fonctionnalités", "Contact"].map(
              (link, i) => (
                <a
                  key={i}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-700 font-medium hover:text-[#70E575] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              )
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
