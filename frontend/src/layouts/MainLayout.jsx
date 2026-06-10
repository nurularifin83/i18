import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function MainLayout({ children }) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };
  const navigate = useNavigate();

  const { setUser, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout successfully");

      setUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "250px",
          padding: "20px",
        }}
      >
        <h2>{t("sidebar.appname")}</h2>

        <p>
          {t("sidebar.welcome")}, {user?.name}
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/dashboard">{t("menu.dashboard")}</Link>
          </li>
          <li>
            <Link to="/vendor">{t("menu.vendor")}</Link>
          </li>
          <li>Procurement</li>
          <li>Sourcing</li>
          <li>Contract</li>
          <li>Sanction</li>
          <li>
            <button onClick={handleLogout}>{t("common.logout")}</button>
          </li>
          <button onClick={() => changeLanguage("en")}>EN</button>

          <button onClick={() => changeLanguage("id")}>ID</button>

          <button onClick={() => changeLanguage("ja")}>JA</button>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}

export default MainLayout;
