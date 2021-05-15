import React from "react";
import "./aboutUs.scss";
import logoPinkBackground from "../../../assets/images/logoPinkBackground.png";

interface AboutUsProps {}

function AboutUs(props: AboutUsProps) {
  return (
    <div className="about-us" id="about-us">
      <img
        src={logoPinkBackground}
        className="about-us__background-img"
        alt="Logo background"
      />
      <h1>ABOUT</h1>
      <h2>
        The Joseon Empire has been in existence since 1392. Started by Emperor
        Seong-gye Lee, Joseon has grown into one of the most powerful nations in
        the world. In 2018, Emperor Seok Lee crowned Crown Prince Andrew Lee as
        heir to the throne of the Joseon Empire. <br />
        <br /> The Crown Prince set on a journey to establish Joseon's sovereign
        presence in the digital realm. As of 2021, Joseon's digital presence has
        been both secured and established. <br /> <br /> Joseon currently
        maintains perpetual and permanent treaties with the United States of
        America, the United Kingdom, the Kingdom of Belgium and the Kingdom of
        Denmark.
      </h2>
    </div>
  );
}

export default AboutUs;
