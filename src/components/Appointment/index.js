import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  let buttonClass = "button";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => console.log("error"))
  }

  function deleteInterview() {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => console.log("error"))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          appointmentId={props.id}
        />

      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (<Confirm message={`CONFIRM`} onCancel={back} onConfirm={deleteInterview} />)}
      {mode === DELETE && (<Status message={`DELETING`} />)}

    </article>
  );
}