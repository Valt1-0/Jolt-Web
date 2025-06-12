import "../assets/loading.css"; // Ensure this path is correct based on your project structure
const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex space-x-2">
        <div className="w-8 h-8 rounded-full bg-primary animate-bounce-slow"></div>
        <div className="w-8 h-8 rounded-full bg-primary animate-bounce-slower"></div>
        <div className="w-8 h-8 rounded-full bg-primary animate-bounce-slowest"></div>
      </div>
    </div>
  );
};

export default Loading;
