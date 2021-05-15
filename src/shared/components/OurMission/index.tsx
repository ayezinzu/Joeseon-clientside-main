import React from "react";
import "./ourMission.scss";

interface OurMissionProps {}

function OurMission(props: OurMissionProps) {
  return (
    <div className="our-mission" id="our-mission">
      <h1>MISSION</h1>
      <ul>
        <li>
          To ensure that all citizens of the world have an equal right to life,
          liberty and the pursuit of happiness.
        </li>
        <li>To fight and end crimes against humanity.</li>
        <li>To achieve lasting world peace.</li>
        <li>
          To ensure that the internet remains a place of freedom and for the
          people.
        </li>
      </ul>
    </div>
  );
}

export default OurMission;
