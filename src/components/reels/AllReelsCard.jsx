import React, { useRef, useEffect } from 'react';
import { Avatar } from '@mui/material';

const AllReelsCard = React.forwardRef(({ item = {}, isActive }, ref) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isActive;
      if (isActive) {
        video.play().catch((error) => console.error('Error playing video:', error));
      } else {
        video.pause();
      }
    }
  }, [isActive]);

  return (
    <div className="w-full h-full relative">
      <div className='overflow-hidden h-full' style={{ borderRadius: '20px' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="w-full h-full"
          src={item.video}
          style={{ borderRadius: '20px', objectFit: 'cover' }}
        />
      </div>
      <div className='absolute bottom-20 w-full flex justify-center items-center'>
      <div className='text-white flex flex-col justify-center items-center px-6'>
        <div className='flex flex-row py-5 items-center justify-center'>
          <Avatar src={item.user?.profilePic}/>
          <p className='ml-2 text-xl font-medium'>{`${item.user?.firstName} ${item.user?.lastName}`}</p>
        </div>
        <p className='text-lg font-normal'>{item.title}</p>
      </div>
      </div>
    </div>
  );
});

export default AllReelsCard;
