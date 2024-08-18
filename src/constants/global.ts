export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

const gender = ["male", "female", "other"];

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = gender.map((item) => ({
  value: item,
  label: item,
}));

export const bloodGroupOptions = bloodGroup.map((item) => ({
  value: item,
  label: item,
}));

export const daysOptions = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];
