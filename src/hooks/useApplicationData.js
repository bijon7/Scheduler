import axios from "axios";
import { useState, useEffect } from "react";
import { computeSpotsRemaining } from "../helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    console.log({ day })
    setState({ ...state, day })
  }

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
    const spotsRemaining = computeSpotsRemaining({ ...state, appointments }, state.day)
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

    console.log("string saying cancel", id);
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