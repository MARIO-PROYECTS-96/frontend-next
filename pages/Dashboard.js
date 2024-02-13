// Importa los módulos necesarios
import React, { useState, useEffect } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

// Función para obtener el token de autenticación del almacenamiento local
const getToken = () => {
  return localStorage.getItem("token");
};

// Función para realizar solicitudes HTTP con el token adjunto
const fetchWithToken = async (url, options) => {
    const token = getToken();
  
    // Verifica si el token está presente
    if (!token) {
      throw new Error("Token not found");
    }
  
    // Inicializa options como un objeto si es nulo
    options = options || {};
  
    // Adjunta el token como encabezado Authorization
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    // Realiza la solicitud HTTP con el token adjunto
    return fetch(url, options);
  };
  

// Componente Dashboard
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchWithToken("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar la lista de usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <div className="position-absolute top-0 start-0 p-3">
          <Link href="/logout" legacyBehavior><a>Logout</a></Link>
        </div>
        <div className="container bg-white p-4 rounded shadow mx-auto w-75">
          <h2 className="mb-4">Dashboard</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3">Error: {error}</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="mt-3">
            <Link href="/users/add" legacyBehavior><a>Add User</a></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
