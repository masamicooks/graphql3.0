import senateCommittees from "../mongodb/models/senateCommittees";
import houseCommittees from "../mongodb/models/houseCommittees";
import { pickCommittee, conductSearch, getMeta } from "./util";

export const resolver = {
  Query: {
    senateHearings: async (parent, args, context) => {
      const { committee, query, field, offset } = args.input;
      const Model = pickCommittee(senateCommittees, committee);
      const results = await conductSearch({ Model, query, field, offset });
      return results;
    },
    senateHearingsMeta: async (parent, args, context) => {
      const Model = pickCommittee(senateCommittees, args.committee);
      const { fields } = await getMeta({ Model });
      return { fields };
    },
    houseHearings: async (parent, args, context) => {
      const { committee, query, field, offset } = args.input;
      const Model = pickCommittee(houseCommittees, committee);
      const results = await conductSearch({ Model, query, field, offset });
      return results;
    },
    houseHearingsMeta: async (parent, args, context) => {
      const Model = pickCommittee(houseCommittees, args.committee);
      const { fields } = await getMeta({ Model });
      return { fields };
    },
  },
};
