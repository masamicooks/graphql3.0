import { User } from "../../mongodb/models";

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

export const getHearingsInRange = async ({ start, end, models }) => {
  let results = await Promise.all(
    models.map(async (model) =>
      model.find({ date: { $gte: start, $lte: end } })
    )
  );
  return results.flat();
};

export const conductSearch = async ({
  committee,
  model,
  query,
  field,
  offset,
  sortField,
  sortDirection,
}) => {
  let myRegex = new RegExp(query, "gi");

  // Check that the type of of the field is a string...
  const isArray = Array.isArray(model.schema.tree[field]);
  if (isArray) {
    let results = await model.find(); /// Implement array-based search
    return results.map((x) => x._doc);
  }

  let mongoDbSearch = {
    [field]: {
      $regex: myRegex,
    },
  };

  if (committee) {
    mongoDbSearch.committee = { $regex: committee };
  }

  let options = {
    offset,
    sort: { [sortField]: sortDirection },
    limit: 10,
  };

  let results = await model.paginate(mongoDbSearch, options);

  return results;
};
