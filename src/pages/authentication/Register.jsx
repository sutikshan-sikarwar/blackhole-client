import { Button, FormControlLabel, Radio, RadioGroup, TextField, IconButton, Avatar } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary"; // Adjust the import path if needed

// Initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  profilePic: "" // Field for profile picture
};

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
  profilePic: Yup.string().url("Invalid URL").nullable() // Validate URL if profilePic is provided
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectImage = async (event, setFieldValue) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadToCloudinary(file, "image");
        setFieldValue("profilePic", imageUrl); // Set the profilePic field in form
        setPreviewImage(imageUrl); // Show image preview
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = (values) => {
    console.log("Form Values Submitted:", values);
    dispatch(registerUserAction(values));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            <div className="space-y-5">
              {/* Image Upload Field */}
              <div className="flex flex-col items-center mx-auto justify-center">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="rounded-full w-24 h-24 object-cover"
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSelectImage(e, setFieldValue)}
                      style={{ display: "none" }}
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <IconButton sx={{ bgcolor: "black", color: "white" }} component="span">
                        <ImageIcon sx={{ fontSize: "4rem", p: ".3rem" }} />
                      </IconButton>
                    </label>
                  </div>
                )}
                <span className="text-lg">Upload Image</span>
              </div>
              
              {/* First Name */}
              <div>
                <Field
                  as={TextField}
                  name="firstName"
                  placeholder="Enter first name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>

              {/* Last Name */}
              <div>
                <Field
                  as={TextField}
                  name="lastName"
                  placeholder="Enter last name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>

              {/* Email */}
              <div>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              {/* Password */}
              <div>
                <Field
                  as={TextField}
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>

              {/* Gender */}
              <div>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  onChange={(e) => setFieldValue("gender", e.target.value)}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                <ErrorMessage name="gender" component="div" className="text-red-500" />
              </div>
              
            </div>

            <Button sx={{ padding: ".8rem 0rem" }} fullWidth type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Form>
        )}
      </Formik>
      
      <div className="flex items-center gap-2 justify-center pt-5">
        <p>Already have an account?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  );
};

export default Register;
