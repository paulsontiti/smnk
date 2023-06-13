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
  const { oldPassword, password, userId } = req.body;

  if (oldPassword && password && userId) {
    try {
      //console.log(_id)
      const user = await User.findOne({ _id: userId });

      if (bcrypt.compareSync(oldPassword, user.password)) {
        const hashedPassword = await hashPassword(password);
        const newUser = await User.findByIdAndUpdate(userId, { password: hashedPassword },{new:true});

        res
          .status(201)
          .json({
            successful: true,
            message: "Your Password was successfully changed",
            user:newUser,
          });
      } else {
        res
          .status(400)
          .json({
            successful: false,
            message: "No user exist with your old password",user
          });
      }
    } catch (err: any) {
      res.status(400).json({ successful: false, message: err.message });
    }
  } else {
    res.status(400).json({ successful: false, message: "Invalid details" });
  }
}
