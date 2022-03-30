export function getAppointmentsForDay(state, currentDay) {
  const SelectAppointmentsDay = state.days.filter(day => day.name === currentDay);
  if (!SelectAppointmentsDay[0]) { return [] };
  const AppointmentsForTheDay = [];
  //return AppointmentsForTheDay;
  for (let AppointmentId of SelectAppointmentsDay[0].appointments) {
    for (let key in state.appointments) {
      if (AppointmentId === state.appointments[key].id) {
        AppointmentsForTheDay.push(state.appointments[key])
      }
    }
  }
  return AppointmentsForTheDay;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const appointmentInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return appointmentInterview;

  //   for (let appointment in state.appointments) {
  //     if ([appointment].interview.interviewer) {

  //       appointmentInterviewers.student = [appointment].interview.student;
  //       let interviewerId = appointment.interview.interviewer;
  //       appointmentInterviewers.interviewer = state.interviewers.interviewerId;
  //     }
  //   }
  //   return appointmentInterview;

}

export function getInterviewersForDay(state, day) {



  const selectedDay = state.days.find(dayItem => dayItem.name === day);

  if (!selectedDay) { return [] };
  console.log("selectedda", selectedDay);
  return selectedDay.interviewers.map(id => state.interviewers[id])

}