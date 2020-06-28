const getDatabase = (string) => {
  return (function (string) {
    switch (string) {
      case "admn":
      case "hagc":
      case "hapc":
      case "scnc":
      case "trns":
      case "hasc":
      case "hbuc":
      case "clmt":
      case "help":
      case "nrgy":
      case "hfac":
      case "hhsc":
      case "ntty":
      case "hvac":
      case "ovst":
      case "wymn":
      case "smbs":
      case "fisv":
        return "House";
      case "sstr":
      case "sfrc":
      case "sasc":
      case "sagc":
      case "sapc":
      case "sbnk":
      case "sbdg":
      case "snat":
      case "senv":
      case "sfin":
      case "shlp":
      case "shsc":
      case "sind":
      case "sjud":
      case "srle":
      case "seth":
      case "ssci":
      case "ssbs":
      case "svac":
        return "Senate";
      default:
        return null;
    }
  })(string);
};

export default getDatabase;
