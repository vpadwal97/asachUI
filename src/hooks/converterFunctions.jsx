// export const convertMillisecondsToTime = (milliseconds) => {
//     const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 ms
//     const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minute = 60000 ms

//     // Format the hours and minutes to ensure they always have 2 digits
//     const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
//     return formattedTime;
//   };
import { format } from "date-fns";

export const convertMillisecondsToTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = milliseconds % 1000; // Extract milliseconds

  let timeString = "";
  if (days > 0) timeString += `${days}d:`;
  if (hours > 0 || days > 0) timeString += `${hours}h:`; // Show hours if there are days or hours
  if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m:`; // Show minutes if there are hours or days
  if (seconds >= 0) timeString += `${seconds}s:`; // Always show seconds
  if (ms >= 0) timeString += `${ms}ms`; // Always show milliseconds

  return timeString;
};

export const roundFareToTwoDecimalPlaces = (fare) => {
  const roundedFare = Math.ceil(Number(fare || 0) * 100) / 100;
  return roundedFare.toFixed(2);
};

export const ensureArray = (data) => {
  if (data === null || data === undefined) {
    return [];
  }
  return Array.isArray(data) ? data : [data];
};

export const formatDate = (dateString, outputFormat) => {
  // const date = new Date(dateString);
  return format(new Date(dateString), outputFormat);
};

export const convertCategoryCode = (code) => {
  switch (code) {
    case "ADT":
      return "Adult";
    case "CNN":
      return "Child";
    case "CHD":
      return "Child";
    case "INF":
      return "Infant";

    default:
      break;
  }
};

// export const getPathSegment = () => {
//   const char = window.location.pathname.split("/")[1];
//   return ["n", "s"].includes(char) ? char : "n";
// };

export const getEnvFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("env") || "s"; // Default to 'n' if 'env' is not present
  // return urlParams.get("env"); // Default to 'n' if 'env' is not present
};

export const convertToISO = (
  ddC,
  mmC,
  yyC,
  hours = 0,
  minutes = 0,
  seconds = 0
) => {
  let dd = Number(ddC);
  let mm = Number(mmC);
  let yy = Number(yyC);
  debugger;
  // Validate required parameters (day, month, year)
  if (!dd || !mm || !yy) return null;

  // Ensure inputs are valid numbers
  if (isNaN(dd) || isNaN(mm) || isNaN(yy)) return null;

  // Ensure yy is a reasonable four-digit year (e.g., 1900 - 2099)
  if (yy < 1900 || yy > 2099) return null;

  // Create a Date object (months are 0-indexed in JavaScript)
  const date = new Date(yy, mm - 1, dd, hours, minutes, seconds);

  // Validate the created date
  if (isNaN(date.getTime())) return null;

  // Convert to ISO 8601 format
  return date.toISOString();
  // return date;
};


export const convertDateTimeToISO = (times, dates) => {
  let time = times.match(/.{1,2}/g); // Splitting into HH and MM
  let date = dates.match(/.{1,2}/g); // Splitting into YY, MM, DD

  let year = `20${date[0]}`; // Assuming 21st century
  let month = date[1];
  let day = date[2];
  let hours = time[0];
  let minutes = time[1];

  // Create an ISO format date string
  let isoDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00Z`).toISOString();
  
  return isoDate;
};


export const convertToMilliseconds = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  return (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000; // Convert to milliseconds
};

export const convertToMinutes = (milliseconds) => {
  const totalMinutes = Math.floor(milliseconds / 60000); // 60000 ms in a minute
  return totalMinutes;
};

export const convertToHoursAndMinutes = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let timeString = "";
 
  if (hours > 0) timeString += `${hours}:`; 
  if (minutes > 0 || hours > 0) timeString += `${minutes}`;

  return timeString;
};



