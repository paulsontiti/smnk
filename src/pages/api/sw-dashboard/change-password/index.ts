import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export default async function handler(req: any, res: any) {
  await dbConnect();
  const { values:{oldPassword, password}, user } = req.body;

  if (oldPassword && password && user) {
    try {
      //console.log(_id)
      const newUser = await User.findOne({ _id: user._id });

      if (bcrypt.compareSync(oldPassword, newUser.password)) {
        const hashedPassword = await hashPassword(password);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        res
          .status(201)
          .json({
            successful: true,
            message: "Your Password was successfully changed",
            user,
          });
      } else {
        res
          .status(400)
          .json({
            successful: false,
            message: "No user exist with your old password"
          });
      }
    } catch (err: any) {
      res.status(400).json({ successful: false, message: err.message });
    }
  } else {
    res.status(400).json({ successful: false, message: "Invalid details" });
  }
}
