export default function convertDate(data) {
  let date = new Date(data * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December ',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  let dayNumber = date.getDate();
  if (dayNumber < 10) dayNumber = `0${dayNumber}`;
  return {
    day: day,
    month: month,
    date: dayNumber,
    full: `${month} ${dayNumber}, ${day}`,
  };
}
