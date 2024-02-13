import React, { useState } from "react";
import "../modal/modal.scss"; // Importa los estilos Sass del modal

const ModalCreate = ({ onClose, onCreateUser }) => {
  // Estados para almacenar los datos del nuevo usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Manejador de evento para enviar los datos del nuevo usuario al backend
  const handleSaveChanges = async () => {
    try {
      // Crear el objeto de usuario con los datos introducidos en el formulario
      const userData = { username, password };
      
      // Llamar a la función onCreateUser para enviar los datos al backend
      await onCreateUser(userData);

      // Cerrar el modal después de crear el usuario exitosamente
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add User</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} // Actualiza el estado 'username' cuando cambia el valor del input
                />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado 'password' cuando cambia el valor del input
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
