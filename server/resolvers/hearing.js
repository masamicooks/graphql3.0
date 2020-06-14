import { senateCommittee } from "../mongodb/models";
import { houseCommittee } from "../mongodb/models";
import { conductSearch } from "./util";

export const resolver = {
  Query: {
    senateHearings: async (parent, { input }, context) => {
      const { committee, query, field, offset } = input;
      const results = await conductSearch({
        model: senateCommittee,
        committee,
        query,
        field,
        offset,
      });
      return results;
    },
    senateHearingsMeta: async (parent, { input }, context) => {
      let fields = Object.keys(senateCommittee.schema.tree).filter(
        (x) => x !== "id" && x !== "__v"
      );

      return { fields };
    },
    houseHearings: async (parent, { input }, context) => {
      const {
        committee,
        query,
        field,
        offset,
        sortField,
        sortDirection,
      } = input;
      console.log(input);
      const results = await conductSearch({
        model: houseCommittee,
        committee,
        query,
        field,
        offset,
        sortField,
        sortDirection,
      });
      return results;
    },
    houseHearingsMeta: async (parent, { input }, context) => {
      let fields = Object.keys(houseCommittee.schema.tree).filter(
        (x) => x !== "id" && x !== "__v"
      );

      return { fields };
    },
  },
};
