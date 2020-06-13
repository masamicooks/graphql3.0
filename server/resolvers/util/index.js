import { User } from "../../mongodb/models";
import moment from "moment";

// Ref populator functions
export const getUser = async (userId) => {
  let userData = await User.findById(userId);
  let populatedUserData = {
    ...userData._doc,
    createdEvents: getEvents.bind(this, userData._doc.createdEvents),
  };
  return populatedUserData;
};

export const getEvents = async (eventIds) => {
  let eventData = await Event.find({ _id: { $in: eventIds } });
  let populatedEventData = eventData.map((x) => ({
    ...x._doc,
    creator: getUser.bind(this, x.creator),
  }));
  return populatedEventData;
};

export const pickCommittee = (schemaList, committee) =>
  schemaList.find((x) => x.modelName.toLowerCase() === committee.toLowerCase());

export const conductSearch = async ({ Model, query, field, offset }) => {
  if (!Model) {
    throw new Error("That committee does not exist");
  }

  let myRegex = new RegExp(query, "gi");

  // Check that the type of of the field is a string...
  const isArray = Array.isArray(Model.schema.tree[field]);
  if (isArray) {
    let results = await Model.find(); /// Implement array-based search
    return results.map((x) => x._doc);
  }

  let mongoDbSearch = {
    [field]: {
      $regex: myRegex, //myRegex,
    },
  };

  let options = {
    offset,
    limit: 10,
  };

  let results = await Model.paginate(mongoDbSearch, options);

  return results;
};

export const getMeta = async ({ Model }) => {
  if (!Model) {
    throw new Error("That committee doesn't exist");
  }

  let fields = Object.keys(Model.schema.tree).filter(
    (x) => x !== "id" && x !== "__v"
  );

  return { fields };
};
