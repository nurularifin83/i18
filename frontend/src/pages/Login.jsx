import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login as loginService } from "../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const login = async () => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await loginService({
        email,
        password,
      });

      setUser(response.data.user);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
