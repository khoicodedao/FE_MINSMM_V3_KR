import moment from "moment";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "constants/enums";
import { DatePickerProps } from "antd";

const formatDate = (date: any, format?: string) => {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format("DD/MM/YYYY");
};

const addMonthsToDate = (dateCreate: any, monthsToAdd: number) => {
  // Convert the dateCreate string to a Date object
  const originalDate = new Date(dateCreate);

  // Check if the originalDate is a valid date
  if (isNaN(originalDate.getTime())) {
    return "Invalid Date"; // Handle invalid input
  }

  // Add months to the date
  originalDate.setMonth(originalDate.getMonth() + monthsToAdd);

  // Format the result back into the desired string format
  const formattedDate = originalDate.toISOString(); // This assumes you want a YYYY-MM-DD format

  return moment(formattedDate).format("DD/MM/YYYY");
};

const formatDateWithHour = (date: any) => {
  return moment(date).format("DD/MM/YYYY - HH:mm:ss");
};

const formatDateFollowType = (date: any, format: string) => {
  return moment(date).format(format);
};

const convertDateToString = (
  date: any,
  format: DATE_TIME_FORMAT | null = null
): any => {
  const validDate = dayjs(date?.toString()).isValid();
  return date && validDate
    ? dayjs(date?.toString()).format(format ? format : undefined)
    : null;
};
const validateDateGreaterThanNow = (rule: any, value: any, callback: any) => {
  const selectedDate = moment(value);
  const now = moment();
  if (selectedDate.isAfter(now)) {
    callback(); // Validation passed
  } else {
    callback("Chọn ngày lớn hơn ngày hiện tại!");
  }
};
const convertISODate = (date: any) => {
  const validDate = date ?  dayjs(date?.toString()).isValid() : null;
  return validDate ? date.replace('Z', '+00:00') : null;
};
const weekFormat = 'YYYY-MM-DD';

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

const disabledStartDate = (current: any, endDate: string) => {
  const startDateCompare = new Date(endDate);
  return current && current > startDateCompare;
};
const disabledEndDate = (current: any, startDate: string) => {
  const startDateCompare = new Date(startDate);
  return current && current < startDateCompare;
};

export {
  formatDate,
  addMonthsToDate,
  formatDateWithHour,
  validateDateGreaterThanNow,
  convertDateToString,
  formatDateFollowType,
  convertISODate,
  customWeekStartEndFormat,
  disabledStartDate,
  disabledEndDate,
};
