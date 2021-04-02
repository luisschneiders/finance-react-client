/**
 * Replace Moment.js with javascript native features
 */
import moment from 'moment';

export const now = moment();
export const currentYearYYYY: string = moment().format('YYYY');
export const currentMonthYYYMMDD: string = moment().format('YYYY-MM-DD');

export const startPeriod = (date: string) => {
  return moment(date).startOf('month').format('YYYY-MM-DD');
};
export const endPeriod = (date: string) => {
  return moment(date).endOf('month').format('YYYY-MM-DD');
};

export const subtractStartPeriod = (date: string) => {
  return moment(date).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
};
export const subtractEndPeriod = (date: string) => {
  return moment(date).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
};

export const addStartPeriod = (date: string) => {
  return moment(date).add(1, 'months').startOf('month').format('YYYY-MM-DD');
};
export const addEndPeriod = (date: string) => {
  return moment(date).add(1, 'months').endOf('month').format('YYYY-MM-DD');
};

/**
 * Format YYYY
 * 2021
 */
export const dateFormatYYYY = (date: string) => {
  return moment(date).format('YYYY');
};

/**
 * Format ll
 * Jan 31, 2021
 */
export const dateFormatll = (date: string) => {
  return moment(date).format('ll');
};

/**
 * Format DD/MM/YYYY
 * 31/01/2021
 */
export const dateFormatDDMMYYYY = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

/**
 * Format DD/MM/YY
 * 31/01/21
 */
export const dateFormatDDMMYY = (date: string) => {
  return moment(date).format('DD/MM/YY');
};

/**
 * Format YYYY-MM-DD
 * 2021-01-31
 */
export const dateFormatYYYYMMDD = (date: string) => {
  return moment(date).format('YYYY-MM-DD');
};

export const dateFormatM = (date: string) => {
  return moment(date).format('M');
};

export const isLeapYear = (year: number) => {
  return moment([year]).isLeapYear();
}
