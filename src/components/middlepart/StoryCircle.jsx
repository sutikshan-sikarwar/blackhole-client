import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesAction, fetchUserStoriesAction } from '../../Redux/Story/story.action';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Helper function to group stories by user
const groupStoriesByUser = (stories) => {
  const groupedStories = new Map();
  stories.forEach(story => {
    const userId = story.user.id;
    if (!groupedStories.has(userId)) {
      groupedStories.set(userId, {
        user: story.user,
        stories: []
      });
    }
    groupedStories.get(userId).stories.push(story);
  });
  return Array.from(groupedStories.values());
};

// Modal styles (adapted from CreateStoryModal)
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "77vh",
  height: "100vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "2rem",
  outline: "none",
};

const StoryCircle = () => {
  const dispatch = useDispatch();
  const { stories, loading } = useSelector((state) => state.story);
  const [open, setOpen] = useState(false);
  const [selectedUserStories, setSelectedUserStories] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0); // Track current story

  useEffect(() => {
    dispatch(fetchStoriesAction()); // Fetch all stories initially
  }, [dispatch]);

  const handleClickOpen = (user) => {
    dispatch(fetchUserStoriesAction(user.id)); // Fetch stories for the selected user
    const userStories = stories.filter(story => story.user.id === user.id);
    setSelectedUserStories(userStories);
    setSelectedUser(user);
    setOpen(true);
    setCurrentStoryIndex(0); // Start at the first story
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserStories([]);
    setSelectedUser(null);
    setCurrentStoryIndex(0); // Reset index
  };

  const handleNextStory = () => {
    if (currentStoryIndex < selectedUserStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  if (loading) return <div>Loading...</div>;

  // Group stories by user to display unique users
  const groupedStories = groupStoriesByUser(stories);

  return (
    <div className="flex flex-row items-center">
      {groupedStories.map((group) => (
        <div key={group.user.id} className="cursor-pointer mr-4" onClick={() => handleClickOpen(group.user)}>
          <Avatar 
            src={group.user.profilePic} 
            sx={{ width: 80, height: 80 }} 
          />
          <p className="text-center -translate-y-5 px-3 mt-2 text-white opacity-60 bg-black rounded-full">{group.user.firstName}</p>
        </div>
      ))}

      {/* Modal implementation */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <div className="relative w-full h-full">
            {selectedUserStories.length > 0 && (
              <div className="w-full h-full relative">
                <div className="overflow-hidden h-full" style={{ borderRadius: '20px' }}>
                  <img
                    src={selectedUserStories[currentStoryIndex].image}
                    alt={selectedUserStories[currentStoryIndex].caption}
                    className="w-full h-full"
                    style={{ borderRadius: '20px', objectFit: 'cover' }}
                  />
                </div>
                <div className='absolute bottom-20 w-full flex justify-center items-center'>
                  <div className='text-white flex flex-col justify-center items-center px-6'>
                    <div className='flex flex-row py-5 items-center justify-center'>
                      <Avatar sx={{width: 55, height: 55}} src={selectedUserStories[currentStoryIndex].user.profilePic} />
                      <p className='ml-2 text-xl font-medium'>
                        {`${selectedUserStories[currentStoryIndex].user.firstName} ${selectedUserStories[currentStoryIndex].user.lastName}`}
                      </p>
                    </div>
                    <p className='text-lg font-normal'>{selectedUserStories[currentStoryIndex].caption}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Close button */}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ position: 'absolute', top: 8, right: 16 }}
            >
              <CloseIcon />
            </IconButton>

            {/* Previous story button */}
            <button
              onClick={handlePreviousStory}
              className={`absolute top-[50%] left-9 z-10 bg-black opacity-50 text-white rounded-full px-2 py-2 ${
                currentStoryIndex === 0 ? 'invisible' : ''
              }`}
            >
              <ArrowBackIcon />
            </button>

            {/* Next story button */}
            <button
              onClick={handleNextStory}
              className={`absolute top-[50%] right-9 z-10 bg-black opacity-50 text-white rounded-full px-2 py-2 ${
                currentStoryIndex === selectedUserStories.length - 1 ? 'invisible' : ''
              }`}
            >
              <ArrowForwardIcon />
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default StoryCircle;
