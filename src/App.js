import './App.css';
import Authentication from './pages/authentication/Authentication';
import HomePage from './pages/homepage/HomePage';
import Profile from "../src/pages/profile/Profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/authentication/Login';
import Register from '../src/pages/authentication/Register';

import Message from './pages/message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import AllStoryCard from './components/stories/AllStoryCard';


function App() {
  const {auth} = useSelector(store=>store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[jwt])
  return (
    <div className=''>
        <Routes>
        <Route path='/*' element={auth.user?<HomePage/>:<Authentication/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/*' element={<Authentication/>}/>
        <Route path='/stories' element={<AllStoryCard/>} />
        </Routes> 
    </div>
  );
}

export default App;
