// export const splitDate = (dateString) => {
//   const date = new Date(dateString);
//   const month = date.toLocaleString("default", { month: "short" });
//   const day = date.getDate();
//   const year = date.getFullYear();
//   const weekday = date.toLocaleString("default", { weekday: "short" });

//   return { month, day, year, weekday };
// };

export const formatTo12HourTime = (timeString) => {
  const [hour, minute] = timeString.split(":");
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${ampm}`;
};

export const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const upperCase = (str) => {
  return str.toUpperCase();
};

export const splitDate = (dateString) => {
  // Split the date string assuming format YYYY-MM-DD
  const [year, month, day] = dateString.split("-").map(Number);
  // Create a new Date object with the correct date parts
  const date = new Date(Date.UTC(year, month - 1, day));

  const monthName = date.toLocaleString("default", { month: "short" });
  const dayOfMonth = date.getUTCDate();
  const yearNumber = date.getUTCFullYear();
  const weekdayName = date.toLocaleString("default", { weekday: "short" });

  return {
    month: monthName,
    day: dayOfMonth,
    year: yearNumber,
    weekday: weekdayName,
  };
};

//
