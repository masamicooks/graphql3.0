import { senateCommittee } from "../mongodb/models";
import { houseCommittee } from "../mongodb/models";
import { conductSearch, getHearingsInRange } from "./util";

export const resolver = {
  Query: {
    senateHearings: async (parent, { input }, context) => {
      const results = await conductSearch({
        model: senateCommittee,
        committee: input.committee,
        query: input.query,
        field: input.field,
        offset: input.offset,
        sortField: input.sortField,
        sortDirection: input.sortDirection,
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
      const results = await conductSearch({
        model: houseCommittee,
        committee: input.committee,
        query: input.query,
        field: input.field,
        offset: input.offset,
        sortField: input.sortField,
        sortDirection: input.sortDirection,
      });
      return results;
    },
    hearingsRange: async (parent, { input }, context) => {
      const { houseHearings, senateHearings } = input;
      let models = [];
      if (houseHearings) {
        models.push(houseCommittee);
      }
      if (senateHearings) {
        models.push(senateCommittee);
      }
      const results = await getHearingsInRange({
        models,
        start: input.start,
        end: input.end,
      });
      return results;
    },
    senateHearingsRange: async (parent, { input }, context) => {
      const results = await getHearingsInRange({
        models: [senateCommittee],
        start: input.start,
        end: input.end,
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
