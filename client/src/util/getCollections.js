import { HOUSE_TABLE_DATA, SENATE_TABLE_DATA } from "../graphql/queries";

const getCollections = (source) => {
  /// Some logic here to fetch the collections
  return (function (source) {
    switch (source) {
      case "senate":
        return {
          gqlQuery: SENATE_TABLE_DATA,
          collections: [
            { value: null, label: "All" },
            { value: "sagc", label: "Agriculture" },
            { value: "sapc", label: "Appropriations" },
            { value: "sasc", label: "Armed Services" },
            { value: "sbnk", label: "Banking" },
            { value: "sbdg", label: "Budget" },
            { value: "shlp", label: "Education and Labor" },
            { value: "senv", label: "Environment" },
            { value: "seth", label: "Ethics" },
            { value: "sfin", label: "Financial Services" },
            { value: "sfrc", label: "Foreign Relations" },
            { value: "shsc", label: "Homeland Security" },
            { value: "sind", label: "Indian Affairs" },
            { value: "sjud", label: "Judiciary" },
            { value: "snat", label: "Natural Resources" },
            { value: "srle", label: "Rules" },
            { value: "ssci", label: "Science and Technology" },
            { value: "ssbs", label: "Small Business" },
            { value: "sstr", label: "Transportation" },
            { value: "svac", label: "Veterans Affairs" },
            { value: "svet", label: "Veterans Affairs" },
          ],
        };
      case "house":
        return {
          gqlQuery: HOUSE_TABLE_DATA,
          collections: [
            { value: null, label: "All" },
            { value: "admn", label: "Administration" },
            { value: "hagc", label: "Agriculture" },
            { value: "hapc", label: "Appropriations" },
            { value: "hasc", label: "Armed Services" },
            { value: "hbuc", label: "Budget" },
            { value: "clmt", label: "Climate" },
            { value: "help", label: "Education and Labor" },
            { value: "nrgy", label: "Energy and Commerce" },
            { value: "fisv", label: "Financial Services" },
            { value: "hfac", label: "Foreign Affairs" },
            { value: "hhsc", label: "Homeland Security" },
            { value: "ntty", label: "Natural Resources" },
            { value: "ovst", label: "Oversight" },
            { value: "scnc", label: "Science and Technology" },
            { value: "smbs", label: "Small Business" },
            { value: "trns", label: "Transportation" },
            { value: "hvac", label: "Veterans Affairs" },
            { value: "wymn", label: "Ways and Means" },
          ],
        };
      default:
        return [];
    }
  })(source);
};

export default getCollections;
