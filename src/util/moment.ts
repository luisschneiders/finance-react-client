/**
 * Replace Moment.js with javascript native features
 */
import moment from 'moment';
import { Period } from '../models/Period';

export const now = moment();
export const currentYearYYYY: string = moment().format('YYYY');
export const currentMonthYYYMMDD: string = moment().format('YYYY-MM-DD');
export const currentDayDD: string = moment().format('YYYY-MM-DD');

export const startPeriod = (date: string, dayOrMonthOrYear: any = 'month') => {
  return moment(date).startOf(dayOrMonthOrYear).format('YYYY-MM-DD');
};
export const endPeriod = (date: string, dayOrMonthOrYear: any = 'month') => {
  return moment(date).endOf(dayOrMonthOrYear).format('YYYY-MM-DD');
};

export const subtractStartPeriod = (date: string, dayOrMonthOrYear: any = 'month') => {
  return moment(date).subtract(1, dayOrMonthOrYear).startOf(dayOrMonthOrYear).format('YYYY-MM-DD');
};
export const subtractEndPeriod = (date: string, dayOrMonthOrYear: any = 'month') => {
  return moment(date).subtract(1, dayOrMonthOrYear).endOf(dayOrMonthOrYear).format('YYYY-MM-DD');
};

export const addStartPeriod = (date: string, dayOrMonthOrYear: any = 'month') => {
  return moment(date).add(1, dayOrMonthOrYear).startOf(dayOrMonthOrYear).format('YYYY-MM-DD');
};
export const addEndPeriod = (date: string, dayOrMonthOrYear: any = 'month') => {
  return moment(date).add(1, dayOrMonthOrYear).endOf(dayOrMonthOrYear).format('YYYY-MM-DD');
};

export const decreasePeriod = (period: Period, dayOrMonthOrYear: any = 'month') => {
  return {
    startDate: subtractStartPeriod(period.startDate, dayOrMonthOrYear),
    endDate: subtractEndPeriod(period.endDate, dayOrMonthOrYear),
  };
};

export const increasePeriod = (period: Period, dayOrMonthOrYear: any = 'month') => {
  return {
    startDate: addStartPeriod(period.startDate, dayOrMonthOrYear),
    endDate: addEndPeriod(period.endDate, dayOrMonthOrYear),
  };
};

export const currentPeriod = (dayOrMonthOrYear: any = 'month') => {
  return {
    startDate: startPeriod(currentMonthYYYMMDD, dayOrMonthOrYear),
    endDate: endPeriod(currentMonthYYYMMDD, dayOrMonthOrYear),
  };
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
