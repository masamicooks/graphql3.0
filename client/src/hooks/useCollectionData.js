import getCollections from "../util/getCollections";

export default (dataType, queryStringParsed) => {
  const { collections, gqlQuery } = getCollections(dataType);

  const collection = collections.find((x) => x.value === queryStringParsed);
  if (!collection) {
    throw new Error("That collection could not be found.");
  }

  return { collection, gqlQuery, collections };
};
