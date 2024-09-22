import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import { Avatar, IconButton, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();

  // Get current user profile data from Redux
  const auth = useSelector((store) => store.auth);

  // Initialize formik with initialValues from auth.user
  const formik = useFormik({
    initialValues: {
      firstName: auth.user?.firstName || "", // Default to empty string if undefined
      lastName: auth.user?.lastName || "",
    },
    enableReinitialize: true, // Reinitialize formik values when props change
    onSubmit: (values) => {
      console.log("Submitting values:", values); // Debugging statement
      dispatch(updateProfileAction(values));
      handleClose(); // Close the modal after submitting
    },
  });

  React.useEffect(() => {
    console.log("Current form values:", formik.values); // Debugging statement
  }, [formik.values]);

  React.useEffect(() => {
    console.log("Current auth user:", auth.user); // Debugging statement
  }, [auth.user]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center mb-2 justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p className="text-lg">Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-xl"
                  src="https://cdn.pixabay.com/photo/2014/10/25/07/52/kingsnake-502263_1280.jpg"
                  alt="image not loaded"
                />
              </div>
              <div className="pl-5">
                <Avatar
                  className="transform -translate-y-20"
                  sx={{ width: "10rem", height: "10rem" }}
                  src="https://cdn.pixabay.com/photo/2013/07/13/13/32/demon-161049_1280.png"
                />
              </div>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
