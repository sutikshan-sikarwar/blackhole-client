import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MiddlePart from "../../components/middlepart/MiddlePart";
import CreateReelsForm from "../../components/reels/CreateReelsForm";
import Reels from "../../components/reels/Reels";
import Profile from "../profile/Profile";
import Sidebar from "../../components/sidebar/Sidebar";
import HomeRight from "../../components/homeright/HomeRight";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import Notifications from "../notifications/Notifications";
import UsersList from "../usersList/UsersList";

const HomePage = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const {auth} =useSelector(store=>store);

  console.log("auth",auth)

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          item
          lg={location.pathname === "/" ? 6 : 9}
          className="px-5 flex justify-center"
          xs={12}
        >
          <Routes>
            <Route path="/*" element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/notifications" element={<Notifications/>} />
            <Route path="/search" element={<UsersList/>} />
          </Routes>
        </Grid>

        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
