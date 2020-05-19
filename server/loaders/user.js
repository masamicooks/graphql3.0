import { User } from "../mongodb/models";

export const batchUsers = async (userIds) => {
  const users = await User.find({ _id: { $in: userIds } });
  // Dataloader must return data in same sequence as keys
  return userIds.map((id) => users.find((user) => user.id === id));
};
