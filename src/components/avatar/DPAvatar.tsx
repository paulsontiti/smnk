import { Avatar, Skeleton } from "@mui/material";

function DPAvatar({ dp }: { dp: string }) {
  return (
    <>
      {dp ? (
        <Avatar
          alt=""
          src={`/api/multer/profile-pic/${dp}`}
          sx={{ width: 50, height: 50 }}
        />
      ) : (
        <Avatar alt="" sx={{ width: 50, height: 50 }} />
      )}
    </>
  );
}

export default DPAvatar;
