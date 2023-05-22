import dayjs from "dayjs";

export const constants = {
  dateFormat: "YYYY-MM-DD",
};
export const getFormattedDate = (date) => {
  if (date && dayjs(date).isValid())
    return dayjs(date).format(constants.dateFormat);
  else return "";
};
