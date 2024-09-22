import { Card, Grid } from '@mui/material'
import React from 'react'
import Login from './Login'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'

const Authentication = () => {
  return (
    <div>
        <Grid container>
            <Grid className='h-screen overflow-hidden' item xs={8}>
                <img className='h-full w-full' src='https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png' alt='bc image kho gayi'/>
            </Grid>
            <Grid item xs={4}>
                <div className='px-20 flex flex-col justify-center h-full'>
                <Card className='card p-8'>
                    <div className='flex flex-col items-center mb-5 space-y-1'>
                        <h1 className='logo text-center'>BlackHole</h1>
                        <p className='text-center text-sm w-[70%]'>In this World of eternal Souls, each soul is anonymous</p>
                    </div>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                    </Routes>
                    </Card>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Authentication