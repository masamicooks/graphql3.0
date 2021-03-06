import history from "../history";

const routing = (location, nav, dontNav) => {
  let currentPathname = location.pathname;
  let newPathname = nav.pathname;
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
