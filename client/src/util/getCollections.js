import { HOUSE_TABLE_DATA, SENATE_TABLE_DATA } from "../graphql/queries";

const getCollections = (source) => {
  /// Some logic here to fetch the collections
  return (function (source) {
    switch (source) {
      case "senate":
        return {
          gqlQuery: SENATE_TABLE_DATA,
          collections: [
            { value: "sfrc", label: "Foreign Relations" },
            { value: "sasc", label: "Armed Services" },
            { value: "svac", label: "Veterans Affairs" },
            { value: "sagc", label: "Agriculture" },
            { value: "sapc", label: "Appropriations" },
            { value: "sbnk", label: "Banking" },
            { value: "sbdg", label: "Budget" },
            { value: "sstr", label: "Transportation" },
            { value: "snat", label: "Natural Resources" },
            { value: "senv", label: "Environment" },
            { value: "sfin", label: "Financial Services" },
            { value: "shlp", label: "Education and Labor" },
            { value: "shsc", label: "Homeland Security" },
            { value: "sind", label: "Indian Affairs" },
            { value: "sjud", label: "Judiciary" },
            { value: "srle", label: "Rules" },
            { value: "seth", label: "Ethics" },
            { value: "ssci", label: "Science and Technology" },
            { value: "ssbs", label: "Small Business" },
            { value: "svet", label: "Veterans Affairs" },
          ],
        };
      case "house":
        return {
          gqlQuery: HOUSE_TABLE_DATA,
          collections: [
            { value: "hfac", label: "Foreign Affairs" },
            { value: "hvac", label: "Veterans Affairs" },
            { value: "hhsc", label: "Homeland Security" },
            { value: "hagc", label: "Agriculture" },
            { value: "hapc", label: "Appropriations" },
            { value: "hbuc", label: "Budget" },
            { value: "help", label: "Education and Labor" },
            { value: "nrgy", label: "Energy and Commerce" },
            { value: "fisv", label: "Financial Services" },
            { value: "admn", label: "Administration" },
            { value: "ntty", label: "Natural Resources" },
            { value: "ovst", label: "Oversight" },
            { value: "scnc", label: "Science and Technology" },
            { value: "smbs", label: "Small Business" },
            { value: "trns", label: "Transportation" },
            { value: "wymn", label: "Ways and Means" },
            { value: "clmt", label: "Climate" },
            { value: "hvac", label: "Veterans Affairs" },
            { value: "hasc", label: "Armed Services" },
          ],
        };
      default:
        return [];
    }
  })(source);
};

export default getCollections;
