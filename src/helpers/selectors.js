export function getAppointmentsForDay(state, currentDay) {
  //Determines the day the appointments will be retrieved for.
  const SelectAppointmentsDay = state.days.filter(day => day.name === currentDay);
  if (!SelectAppointmentsDay[0]) { return [] };
  //Specific appointments for the selected. day saved in an array.
  const AppointmentsForTheDay = [];
  for (let AppointmentId of SelectAppointmentsDay[0].appointments) {
    for (let key in state.appointments) {
      if (AppointmentId === state.appointments[key].id) {
        AppointmentsForTheDay.push(state.appointments[key])
      }
    }
  }
  return AppointmentsForTheDay;
}
//Updates appointment remaining for a particular day by counting the null values in
//an array.
export function computeSpotsRemaining(state, currentDay) {
  const appointmentsForDay = getAppointmentsForDay(state, currentDay);
  const spotsRemaining = appointmentsForDay.filter(appt => appt.interview === null).length
  return spotsRemaining

}
//Retrieves interview info for a particular appointment object.
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const appointmentInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return appointmentInterview;

}
//Provides an array of all interviewers for a particular day.
export function getInterviewersForDay(state, day) {

  const selectedDay = state.days.find(dayItem => dayItem.name === day);

  if (!selectedDay) { return [] };
  return selectedDay.interviewers.map(id => state.interviewers[id])

}