import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Application.scss";
import DayListItem from "./DayListItem";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors.js";
import { getInterview } from "../helpers/selectors.js";

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
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  //const setDays = responseData => setState(prev => ({ ...prev, days: responseData }));

  useEffect(() => {
    // axios.get(`/api/days`).then((response) => {
    //   console.log("check response", response);
    //   setDays(response.data);
    //   //setState({ ...state, days: response.data });

    // })

    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')

    ]).then((all) => {
      // set your states here with the correct values...
      console.log("checkall", all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));

    })
  }, []);
  console.log("checkinterviewers", state.interviewers)

  function bookInterview(id, interview) {

    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({
        ...state,
        appointments
      })
      )

  }

  function cancelInterview(id) {

    console.log("string saying cancel", id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({
        ...state,
        appointments
      })
      )

  }


  //const dailyAppointments = [];
  const interviewersForDay = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const mappedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time}
        interview={interview} bookInterview={bookInterview} interviewers={interviewersForDay} cancelInterview={cancelInterview} />)
  })
  console.log("state status", state);
  return (
    //<DayListItem name = "fred"></DayListItem>

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
            setDay={setDay}
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


