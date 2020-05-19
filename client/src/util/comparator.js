// This function should be passed as an argument
// to the sort function. It is the "compareFunction" that
// accepts the two arguments, and then passes those to another
// function, which is implicitly passed the two rows, a + b.
// That function then reuturns either less than 0, 0 or greater
// than zero, thus sorting the row.
export const comparator = (prop, desc = true) => (a, b) => {
  const order = desc ? -1 : 1;
  if (!a[prop] && b[prop]) {
    // IF EITHER PROPERTY IS UNDEFINED, RETURN THE OTHER ONE FIRST
    return 1;
  }
  if (a[prop] && !b[prop]) {
    // IF EITHER PROPERTY IS UNDEFINED, RETURN THE OTHER ONE FIRST
    return -1;
  }

  if (a[prop] < b[prop]) {
    return -1 * order;
  }

  if (a[prop] > b[prop]) {
    return 1 * order;
  }

  return 0 * order;
};

export default comparator;
