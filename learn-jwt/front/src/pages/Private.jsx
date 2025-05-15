import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Private() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://127.0.0.1:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Perfil Privado</h2>
      {profile ? (
        <div className="card p-3">
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Bio:</strong> {profile.biography || "(vacío)"}
          </p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Private;
