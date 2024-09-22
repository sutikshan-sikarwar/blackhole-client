import React, { useState } from 'react';
import { Avatar, IconButton, Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Define modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "77vw",
  height: "100vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "2rem",
  outline: "none",
};

const AllStoryCard = ({ item, open, handleClose, onPrevious, onNext }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      onPrevious();
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < item.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      onNext();
    }
  };

  if (!item || !item.stories) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {item.stories.length > 0 && (
          <div className="w-full h-full relative">
            <img
              src={item.stories[currentStoryIndex].image}
              alt={item.stories[currentStoryIndex].caption}
              className="w-full h-full object-cover"
              style={{ borderRadius: '20px' }}
            />
            <div className="absolute bottom-20 w-full flex justify-center items-center">
              <div className="text-white flex flex-col justify-center items-center px-6">
                <div className="flex flex-row py-5 items-center justify-center">
                  <Avatar sx={{ width: 55, height: 55 }} src={item.stories[currentStoryIndex].user.profilePic} />
                  <p className="ml-2 text-xl font-medium">
                    {`${item.stories[currentStoryIndex].user.firstName} ${item.stories[currentStoryIndex].user.lastName}`}
                  </p>
                </div>
                <p className="text-lg font-normal">{item.stories[currentStoryIndex].caption}</p>
              </div>
            </div>

            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 16 }}>
              <CloseIcon />
            </IconButton>

            {currentStoryIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute top-[50%] left-9 z-10 bg-black opacity-50 text-white rounded-full px-2 py-2"
              >
                <ArrowBackIcon />
              </button>
            )}

            {currentStoryIndex < item.stories.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute top-[50%] right-9 z-10 bg-black opacity-50 text-white rounded-full px-2 py-2"
              >
                <ArrowForwardIcon />
              </button>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default AllStoryCard;
