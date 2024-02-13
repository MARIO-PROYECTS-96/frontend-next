import React from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/page.module.css'; // Importa tus estilos Sass

function HomePage() {
  return (
    <div className="container-fluid p-0 position-relative">
      <img
        src="/image/2.jpg"
        className="img-fluid gg"
        alt="Background"
      />
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white"> {/* Ajusta la posición top para subir el texto y el botón */}
        <h1 className="display-1 mb-4">Gestión de Usuarios</h1> {/* Agrega la clase de bootstrap "mb-4" para darle margen inferior */}
        <Link href="/Login" legacyBehavior>
          <a className="btn btn-primary btn-lg">Login</a>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
