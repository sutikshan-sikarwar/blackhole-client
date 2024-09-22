import {
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import SearchUser from "../../components/searchUser/SearchUser";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import { store } from "../../Redux/store";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);
  const [stompClient, setStompClient] = useState();

  // Effect to fetch all chats initially
  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.user || !currentChat) return; // Ensure auth.user and currentChat are available
  
    const sock = new SockJS("http://localhost:5454/ws");
    const stomp = Stomp.over(sock);
  
    stomp.debug = (str) => {
      console.log(`STOMP: ${str}`);
    };
  
    stomp.connect({}, () => {
      console.log("WebSocket connected");
  
      // Unsubscribe from previous chat if it exists
      if (stompClient) {
        stompClient.unsubscribe(`/user/${auth.user.id}/private/${currentChat.id}`);
      }
  
      // Subscribe to the new chat
      const subscription = stomp.subscribe(
        `/user/${auth.user.id}/private/${currentChat.id}`,
        onMessageReceive
      );
      
      setStompClient(stomp);
  
      // Clean up: Unsubscribe and disconnect on component unmount or chat change
      return () => {
        subscription.unsubscribe();
        stomp.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      };
    }, onError);
  
  }, [currentChat, auth.user]); // Depend on currentChat and auth.user to re-subscribe when they change
  

  // Handle WebSocket errors
  const onError = (error) => {
    console.log("WebSocket error:", error);
  };

  // Function to handle received messages via WebSocket
  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("Message received:", receivedMessage);

    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  // Send a message via WebSocket
  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage && currentChat) {
      stompClient.send(
        `/app/chat/${currentChat.id}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  // Handle sending a new message
  const handleCreateMessage = (value) => {
    if (currentChat) {
      const message = {
        chatId: currentChat.id,
        content: value,
        image: selectedImage,
      };

      dispatch(createMessage({ message, sendMessageToServer }));

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, user: auth.user, createdAt: new Date() },
      ]);
      setSelectedImage("");
      setInputValue("");
    }
  };

  // Handle selecting an image to upload
  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("Handling image selection...");
    try {
      const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
      setSelectedImage(imgUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-screen">
      <Grid container className="h-full">
        {/* Sidebar */}
        <Grid item xs={3} className="h-full border-r px-5">
          <div className="flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex space-x-4 items-center py-5">
              <WestIcon />
              <h1 className="font-bold text-xl">Home</h1>
            </div>
            {/* Search and Chat List */}
            <div className="flex flex-col h-full">
              <div className="mb-5">
                <SearchUser />
              </div>
              <div className="flex-1 mt-5 space-y-4 overflow-y-scroll hideScrollBar">
                {message.chats.map((item) => (
                  <div
                    className="cursor-pointer"
                    key={item.id} // Adding a unique key prop
                    onClick={() => {
                      setCurrentChat(item);
                      setMessages(item.messages);
                    }}
                  >
                    <UserChatCard chat={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Grid>

        {/* Main Chat Area */}
        <Grid item xs={9} className="h-full">
          {currentChat ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-3">
                  <Avatar
                  sx={{width:55, height:55}}
                    src={currentChat.users[0]?.profilePic}
                    alt="loading profile picture"
                  />
                  <p>
                    {auth.user?.id === (currentChat.users[0]?.id || '') 
                      ? `${currentChat.users[1]?.firstName} ${currentChat.users[1]?.lastName}` 
                      : `${currentChat.users[0]?.firstName} ${currentChat.users[0]?.lastName}`}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton style={{ color: "black" }}>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton style={{ color: "black" }}>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <Divider />
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-scroll hideScrollBar h-80vh space-y-2 px-4 py-5"
              >
                {messages.map((item, index) => (
                  <ChatMessage key={index} item={item} />
                ))}
              </div>

              {/* Input Area */}
              <div className="p-5">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt="Selected"
                  />
                )}
                <div className="flex items-center justify-center space-x-5 py-3">
                  <input
                    value={inputValue} // Bind input to state
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                      }
                    }}
                    className="bg-transparent border py-3 px-5 border-[#3b4054] w-[95%] rounded-full"
                    placeholder="Send Message..."
                    type="text"
                  />

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon
                        sx={{ fontSize: "2.2rem" }}
                        className="cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No chats selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
