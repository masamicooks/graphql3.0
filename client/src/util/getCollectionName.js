const getCollectionName = (string) => {
  return (function (string) {
    switch (string) {
      case "admn":
        return "Administration";
      case "hagc":
        return "Agriculture";
      case "hapc":
        return "Appropriations";
      case "hasc":
        return "Armed Services";
      case "hbuc":
        return "Budget";
      case "clmt":
        return "Climate";
      case "help":
        return "Education and Labor";
      case "nrgy":
        return "Energy and Commerce";
      case "fisv":
        return "Financial Services";
      case "hfac":
        return "Foreign Affairs";
      case "hhsc":
        return "Homeland Security";
      case "ntty":
        return "Natural Resources";
      case "ovst":
        return "Oversight";
      case "scnc":
        return "Science and Technology";
      case "smbs":
        return "Small Business";
      case "trns":
        return "Transportation";
      case "hvac":
        return "Veterans Affairs";
      case "wymn":
        return "Ways and Means";
      default:
        return "?";
    }
  })(string);
};

export default getCollectionName;
