import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../public/styles/Register.module.scss"; // Importa los estilos Sass del formulario de registro

const fetchWithToken = async (url, options) => {
  // Lógica de la función fetchWithToken
};

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithToken("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      setFormData({
        username: "",
        password: ""
      });
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className="text-center mb-4">Registro de Usuarios</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
