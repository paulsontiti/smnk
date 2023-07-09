import * as React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchDrawer, { ServicesDrawer } from "../drawer/SearchDrawer";
import { fetchUsers } from "@/lib/search";

export const serviceCategories = [
  { id: 1, src: "/assets/graphics.png", title: "Graphics & Design" },
  { id: 2, src: "/assets/digital-marketing.png", title: "Digital Marketing" },
  { id: 3, src: "/assets/writing.jpg", title: "Writing & Translation" },
  { id: 4, src: "/assets/videos-animation.png", title: "Videos & Animations" },
  { id: 5, src: "/assets/music.png", title: "Music & Audio" },
  { id: 6, src: "/assets/tech.png", title: "Programming & Tech" },
  { id: 7, src: "/assets/business.png", title: "Business" },
  { id: 8, src: "/assets/lifestyle.png", title: "Lifestyle" },
  { id: 9, src: "/assets/data.png", title: "Data" },
  { id: 10, src: "/assets/photography.png", title: "Photography" },
  { id: 11, src: "/assets/hair.jpg", title: "Hair & Nails" },
  { id: 12, src: "/assets/art.png", title: "Art" },
  { id: 13, src: "/assets/building.png", title: "Building" },
  { id: 14, src: "/assets/interior.png", title: "Interior Decoration" },
];
export default function ServiceCategories() {
  const router = useRouter();
  const [openServicesDrawer, setOpenServicesDrawer] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState<any[]>([]);
  const [loadingUser, setLoadingUser] = React.useState(true);
  return (
    <>
      <ServicesDrawer
        loadingUser={loadingUser}
        users={users}
        searchedService={value}
        openServicesDrawer={openServicesDrawer}
        setOpenServicesDrawer={setOpenServicesDrawer}
      />
      <Card sx={{ m: 2 }}>
        <CardHeader title=" Search in our different categories" />
        <CardContent>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexWrap={"wrap"}
            >
              {serviceCategories.map((cat) => (
                <Category
                  key={cat.id}
                  src={cat.src}
                  title={cat.title}
                  setLoadingUser={setLoadingUser}
                  setUsers={setUsers}
                  setOpenServicesDrawer={setOpenServicesDrawer}
                  setValue={setValue}
                />
              ))}
            </Box>
            <Box mt={1}>
              <SearchDrawer searchOption="Services" />
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              bgcolor: "#7E1120",
              borderRadius: "30px",
              mr: 2,
              color: "white",
              minWidth: 150,
            }}
            onClick={() => {
              router.push("/account/signup");
            }}
            size="small"
          >
            Hire an Artisan
          </Button>
          <Button
            size="small"
            sx={{
              bgcolor: "#E08300",
              borderRadius: "30px",
              color: "white",
              minWidth: 150,
            }}
            onClick={() => {
              router.push("/account/signup");
            }}
          >
            Earn as an Artisan
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

function Category({
  setUsers,
  setValue,
  setOpenServicesDrawer,
  setLoadingUser,
  src,
  title,
}: {
  setUsers: any;
  setValue: any;
  setOpenServicesDrawer: any;
  setLoadingUser: any;
  src: string;
  title: string;
}) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      minWidth={150}
      maxWidth={150}
      onClick={async () => {
        setLoadingUser(true);
        setOpenServicesDrawer(true);
        setValue(title);
        const users = await fetchUsers(title);
        setLoadingUser(false);
        setUsers(users);
      }}
    >
      <Image src={src} width={50} height={50} alt="" loading="lazy" />
      <Typography variant="caption" m={1}>
        {title}
      </Typography>
    </Box>
  );
}
