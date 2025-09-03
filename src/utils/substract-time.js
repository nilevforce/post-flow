/**
 * Returns an ISO 8601 formatted date/time by subtracting the specified number of years,
 * months, days, hours, minutes, and seconds from the current moment.
 *
 * @param {Object} options - Time subtraction options.
 * @param {number} [options.years=0]   - Number of years to subtract.
 * @param {number} [options.months=0]  - Number of months to subtract.
 * @param {number} [options.days=0]    - Number of days to subtract.
 * @param {number} [options.hours=0]   - Number of hours to subtract.
 * @param {number} [options.minutes=0] - Number of minutes to subtract.
 * @param {number} [options.seconds=0] - Number of seconds to subtract.
 *
 * @returns {string} An ISO 8601 formatted date string after subtraction.
 *
 * @example
 * subtractTime({ months: 2 });
 * // => '2025-07-03T12:34:56.789Z' (2 months ago)
 *
 * @example
 * subtractTime({ days: 10, hours: 5 });
 * // => '2025-08-24T07:34:56.789Z' (10 days and 5 hours ago)
 *
 * @example
 * subtractTime({ years: 1, seconds: 30 });
 * // => '2024-09-03T12:34:26.789Z' (1 year and 30 seconds ago)
 */
const subtractTime = ({
  years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0,
} = {}) => {
  const d = new Date();

  d.setFullYear(d.getFullYear() - years);
  d.setMonth(d.getMonth() - months);
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  d.setMinutes(d.getMinutes() - minutes);
  d.setSeconds(d.getSeconds() - seconds);

  return d.toISOString();
};

export default subtractTime;
