/**
 * Normally I would break these methods into additional files based on purpose
 * and then use index.js (this file) to aggregate and export all functions. The
 * end result is an easy to use and navigate set of helper functions.
 */

export const isFunction = func => typeof func === "function";
