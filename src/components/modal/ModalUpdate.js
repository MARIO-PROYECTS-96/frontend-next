import React, { useState, useEffect } from "react";
import "../modal/modal.scss"; // Importa los estilos Sass del modal

const ModalUpdate = ({ onClose, user, onUpdateUser }) => {
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para la contraseña

  // useEffect para actualizar los estados cuando se cambia el usuario
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPassword(user.password); // Asegúrate de que el campo de contraseña tenga un estado para manejarlo adecuadamente
    }
  }, [user]);

  // Función para manejar cambios en el campo de nombre de usuario
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Función para manejar cambios en el campo de contraseña
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Función para manejar la actualización del usuario
  const handleUpdateUser = () => {
    // Llama a la función onUpdateUser con los nuevos datos de usuario
    onUpdateUser(user.id, { username, password });
    // Cierra el modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Actualizar Usuario</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
