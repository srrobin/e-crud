import React from "react";
import { useTranslation } from "react-i18next";
import round from "../assets/final.png";

const Home = () => {
  const { t } = useTranslation("home");
  return (
    <div>
      <div className="circle left__img">
        <img src={round} alt="" />
      </div>
      <div className="text__area">
        <h2>{t("heading")} </h2>
        <p>{t("description.overview")}</p>
        <span className="tech">{t("description.tech.1")}</span>
        <span className="tech">{t("description.tech.2")}</span>
        <span className="tech">{t("description.tech.3")}</span>
        <span className="tech">{t("description.tech.4")}</span>
        <span className="tech">{t("description.tech.5")}</span>
        <span className="tech">{t("description.tech.6")}</span>
        <span className="tech">{t("description.tech.7")}</span>
        <span className="tech">{t("description.tech.8")}</span>
        <span className="tech">{t("description.tech.9")}</span>
        <p>{t("description.summary")}</p>
      </div>
    </div>
  );
};

export default Home;
