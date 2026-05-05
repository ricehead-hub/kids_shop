import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        email,
        password
      });

      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Ошибка регистрации");
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>

      <input
        name="email"
        placeholder="Email"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        name="password"
        type="password"
        placeholder="Пароль"
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleRegister}>
        Зарегистрироваться
      </button>
    </div>
  );
}

export default Register;