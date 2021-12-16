import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js"

export default function Appointment(props) {
  let buttonClass = "button";
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show interview={props.interview} /> : <Empty />}
    </article>
  );
}