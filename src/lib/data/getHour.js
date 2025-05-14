function getHour(hour = 0) {
  if (hour == "0") {
    return "12:00  AM";
  }
  return hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00  AM`;
}

export default getHour;
