const Map = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Carte en temps réel</h2>
      <div className="w-full h-[400px] bg-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">
          Carte GPS ici (via Leaflet, Google Maps, etc.)
        </p>
      </div>
    </div>
  );
};

export default Map;
