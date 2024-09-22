import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchUser from '../../components/searchUser/SearchUser';
import { Card, CardHeader, Avatar } from '@mui/material';

const UsersList = () => {
  const dispatch = useDispatch();
  const { searchUser } = useSelector((state) => state.auth || {});

  return (
    <div className='flex justify-center items-center h-screen w-[60%]'>
      <div className='flex w-full h-full p-5 flex-col'>
        <SearchUser />

        <div className='mt-5'>
          {searchUser.length > 0 ? (
            searchUser.map((user) => (
              <Card key={user.id} className="mb-2">
                <CardHeader
                  avatar={
                    <Avatar src={user.profilePic} />
                  }
                  title={`${user.firstName} ${user.lastName}`}
                  subheader={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
                />
              </Card>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
