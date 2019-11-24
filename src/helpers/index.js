/**
 * Normally I would break these methods into additional files based on purpose
 * and then use index.js (this file) to aggregate and export all functions. The
 * end result is an easy to use and navigate set of helper functions.
 */

export const isFunction = func => typeof func === "function";

export const isNonEmptyArray = array => Array.isArray(array) && array.length > 0;

export const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(amount);
};
