import moment from 'moment';

export const now = moment();
export const currentYearYYYY: number = parseInt(moment().format('YYYY'));

export const monthFormatM = (date: string) => {
  return moment(date).format('M');
};

export const isLeapYear = (year: number) => {
  return moment([year]).isLeapYear();
}
