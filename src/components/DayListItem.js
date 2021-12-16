import React from "react";
import "./DayListItem.scss";
export default function DayListItem(props) {

  // //add if statements for scss.
  //   const formatSpots = function (spots) {
  //     if (props.spots === 0) {
  //       return "no spots remaining";
  //     }
  //   } call on line 13 and 14.
  return (
    <li onClick={() => props.setDay} >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}
