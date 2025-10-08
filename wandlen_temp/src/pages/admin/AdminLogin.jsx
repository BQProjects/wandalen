import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { DATABASE_URL } = useContext(DatabaseContext);
  const navigate = useNavigate();
  const { setUserType } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    try {
      const response = await fetch(`${DATABASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("user", JSON.stringify({ email: data.email }));
        localStorage.setItem("sessionId", "dummy-session-id-for-admin");
        localStorage.setItem("userId", data.id);
        setUserType("admin");
        console.log("Login successful, navigating to /admin");
        window.location.href = "/admin";
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
