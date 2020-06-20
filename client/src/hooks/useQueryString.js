import { useLocation } from "react-router";
import queryString from "query-string";

export default (queries) => {
  const location = useLocation();
  const { search } = location;
  const parsedQueryObject = queryString.parse(search); // Object w/ queries
  //const queryStringParsed = parsedQueryObject[query];
  const queryStringParsed = queries.map((x) => parsedQueryObject[x]);
  if (!queryStringParsed) {
    throw new Error("That query string could not be interpreted");
  }
  return queryStringParsed;
};
