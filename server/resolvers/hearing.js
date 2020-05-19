import senateCommittees from "../mongodb/models/senateCommittees";
import houseCommittees from "../mongodb/models/houseCommittees";
import { pickCommittee, conductSearch, getMeta } from "./util";

export const resolver = {
  Query: {
    senateHearings: async ({ input }, req) => {
      const { committee, query, field, offset } = input;
      const Model = pickCommittee(senateCommittees, committee);
      const results = await conductSearch({ Model, query, field, offset });
      return results;
    },
    senateHearingsMeta: async (input, req) => {
      const { committee } = input;
      const Model = pickCommittee(senateCommittees, committee);
      const { fields } = await getMeta({ Model });
      return { fields };
    },
    houseHearings: async ({ input }, req) => {
      const { committee, query, field, offset } = input;
      const Model = pickCommittee(houseCommittees, committee);
      const results = await conductSearch({ Model, query, field, offset });
      console.log(results);
      return results;
    },
    houseHearingsMeta: async (input, req) => {
      const { committee } = input;
      const Model = pickCommittee(houseCommittees, committee);
      const { fields } = await getMeta({ Model });
      return { fields };
    },
  },
};
