import { HOUSE_TABLE_DATA, SENATE_TABLE_DATA } from "../graphql/queries";
import getCollectionName from "./getCollectionName";
import houseCollections from "./houseCollections";
import senateCollections from "./senateCollections";

const getCollections = (source) => {
  /// Some logic here to fetch the collections
  return (function (source) {
    switch (source) {
      case "senate":
        return {
          gqlQuery: SENATE_TABLE_DATA,
          collections: [
            { value: null, label: "All" },
            ...senateCollections.map((collection) => ({
              value: collection,
              label: getCollectionName(collection),
            })),
          ],
        };
      case "house":
        return {
          gqlQuery: HOUSE_TABLE_DATA,
          collections: [
            { value: null, label: "All" },
            ...houseCollections.map((collection) => ({
              value: collection,
              label: getCollectionName(collection),
            })),
          ],
        };
      default:
        return [];
    }
  })(source);
};

export default getCollections;
