import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth.user?.id}`);
    } else if (item.path) {
      navigate(item.path);
    } else {
      console.error("No path specified for this item:", item);
    }
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div className="">
          <span className="logo font-bold text-xl">BlackHole</span>
        </div>
        <div className="space-y-8">
          {navigationMenu.map((item) => (
            <div
              key={item} // Ensure each item has a unique key
              onClick={() => handleNavigate(item)}
              className="cursor-pointer flex space-x-3 items-center"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="space-x-4 flex items-center">
            <Avatar
             sx={{width:"4rem", height:"4rem", outline:"solid"}}
             src={auth.user.profilePic}/>
            <div>
              <p className="text-lg font-bold ">
                {auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : "Guest"}
              </p>
              <p className="opacity-80">
                {auth.user ? `@${auth.user.firstName.toLowerCase()}_${auth.user.lastName.toLowerCase()}` : "@guest"}
              </p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
