import jwt from "jsonwebtoken";
import { User } from "../../mongodb/models";

// Setting up email + id of logged in user
export const verifyUser = async (req) => {
  try {
    req.email = null;
    req.loggedInUserId = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      // Get email from payload
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Set email in req
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });
      // Set userId in req
      req.loggedInUserId = user.id;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
