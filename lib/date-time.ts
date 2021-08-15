import type { DateTime } from 'luxon';

/**
 * @param duration The experience's duration in hours
 * @returns A formatted string to use in the experience page
 * @example
 * // Returns 2h
 * getFormattedExperienceDuration(2)
 * // Returns 1h30
 * getFormattedExperienceDuration(1.5)
 */
export const getFormattedDuration = (duration: number) => {
    const minutes = duration - Math.floor(duration);
    const hours = Math.floor(duration);
    return (`${hours}h${minutes === 0? '' : 30}`);
}

/**
 * Returns the time and meridiem of the input time.
 * 
 * @param time - DateTime object
 * @returns String array with the time and meridiem
 * @example 
 * // Returns ['4', 'AM']
 * getTimePieces(DateTime.fromISO('2021-07-26T04:00:00.000+00:00Z'))
 * // Returns ['8:30', 'AM']
 * getTimePieces(DateTime.fromISO('2021-07-26T08:30:00.000+00:00Z'))
 */
 export const getTimePieces = (time: DateTime) => {
    const hours = time.toFormat('h');
    const minutes = time.toFormat('mm');
    const meridiem = time.toFormat('a');

    const formattedTime = minutes === '00' ? hours : `${hours}:${minutes}`;
    return [formattedTime, meridiem];
}