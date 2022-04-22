import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
//index.js file provides logic for rendering of different components of the app.

export default function Appointment(props) {
  //Only show appointment information if exists.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  let buttonClass = "button";
  //save function takes arguments to match a student with the interviewer.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //Shows message while  in the process of saving.
    transition(SAVING);
    props.bookInterview(props.id, interview)
      //Shows the student and interviewer names on the appointment slot after
      //booking an appointment.
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  //Deletes an existing interview.
  function deleteInterview() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      //Shows an empty slot after canceling an appointment.
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  //rendering takes place on corresponding modes.
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => (transition(EDIT))}
          appointmentId={props.id}
        />

      )}

      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (<Confirm message={`CONFIRM`} onCancel={back} onConfirm={deleteInterview} />)}
      {mode === DELETE && (<Status message={`DELETING`} />)}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={() => back()} onSave={save} />}
      {mode === ERROR_SAVE && (<Error message={"error saving"} onClose={back} />)}
      {mode === ERROR_DELETE && (<Error message={"error deleting"} onClose={back} />)}


    </article>
  );
}