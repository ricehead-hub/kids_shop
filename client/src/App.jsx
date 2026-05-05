import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import "./styles/main.css";

function App() {
  return (
    <>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </>
  );
}

export default App;