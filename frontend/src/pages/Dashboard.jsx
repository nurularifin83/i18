import MainLayout from "../layouts/MainLayout";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <h1>{t("dashboard.title")}</h1>
      <p>{t("dashboard.welcome")}</p>
    </MainLayout>
  );
}

export default Dashboard;
