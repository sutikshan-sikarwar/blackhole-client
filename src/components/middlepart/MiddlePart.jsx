import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import Postcard from "../post/Postcard";
import CreatePostModal from "../createPost/CreatePostModal";
import CreateStoryModal from "../stories/CreateStoryModal";
import AllStoryCard from "../stories/AllStoryCard";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction, getAllPostAction } from "../../Redux/Post/post.action";
import { fetchStoriesAction, fetchUserStoriesAction } from "../../Redux/Story/story.action";

const MiddlePart = () => {
  const dispatch = useDispatch();
  const { auth, post, story } = useSelector(store => store || {}); // Add a default value {} for store in case it's undefined
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [openCreateStoryModal, setOpenCreateStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);  // New state for selected story
  const [openStoryModal, setOpenStoryModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleCloseCreateStoryModal = () => setOpenCreateStoryModal(false);
  const handleCloseStoryModal = () => setOpenStoryModal(false);

  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
  const handleOpenCreateStoryModal = () => setOpenCreateStoryModal(true);

  const handleOpenStory = (userId) => {
    const storyItem = story?.stories?.find(item => item.userId === userId); // Check if story and story.stories are defined
    setSelectedStory(storyItem);  // Set the selected story
    if (userId) {
      dispatch(fetchUserStoriesAction(userId)); // Fetch user stories if userId is defined
      setOpenStoryModal(true); // Open modal
    } else {
      console.warn("No valid userId provided"); // Log a warning if userId is undefined
    }
  };

  useEffect(() => {
    dispatch(getAllPostAction());
    dispatch(fetchStoriesAction()); // Fetch stories when component mounts
  }, [dispatch, post.newComment]);

  useEffect(() => {
    if (postCreated) {
      setOpenCreatePostModal(false);
      setPostCreated(false);
    }
  }, [postCreated]);

  const handlePostCreation = () => {
    dispatch(createPostAction()).then(() => {
      setPostCreated(true);
    });
  };

  // Helper function to group stories by user and get unique users
  const getUniqueUsers = (stories) => {
    const userMap = new Map();
    stories.forEach(story => {
      if (!userMap.has(story.userId)) {
        userMap.set(story.userId, story.user);
      }
    });
    return Array.from(userMap.values());
  };

  const uniqueUsers = getUniqueUsers(story?.stories || []);

  return (
    <div className="ml-4 px-10">
      <section className="flex mt-5 p-5 items-center rounded-b-md">
        <div className="flex flex-col items-center cursor-pointer mr-4">
          <Avatar sx={{ width: "5rem", height: "5rem" }} onClick={handleOpenCreateStoryModal}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p className="text-center -translate-y-5 mt-2 text-white opacity-60 px-3 bg-black rounded-full">New</p>
        </div>
  
        {uniqueUsers.length > 0 && uniqueUsers.map((user) => ( // Display unique story circles
          <StoryCircle
            key={user.id}
            item={user}
            onClick={() => handleOpenStory(user.id)} // Pass userId to fetch stories
          />
        ))}
      </section>

      <Card className="p-5">
        <div className="flex justify-between">
          <Avatar sx={{width:50, height:50}}
           src={auth.user.profilePic}/>
          <input
          placeholder='Post...'
            onClick={handleOpenCreatePostModal}
            readOnly
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center ">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center ">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center ">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span>Write article</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {post?.posts?.length > 0 && post.posts.map((item) => ( // Check if post.posts exists and has length
          <Postcard key={item.id} item={item} />
        ))}
      </div>

      <CreatePostModal
        handleClose={handleCloseCreatePostModal}
        open={openCreatePostModal}
        onCreatePost={handlePostCreation}
      />
      <CreateStoryModal
        handleClose={handleCloseCreateStoryModal}
        open={openCreateStoryModal}
      />

      {selectedStory && (
        <AllStoryCard 
          item={selectedStory} 
          open={openStoryModal} 
          handleClose={handleCloseStoryModal}
        />
      )}
    </div>
  );
};

export default MiddlePart;
