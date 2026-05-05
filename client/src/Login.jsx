import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
      });

      alert(res.data.msg);
      localStorage.setItem("userEmail", email);
      console.log("ROLE:", res.data.role);
    } catch (err) {
      alert(err.response?.data?.msg || "Ошибка входа");
    }
  };

  return (
    <div>
      <h2>Вход</h2>

      <input
        placeholder="Email"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Пароль"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
}

export default Login;