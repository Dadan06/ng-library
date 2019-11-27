// tslint:disable: prefer-template
export const getTimeAsString = (date: Date): string =>
    `${date.getHours()}`.padStart(2, '0') + ':' + `${date.getMinutes()}`.padStart(2, '0');

export const getDateAsString = (date: Date): string =>
    `${date.getFullYear()}` +
    '-' +
    `${date.getMonth() + 1}`.padStart(2, '0') +
    '-' +
    `${date.getDate()}`.padStart(2, '0');
