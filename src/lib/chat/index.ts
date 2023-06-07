import axios from "axios";

export const unSeenChats = async (receiverId: string) => {
  if (receiverId) {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/chat/unseen-chats`,
        data: { receiverId },
      });
      const data = await res.data;
      return data;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }
};

export const seeAllChats = async (receiverId: string) => {
  try {
    if (receiverId) {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/chat/see-chats`,
        data: { receiverId },
      });
      const data = await res.data;
      return data;
    } else {
      console.log("Invalid request");
    }
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
