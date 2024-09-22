import React, { useEffect, useState, useRef } from 'react';
import AllReelsCard from './AllReelsCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReelsAction } from '../../Redux/Reel/reel.action';

const Reels = () => {
  const dispatch = useDispatch();
  const { reels, loading } = useSelector(store => store.reel);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const videoRefs = useRef([]); // Ref array to keep track of video elements

  useEffect(() => {
    dispatch(fetchReelsAction());
  }, [dispatch]);

  useEffect(() => {
    // Ensure only the current reel is playing
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentReelIndex) {
          video.play().catch((error) => console.error('Error playing video:', error));
        } else {
          video.pause();
        }
      }
    });
  }, [currentReelIndex]);

  const handleNextReel = () => {
    if (currentReelIndex < reels.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentReelIndex(currentReelIndex + 1);
      setTimeout(() => setIsAnimating(false), 500); // Duration of the transition
    }
  };

  const handlePreviousReel = () => {
    if (currentReelIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentReelIndex(currentReelIndex - 1);
      setTimeout(() => setIsAnimating(false), 500); // Duration of the transition
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-full bg-opacity-30 w-[50%] flex flex-col px-3 py-3 justify-center items-center relative overflow-hidden'>
        
        {/* Up Arrow Button */}
        <button
          onClick={handlePreviousReel}
          className={`absolute top-10 z-10 bg-black opacity-50 text-white rounded-full px-2 py-2 ${
            currentReelIndex === 0 ? 'invisible' : ''
          }`}
        >
          <ArrowUpwardIcon />
        </button>

        {/* Reels with sliding transition */}
        <div
          className={`w-full h-full flex flex-col transition-transform duration-500 ease-in-out`}
          style={{
            transform: `translateY(-${currentReelIndex * 100}%)`, // Vertical sliding
          }}
        >
          {reels.length > 0 && reels.map((item, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 py-2"
            >
              <AllReelsCard
                item={item}
                isActive={index === currentReelIndex}
                ref={el => videoRefs.current[index] = el} 
              />
            </div>
          ))}
        </div>

      
        <button
          onClick={handleNextReel}
          className={`absolute bottom-10 z-10 bg-black opacity-50 text-white rounded-full px-2 py-2 ${
            currentReelIndex === reels.length - 1 ? 'invisible' : ''
          }`}
        >
          <ArrowDownwardIcon />
        </button>
      </div>
    </div>
  );
};

export default Reels;
