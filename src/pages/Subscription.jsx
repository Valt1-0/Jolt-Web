import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Free",
    price: "0€ / mois",
    description:
      "Explorez librement l’univers VLEU et découvrez les fonctionnalités de base pour vos trajets.",
    features: [
      "Accès complet à la carte interactive",
      "Création jusqu'à 5 itinéraires personnalisés",
      "1 véhicule maximum",
      "Accès aux trajets partagés par la communauté",
    ],
    popular: false,
  },
  {
    name: "Premium",
    priceMonthly: "6,99€",
    priceYearly: "69,99€",
    description:
      "Débloquez toutes les fonctionnalités pour gérer, vendre ou louer vos véhicules en toute liberté.",
    features: [
      "Tous les avantages de l'offre Free",
      "Itinéraires illimités",
      "Véhicules illimités",
      "Accès à la partie Maintenance",
      "Réductions exclusives chez nos partenaires (-5 %)",
    ],
    popular: true,
  },
  {
    name: "Pro VLEU",
    price: "14,99€ / mois",
    description:
      "Une offre complète pour les professionnels et revendeurs souhaitant maximiser leur visibilité et automatiser leur gestion.",
    features: [
      "Tous les avantages de l'offre Premium",
      "0 % de commission sur les ventes et les locations",
    ],
    popular: false,
  },
];

const getInitialX = (index) => {
  if (index === 0) return -50;
  if (index === 1) return 0;
  if (index === 2) return 50;
  return 0;
};

export default function Subscription() {
  const [premiumBilling, setPremiumBilling] = useState("monthly");

  return (
    <motion.div
      className="bg-gray-50 min-h-screen py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="max-w-3xl mx-auto text-center mb-14 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choisissez votre abonnement VLEU
        </h1>
        <p className="text-base text-gray-600">
          Vente, location et gestion de véhicules légers électriques entre
          particuliers et pros.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {plans.map((plan, idx) => {
          const isPremium = plan.name === "Premium";
          const price = isPremium
            ? premiumBilling === "monthly"
              ? plan.priceMonthly
              : plan.priceYearly
            : plan.price;

          return (
            <motion.div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-md ${
                plan.popular
                  ? "border-green-600 shadow-green-300 bg-green-50"
                  : "border-gray-200"
              }`}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: getInitialX(idx) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold rounded-full px-3 py-1 shadow">
                  Le plus populaire
                </div>
              )}

              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {plan.name}
                </h2>

                {isPremium && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium">Mensuel</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-xs"
                      checked={premiumBilling === "yearly"}
                      onChange={() =>
                        setPremiumBilling(
                          premiumBilling === "monthly" ? "yearly" : "monthly"
                        )
                      }
                    />
                    <span className="font-medium">
                      Annuel{" "}
                      <span className="text-green-600 font-semibold">
                        (-2 mois)
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  {price}
                  <span className="text-base font-normal text-gray-500">
                    /
                    {isPremium
                      ? premiumBilling === "monthly"
                        ? "mois"
                        : "an"
                      : "mois"}
                  </span>
                </p>
              </div>

              <ul className="text-base text-gray-700 space-y-3 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheck className="text-green-600 mr-3 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.96 }}
                className={`w-full py-3 rounded-lg text-base font-medium text-white transition
                  ${
                    plan.popular
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-700 hover:bg-gray-800"
                  }
                `}
              >
                {plan.name === "Free"
                  ? "Commencer gratuitement"
                  : plan.name === "Premium"
                  ? "Passer Premium"
                  : "Opter pour l'offre Pro"}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
