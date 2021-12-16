import React from "react";
//import "./interviewerListItem.scss";
//import "DayListItem.scss";
export default function interviewerListItem(props) {
  //const interviewerClass = ` `

  return (
    <li onClick={() => props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}
