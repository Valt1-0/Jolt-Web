const Profile = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mon Profil</h2>
      <div className="bg-white shadow p-4 rounded-lg">
        <p>
          <strong>Nom :</strong> Jean Dupont
        </p>
        <p>
          <strong>Email :</strong> jean@example.com
        </p>
        <p>
          <strong>Historique :</strong> 12 trajets
        </p>
      </div>
    </div>
  );
};

export default Profile;
