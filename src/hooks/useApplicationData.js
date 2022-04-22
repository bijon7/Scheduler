import axios from "axios";
import { useState, useEffect } from "react";
import { computeSpotsRemaining } from "../helpers/selectors";


export default function useApplicationData() {
  //Combined useState hook.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    setState({ ...state, day })
  }



  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')

    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));

    })
  }, []);


  function bookInterview(id, interview) {

    const appointment = {
      //copies a particular appointment object based on the provided appointment id
      //and updates the interview key of the appointment with the new interview value.
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      //Updates the list of the appointments with the new appointment object.
      ...state.appointments,
      [id]: appointment
    };

    const spotsRemaining = computeSpotsRemaining({ ...state, appointments }, state.day)
    //return list of days showing current status of spots remaining and updates the days
    //and appointments using .then method.
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: spotsRemaining }
      } else {
        return day
      }
    })

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {

        setState({
          ...state,
          appointments,
          days,
        })
      }
      )

  }

  function cancelInterview(id) {

    //Updates appointment object after canceling appointment.
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spotsRemaining = computeSpotsRemaining({ ...state, appointments }, state.day)
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: spotsRemaining }
      } else {
        return day
      }
    })
    return axios.delete(`/api/appointments/${id}`)
      //State updated after updating days with current spots and new remaining appointments.
      .then(() => setState({
        ...state,
        appointments,
        days,
      })
      )

  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}