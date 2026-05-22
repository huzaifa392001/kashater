import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "Decemeber",
};

const jobRoles = {
  0: "Permanent",
  1: "Temporary",
  2: "Part-time/Locum",
  3: "Remote",
};

const jobShift = {
  0: "Day",
  1: "Night",
  2: "Flexible",
};

const getExtension = (inp) => {
  return inp.split(".").pop();
};

const getUploadFilePath = (path) => path.split("/").slice(0, -1).join("/");

const dateToWordConverter = (date, shortMonth = true) => {
  const dateItems = date.split("/");
  const transformedMonth = !shortMonth
    ? months[dateItems[1]]
    : months[dateItems[1]].split("").slice(0, 3).join("");
  const capitalizedMonth =
    transformedMonth.split("")[0].toUpperCase() +
    transformedMonth.split("").slice(1).join("");
  return `${dateItems[0]} ${capitalizedMonth} ${dateItems[2]}`;
};
const handleFileDownload = (url, fileName) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName); // Specify the file name
      link.setAttribute("target", "_self");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    })
    .catch((error) => console.error("Error downloading file:", error));
};

export {
  queryClient,
  months,
  jobRoles,
  jobShift,
  getExtension,
  getUploadFilePath,
  dateToWordConverter,
  handleFileDownload,
};

export const currentDate = () => {
  const currentDate = new Date();
  const minDate = currentDate; // Current date

  const dateObj = new Date(minDate);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
