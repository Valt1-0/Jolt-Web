// src/pages/PaymentCancel.jsx
import { FaTimesCircle, FaStripeS } from "react-icons/fa";
import { Link } from "react-router";

export default function PaymentCancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
      <div className="flex flex-col items-center space-y-4 max-w-md text-center">
        <FaTimesCircle className="text-red-500 text-7xl" />
        <h1 className="text-3xl font-semibold text-gray-800">
          Paiement annulé
        </h1>
        <p className="text-gray-600">
          Votre transaction n'a pas été finalisée. Vous pouvez réessayer ou retourner à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-400 text-white font-medium rounded-md shadow hover:bg-gray-500 transition"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/checkout"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow hover:bg-purple-700 transition"
          >
            Réessayer le paiement
          </Link>
        </div>
        <div className="mt-6 flex items-center space-x-2 text-gray-400">
          <FaStripeS className="text-2xl" />
          <span className="text-sm">Paiement sécurisé par Stripe</span>
        </div>
      </div>
    </div>
  );
}
