import React from "react";
import "./DayListItem.scss";
export default function DayListItem(props) {

  //add if statements for scss.
  const formatSpots = function () {
    if (props.spots === 2) {
      return "no spots remaining";
    }
    else if (props.spots === 1) {
      return "one spot remaining";
    }
  }
  return (
    <li onClick={() => props.setDay} >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
