import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({ chat = {} }) => {
  const { auth } = useSelector((store) => store);

  // Ensure chat.users is defined and has at least 2 elements
  const users = chat.users || [];
  const user1 = users[0] || {};
  const user2 = users[1] || {};
  console.log(user2)
  console.log(user1)

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)"
            }}
            src={user1.profilePic}
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          
          auth.user?.id === user1.id 
            ? `${user2.firstName} ${user2.lastName}` 
            : `${user1.firstName} ${user1.lastName}`
            
        }
        
        subheader="new message"
        
      />
    </Card>
  );
};

export default UserChatCard;
