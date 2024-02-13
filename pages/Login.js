import React, { useState } from "react";
import { useRouter } from "next/router"; // Importa el hook useRouter
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const router = useRouter(); // Obtén el enrutador
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      // Assuming the API returns a JSON object with a token
      const data = await response.json();
      console.log("Token:", data.token);

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redireccionar a la página de Dashboard
      router.push("/Dashboard");

    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <img src="/image/2.jpg" className="img-fluid w-100" alt="Background" />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="container bg-white p-4 rounded shadow mx-auto w-75">
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4">Login</h2>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
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
