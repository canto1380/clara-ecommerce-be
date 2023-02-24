import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).send({
        message: "Authentication failed. Token does not exist",
        success: false,
      });
      return false;
    }
    let id;
    try {
      const data = jwt.verify(token, process.env.JWT_KEY);
      id = data;
    } catch (error) {
      res.status(401).send({
        message: "Authentication failed. Invalid Token",
        success: false,
        error: error.message
      });
      return false
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(401).send({
        message: "Authentication failed. User not found",
        succes: false,
      });
      return false
    }
    next();
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};
