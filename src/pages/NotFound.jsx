import NotFoundIllustration from "../assets/illustrations/404.svg";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8">
    <img
      src={NotFoundIllustration}
      alt="404 Non Trouvé"
      className="max-w-xs w-full mb-8"
    />
    <h1 className="text-3xl font-bold mb-4">404 - Page non trouvée</h1>
    <p className="text-lg text-gray-600">
      La page que vous recherchez n'existe pas.
    </p>
  </div>
);

export default NotFoundPage;
