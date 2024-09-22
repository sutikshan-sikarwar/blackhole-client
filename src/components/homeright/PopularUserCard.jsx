import React from 'react';
import { Avatar, Button, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';

const PopularUserCard = ({ user }) => {
  // Default profile picture if none is provided
  const defaultProfilePic = 'https://via.placeholder.com/40'; // Fallback image URL

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar 
            sx={{width:60, height:60 }} 
            aria-label="recipe"
            src={user.profilePic || defaultProfilePic}
          >
            {!user.profilePic && user.firstName.charAt(0)} {/* Display initial if no profilePic */}
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
      />
    </div>
  );
};

export default PopularUserCard;
