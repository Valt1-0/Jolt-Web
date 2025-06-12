import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-secondary bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
          Bienvenue sur notre site !
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Nous sommes ravis de vous voir ici. Explorez et découvrez tout ce que
          nous avons à offrir.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold transform transition-transform hover:scale-105">
          Commencer
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
