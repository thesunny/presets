/**
 * Timestamp options should be used in the creation of all timestamps.
 *
 * We set `useTz` to `true` because we want to be proactive about
 *
 * We set `precision` to `3` because JavaScript has millisecond precision and
 * any more would (a) not add value and (b) may cause issues
 *
 */
export const TIMESTAMP_OPTIONS = { useTz: true, precision: 3 }
