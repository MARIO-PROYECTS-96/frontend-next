import React from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <img src="/image/2.jpg" className="img-fluid w-100" alt="Background" />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <Link href="/Login" legacyBehavior>
            <a className="btn btn-primary">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
