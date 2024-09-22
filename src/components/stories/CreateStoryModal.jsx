import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Modal,
  } from "@mui/material";
  import { useFormik } from "formik";
  import React, { useState } from "react";
  import ImageIcon from "@mui/icons-material/Image";
  import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
  import { useDispatch, useSelector } from "react-redux";
  import { createStoryAction } from '../../Redux/Story/story.action';
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "77vh",
    height: "97vh",     
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none",
  };
  
  const CreateStoryModal = ({ handleClose, open }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {auth} = useSelector((store) => store);
  
    const handleSelectImage = async (event) => {
      setIsLoading(true);
      const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
      setSelectedImage(imageUrl);
      setIsLoading(false);
      formik.setFieldValue("image", imageUrl);
    };
  
    const formik = useFormik({
      initialValues: {
        caption: "",
        image: "",
      },
      onSubmit: async (values) => {
        console.log("formik values", values);
        setIsLoading(true);
        await dispatch(createStoryAction(values));
        setIsLoading(false);
  
        setSelectedImage(null);
  
        formik.resetForm();
  
        handleClose();
      },
    });
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex space-x-4 items-center">
                <Avatar />
                <div>
                  <p className="font-bold text-lg">{auth.user?.firstName + " " + auth.user?.lastName}</p>
                  <p className="text-base">@{auth.user?.firstName?.toLowerCase() +
                "_" +
                auth.user?.lastName?.toLowerCase()}</p>
                </div>
              </div>
              <div className="flex space-x-5 items-center mt-3">
                <div className="flex flex-col items-center mx-auto justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    style={{ display: "none" }}
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <IconButton sx={{bgcolor:"black", color:"white"}} component="span">
                      <ImageIcon sx={{fontSize:"5rem", p:".3rem"}} />
                    </IconButton>
                  </label>
                  <span className="text-lg">Image</span>
                </div>
              </div>
              <textarea
                className="w-full mt-5 p-4 bg-transparent border border-[#3b4054] rounded-xl"
                placeholder="Write caption..."
                name="caption"
                onChange={formik.handleChange}
                value={formik.values.caption}
                rows="3"
              ></textarea>
              
  
              {selectedImage && (
                <div>
                  <img className="h-[20rem] w-full mt-5 flex justify-center mx-auto" src={selectedImage} alt="Selected" />
                </div>
              )}
  
              <div className="flex w-full justify-center mt-5 px-2 py-2">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "1.5rem", bgcolor:"black" }}
                >
                  Post Story
                </Button>
              </div>
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    );
  };
  
  export default CreateStoryModal;
  