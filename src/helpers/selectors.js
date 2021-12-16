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