import senateCommittees from "../mongodb/models/senateCommittees";
import houseCommittees from "../mongodb/models/houseCommittees";
import { pickCommittee, conductSearch, getMeta } from "./util";

export const resolver = {
  Query: {
    senateHearings: async (parent, { input }, context) => {
      const { committee, query, field, offset } = input;
      const Model = pickCommittee(senateCommittees, committee);
      const results = await conductSearch({ Model, query, field, offset });
      return results;
    },
    senateHearingsMeta: async (parent, { input }, context) => {
      const Model = pickCommittee(senateCommittees, input.committee);
      const { fields } = await getMeta({ Model });
      return { fields };
    },
    houseHearings: async (parent, { input }, context) => {
      const { committee, query, field, offset } = input;
      const Model = pickCommittee(houseCommittees, committee);
      const results = await conductSearch({ Model, query, field, offset });
      return results;
    },
    houseHearingsMeta: async (parent, { input }, context) => {
      const Model = pickCommittee(houseCommittees, input.committee);
      const { fields } = await getMeta({ Model });
      return { fields };
    },
  },
};
