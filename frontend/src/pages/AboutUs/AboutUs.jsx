import React from "react";
import { Link } from "react-router-dom";
import "./Module.scss";

export const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="back-login">
        <Link to="/login-user" className="back-about">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p>Back</p>
        </Link>
        <h1>Sobre Nosotros</h1>
      </div>{" "}
      <p className="text-about">
        Econnect es una plataforma creada para facilitar la donación y el
        intercambio de artículos entre personas. Nuestra misión es construir una
        comunidad donde aquellos que tienen artículos que ya no necesitan puedan
        conectarse con quienes los necesitan, promoviendo la sostenibilidad y el
        aprovechamiento de los recursos.
      </p>
      <p className="text-about">
        En Econnect, creemos que cada objeto merece una segunda oportunidad. Nos
        esforzamos por reducir el desperdicio y fomentar un mundo donde todos
        puedan beneficiarse a través de la reutilización y el intercambio.
      </p>
    </div>
  );
};
