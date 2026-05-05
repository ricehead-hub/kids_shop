import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (!email || !password) {
        alert("Заполни все поля");
        return;
      }

      const url = isLogin
        ? `${import.meta.env.VITE_API_URL}/api/auth/login`
        : `${import.meta.env.VITE_API_URL}/api/auth/register`;

      const res = await axios.post(url, {
        email,
        password
      });

      localStorage.setItem("userEmail", email);

      alert(res.data.msg || "Успешно");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Ошибка авторизации");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleAuth}>
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>

        <p
          className="auth-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Нет аккаунта? Регистрация"
            : "Уже есть аккаунт? Войти"}
        </p>

      </div>

    </div>
  );
}

export default AuthPage;