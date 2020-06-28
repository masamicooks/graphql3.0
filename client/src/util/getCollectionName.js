const getCollectionName = (string) => {
  return (function (string) {
    switch (string) {
      case "admn":
        return "Administration";
      case "hagc":
        return "Agriculture";
      case "hapc":
        return "Appropriations";
      case "scnc":
        return "Science";
      case "trns":
        return "Transportation and Infrastructure";
      case "hasc":
        return "Armed Services";
      case "hbuc":
        return "Budget";
      case "clmt":
        return "Climate";
      case "help":
        return "Health Education and Labor";
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
      case "smbs":
        return "Small Business";
      case "sstr":
        return "Commerce, Science and Transportation";
      case "hvac":
        return "Veterans Affairs";
      case "wymn":
        return "Ways and Means";
      case "sfrc":
        return "Foreign Relations";
      case "sasc":
        return "Armed Services";
      case "sagc":
        return "Agriculture";
      case "sapc":
        return "Appropriations";
      case "sbnk":
        return "Banking";
      case "sbdg":
        return "Budget";
      case "snat":
        return "Natural Resources";
      case "senv":
        return "Environment";
      case "sfin":
        return "Financial Services";
      case "shlp":
        return "Health Education and Labor";
      case "shsc":
        return "Homeland Security";
      case "sind":
        return "Indian Affairs";
      case "sjud":
        return "Judiciary";
      case "srle":
        return "Rules";
      case "seth":
        return "Ethics";
      case "ssci":
        return "Intelligence";
      case "ssbs":
        return "Small Business";
      case "svac":
        return "Veterans Affairs";
      default:
        return null;
    }
  })(string);
};

export default getCollectionName;
