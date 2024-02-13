import React from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <img src="/image/2.jpg" className="img-fluid w-100" alt="Background" />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="container bg-white p-4 rounded shadow mx-auto w-75">
            <form>
              <h2 className="mb-4">Login</h2>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Username" />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            </form>
            <p className="mt-3">
              Don't have an account? <Link href="/register" legacyBehavior><a>Register</a></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
