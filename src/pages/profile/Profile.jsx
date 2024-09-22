import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Postcard from "../../components/post/Postcard";
import UserReelsCard from "../../components/reels/UserReelsCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getUsersPostAction } from "../../Redux/Post/post.action";

const tabs = [
  { value: "posts", name: "Posts" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth, post } = useSelector((store) => store);
  const [value, setValue] = React.useState("posts");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUsersPostAction(id));
    }
  }, [dispatch, id]);

  // Corrected: Access userPosts from the post state
  const userPosts = post.userPosts || [];
  const isLoading = post.loading; // Correct loading state
  const error = post.error; // Correct error state

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = String(auth.user?.id) === String(id);

  return (
    <div className="py-10 w-[70%]">
      <div className="rounded-md">
        <div className="h=[15rem]">
          <img
            className="w-full h-full rounded-t-xl"
            src="https://cdn.pixabay.com/photo/2014/10/25/07/52/kingsnake-502263_1280.jpg"
            alt="image not loaded"
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={auth.user?.profilePic}
          />
          {isOwnProfile ? (
            <Button
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              onClick={handleOpenProfileModal}
            >
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-semibold text-xl">
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p>
              @{auth.user?.firstName?.toLowerCase() +
                "_" +
                auth.user?.lastName?.toLowerCase()}
            </p>
          </div>
          <div className="flex gap-2 items-center py-3">
            <span>{userPosts.length} Posts</span>
            <span>{auth.user?.followers?.length || 0} Followers</span>
            <span>{auth.user?.following?.length || 0} Following</span>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Excepturi possimus placeat maxime a rerum atque eos vero cum
            </p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {tabs.map((items) => (
                <Tab key={items.value} value={items.value} label={items.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading posts: {error.message}</div>
            ) : value === "posts" ? (
              <div className="space-y-5 w-[70%] my-10">
                {userPosts.map((item) => (
                  <div key={item.id} className="border border-slate-500 rounded-md">
                    <Postcard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex flex-wrap justify-start gap-2 my-10">
                {userPosts.map((item, index) => (
                  <UserReelsCard key={index} />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {userPosts.map((item, index) => (
                  <div key={index} className="border border-slate-500 rounded-md">
                    <Postcard key={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div>repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </div>
  );
};

export default Profile;
