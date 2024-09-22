import React, { useState } from 'react';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { IconButton, TextField, Button, CircularProgress, Backdrop } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { createReelAction } from '../../Redux/Reel/reel.action';

const CreateReelsForm = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      video: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (selectedVideo) {
          // Upload video to Cloudinary
          const videoUrl = await uploadToCloudinary(selectedVideo, 'video');
          values.video = videoUrl;
        }
        await dispatch(createReelAction(values));
        formik.resetForm();
        setSelectedVideo(null);
      } catch (error) {
        console.error('Error creating reel:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="w-[40%] h-[62%] px-5 py-3 space-y-4 rounded-3xl outline-dotted shadow-2xl flex flex-col justify-center items-center">
        <IconButton onClick={() => document.getElementById('video-input').click()}>
          <SlowMotionVideoIcon sx={{ fontSize: '7rem' }} />
        </IconButton>
        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          style={{ display: 'none' }}
        />
        <TextField
          className='W-[70%]'
          variant="outlined"
          margin="normal"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {selectedVideo && (
          <div>
            <video className="w-full h-[15rem]" controls src={URL.createObjectURL(selectedVideo)} />
          </div>
        )}
        <Button
          variant="contained"
          onClick={formik.handleSubmit}
          disabled={isLoading}
          sx={{ borderRadius: '1.5rem', bgcolor:"black", py:".8rem"}}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Create Reel'}
        </Button>
      </div>
      <p className="mt-5 text-2xl">Create Reels</p>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default CreateReelsForm;
