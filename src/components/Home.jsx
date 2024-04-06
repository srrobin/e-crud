import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("home");
  return (
    <div>
      <h2>{t("heading")} </h2>
      <p>{t("description.overview")}</p>
      <p>{t("description.details")}</p>
    </div>
  );
};

export default Home;
