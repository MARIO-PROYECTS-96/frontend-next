import React from "react";
import "../modal/modal.scss"; // Importa los estilos Sass del modal

const ModalDelete = ({ onClose, onDeleteUser, userId }) => {
  // Función para manejar la eliminación del usuario
  const handleDelete = () => {
    // Llama a la función onDeleteUser pasando el ID del usuario
    onDeleteUser(userId);
    // Cierra el modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar Usuario</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onClose}>No</button>
            <button type="button" className="btn btn-success" onClick={handleDelete}>Sí</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
