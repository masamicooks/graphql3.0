import moment from "moment";
// This function should be passed as an argument
// to the sort function. It is the "compareFunction" that
// accepts the two arguments, and then passes those to another
// function, which is implicitly passed the two rows, a + b.
// That function then reuturns either less than 0, 0 or greater
// than zero, thus sorting the row.
const sortByDate = (sortBy, a, b, order) => {
  let aMoment = moment(a);
  let bMoment = moment(b);
  if (aMoment.isValid() && bMoment.isValid()) {
    return aMoment.isBefore(bMoment) ? 1 * order : -1 * order;
  } else {
    return aMoment.isValid() ? 1 * order : -1 * order;
  }
};

export const comparator = (sortBy, desc = true) => (a, b) => {
  const order = desc ? -1 : 1;
  let propertyA = a[sortBy];
  let propertyB = b[sortBy];
  if (sortBy === "date" || sortBy === "time") {
    return sortByDate(sortBy, propertyA, propertyB, order);
  } else {
    if (!propertyA && propertyB) {
      // IF EITHER IS UNDEFINED, RETURN THE OTHER ONE FIRST
      return 1;
    }
    if (propertyA && !propertyB) {
      // IF EITHER IS UNDEFINED, RETURN THE OTHER ONE FIRST
      return -1;
    }

    if (propertyA < propertyB) {
      return -1 * order;
    }

    if (propertyA > propertyB) {
      return 1 * order;
    }

    return 0 * order;
  }
};

export default comparator;
