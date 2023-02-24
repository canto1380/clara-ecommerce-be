import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findByCredential, updateLastSession } from "./user.controller.js";
import moment from "moment/moment.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByCredential(email, password);
    if (user.error) {
      res.status(404).send({ error: user.error, success: false });
    } else {
      const token = await user.generateAuthToken();
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      const { _id, nickname } = user
      const lastSessionDate = moment(new Date().getTime()).format('DD/MM/YYYY, h:mm:ss')
      updateLastSession(email, lastSessionDate);
      res.status(200).send({ success: true, user: {_id, nickname}, token });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
