import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction, likePostAction, savePostAction } from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";
import { isSavedByReqUser } from "../../utils/isSavedByReqUser";


const Postcard = ({ item = {} }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);

  const handleShowComments = () => setShowComments(!showComments);

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

 const handleSavePost = () => {
  dispatch(savePostAction(item.id));
};

console.log(isSavedByReqUser(auth.user?.id, item))

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{width:50, height:50}}
          src={item.user?.profilePic}
          aria-label="recipe">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${item.user?.firstName} ${item.user?.lastName}`}
        subheader={`@${item.user?.firstName?.toLowerCase()}_${item.user?.lastName?.toLowerCase()}`}
      />

      {/* Conditionally render image or video */}
      {item.image ? (
        <img
          className="w-full max-h-[35rem] object-cover"
          src={item.image}
          alt="post is loading"
        />
      ) : item.video ? (
        <video className="w-full max-h-[35rem] object-cover" autoPlay loop muted controls>
          <source src={item.video} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      ) : null}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user?.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={handleShowComments}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>

        <IconButton onClick={handleSavePost}>
        {isSavedByReqUser(auth.user?.id, item) ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
        </IconButton>
      </CardActions>
      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                }
              }}
              className="w-full outline-none border border-[#3b4054] bg-transparent rounded-full px-5 py-2"
              placeholder="Write your comment..."
              type="text"
            />
          </div>
          <Divider />
          <div className="mx-3 my-5 space-y-2 text-sm">
            {item.comments.map((comment, index) => (
              <div key={comment.id || index} className="flex items-center space-x-5">
                <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                src={comment.user?.profilePic}  // Use the comment's user profilePic
            alt={`${comment.user?.firstName} ${comment.user?.lastName}`}>
                  {item.user?.profilePic}
                </Avatar>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default Postcard;
