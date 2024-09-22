import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchUser from '../searchUser/SearchUser';
import PopularUserCard from './PopularUserCard';
import { Card } from '@mui/material';
import { fetchUsers } from '../../Redux/Auth/auth.action';

const HomeRight = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(state => state.auth || {}); // Default to empty array for users and empty object for state
  const [displayedUsers, setDisplayedUsers] = useState([]);
  
  // Get the logged-in user's ID
  const { user: loggedInUser } = useSelector(state => state.auth);
  const loggedInUserId = loggedInUser?.id;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      // Filter out the logged-in user
      const filteredUsers = users.filter(user => user.id !== loggedInUserId);

      // Randomly select 5 users from the filtered list
      const randomUsers = filteredUsers.sort(() => 0.5 - Math.random()).slice(0, 5);
      setDisplayedUsers(randomUsers);
    }
  }, [users, loggedInUserId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || 'An error occurred'}</div>;

  return (
    <div className='p-5 pr-5'>
      <SearchUser />
      <Card>
        <div className='flex justify-between py-5 items-center p-3'>
          <p className='font-semibold text-base opacity-70'>Suggestions for you</p>
          <p className='font-semibold text-sm opacity-95'>View all</p>
        </div>
        <div>
          {displayedUsers.length > 0 ? (
            displayedUsers.map(user => (
              <PopularUserCard key={user.id} user={user} />
            ))
          ) : (
            <p>No suggestions available</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
