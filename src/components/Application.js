import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Application.scss";
import DayListItem from "./DayListItem";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors.js";
import { getInterview } from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {

  //Sets up custom hook useApplicationData
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();



  const interviewersForDay = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  //mappedAppointments represents information on single appointments that
  //gets passed to the index.js file for execution.
  const mappedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time}
        interview={interview} bookInterview={bookInterview} interviewers={interviewersForDay} cancelInterview={cancelInterview} />)
  })

  return (
    //List of days will be rendered by passing state props to DayList components.

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            day={state.day}
            value={state.day}
            onChange={setDay}

          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {mappedAppointments}
        <Appointment key="last" time="5pm" />

      </section>

    </main>
  );


}


