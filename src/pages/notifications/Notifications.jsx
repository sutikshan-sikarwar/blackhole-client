import { IconButton } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = () => {
  return (
    <div className='flex p-5 justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-5'>
                <NotificationsIcon sx={{fontSize:"15rem"}}/>
            
            <p className='text-3xl font-semibold'>No Notifications right now</p>
        </div>
    </div>
  )
}

export default Notifications