import dbConnect from "../../../lib/mongoose";
import User from "../../../lib/model/userModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });

      if (!user) {
        res
          .status(201)
          .json({
            successful: false,
            message: "invalid login details",
            user: {},
          });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          res
            .status(201)
            .json({ successful: true, message: "Login was successful", user });
        } else {
          res
            .status(201)
            .json({
              successful: false,
              message: "invalid login details",
              user: {},
            });
        }
      }
    } else {
      res
        .status(400)
        .json({
          successful: false,
          message: "invalid login details",
          user: {},
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ successful: false, message: err.message, user: {} });
  }
}
