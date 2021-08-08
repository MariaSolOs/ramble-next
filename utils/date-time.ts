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