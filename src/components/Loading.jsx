import "../assets/loading.css";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-3">
        <div className="loading-dot delay-0" />
        <div className="loading-dot delay-150" />
        <div className="loading-dot delay-300" />
      </div>
    </div>
  );
};

export default Loading;
