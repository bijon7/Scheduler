import React from "react";
//import "./interviewerListItem.scss";
//import "DayListItem.scss";
import classNames from "classnames";
import "components/InterviewerListItem.scss"
export default function interviewerListItem(props) {
  //const interviewerClass = ` `
  const InterviewerListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li className={InterviewerListItemClass}
      onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}
