import history from "../history";

const routing = (location, nav, dontNav) => {
  let currentPathname = location.pathname;
  let currentQuery = location.search;
  let newPathname = nav.pathname;
  let newQuery = nav.search;
  if (currentPathname === newPathname) {
    return dontNav();
  }
  dontNav();
  history.push({
    pathname: newPathname,
    search: nav.search,
  });
};

export default routing;
