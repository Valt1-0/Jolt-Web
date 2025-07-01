// src/pages/PaymentSuccess.jsx
import { FaCheckCircle, FaStripeS } from "react-icons/fa";
import { Link } from "react-router";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
      <div className="flex flex-col items-center space-y-4 max-w-md text-center">
        <FaCheckCircle className="text-green-500 text-7xl" />
        <h1 className="text-3xl font-semibold text-gray-800">
          Paiement réussi
        </h1>
        <p className="text-gray-600">
          Merci pour votre commande. Vous recevrez un email de confirmation dans quelques minutes.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 transition"
        >
          Retour à l'accueil
        </Link>
        <div className="mt-6 flex items-center space-x-2 text-gray-400">
          <FaStripeS className="text-2xl" />
          <span className="text-sm">Paiement sécurisé par Stripe</span>
        </div>
      </div>
    </div>
  );
}
