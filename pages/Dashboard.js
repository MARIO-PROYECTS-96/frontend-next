import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCreate from "../src/components/modal/ModalCreate"; // Importa el componente Modal de creación
import ModalUpdate from "../src/components/modal/ModalUpdate"; // Importa el componente Modal de actualización
import ModalDelete from "../src/components/modal/ModalDelete"; // Importa el componente Modal de eliminación

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
  const [showCreateModal, setShowCreateModal] = useState(false); // Estado para controlar la visibilidad del modal de creación
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Estado para controlar la visibilidad del modal de actualización
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal de eliminación
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Estado para almacenar el ID del usuario a eliminar
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado para actualizar
  const router = useRouter(); // Router de Next.js

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

  // Manejadores de eventos para mostrar los modals de creación, actualización y eliminación
  const handleAddUserClick = () => {
    setShowCreateModal(true);
  };

  const handleUpdateUserClick = (user) => {
    setSelectedUser(user); // Establece el usuario seleccionado para actualizar
    setShowUpdateModal(true); // Muestra el modal de actualización
  };

  const handleDeleteUserClick = (userId) => {
    setUserIdToDelete(userId); // Establece el userIdToDelete para el usuario que se va a eliminar
    setShowDeleteModal(true); // Muestra el modal de eliminación
  };
  
  // Función para crear un nuevo usuario
  const handleCreateUser = async (userData) => {
    try {
      const response = await fetchWithToken("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      // Actualizar la lista de usuarios después de la creación exitosa
      fetchUsers();
      setShowCreateModal(false); // Oculta el modal después de la creación exitosa
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Función para actualizar un usuario existente
  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetchWithToken(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUserData)
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      // Actualizar la lista de usuarios después de la actualización exitosa
      fetchUsers();
      setShowUpdateModal(false); // Oculta el modal después de la actualización exitosa
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Función para eliminar un usuario existente
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetchWithToken(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Actualizar la lista de usuarios después de la eliminación exitosa
      fetchUsers();
      setShowDeleteModal(false); // Oculta el modal después de la eliminación exitosa
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Función para salir (logout)
  const handleLogout = () => {
    // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem("token");
    // Redirige al usuario a la página de inicio de sesión
    router.push("/Login");
  };

  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <div className="position-absolute top-0 start-0 p-3">
          <button onClick={handleLogout} className="btn btn-warning">Salir</button>
        </div>
        <div className="container bg-white p-4 rounded shadow mx-auto w-75">
          <h2 className="mb-4">Dashboard</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th> {/* Nueva columna para las acciones */}
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
                    <td>
                      <button onClick={() => handleUpdateUserClick(user)} className="btn btn-success">Actualizar</button>
                      <button onClick={() => handleDeleteUserClick(user.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="mt-3">
            <button onClick={handleAddUserClick} className="btn btn-primary">Añadir Usuario</button>
          </p>
        </div>
      </div>
      {/* Renderiza el modal de agregar usuario si showCreateModal es true */}
      {showCreateModal && <ModalCreate onClose={() => setShowCreateModal(false)} onCreateUser={handleCreateUser} />}
      {/* Renderiza el modal de actualización si showUpdateModal es true */}
      {showUpdateModal && <ModalUpdate onClose={() => setShowUpdateModal(false)} user={selectedUser} onUpdateUser={handleUpdateUser} />}
      {/* Renderiza el modal de eliminación si showDeleteModal es true */}
      {showDeleteModal && <ModalDelete onClose={() => setShowDeleteModal(false)} onDeleteUser={handleDeleteUser} userId={userIdToDelete} />}
    </div>
  );
};

export default Dashboard;
