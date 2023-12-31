import React, { useState, useEffect , useReducer } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [ignored , forceUpdate] = useReducer(x => x+1 , 0)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
      forceUpdate();
    })
    .finally(() => setLoading(false))
  }, [ignored])
  
  return !loading ? (
    <div className='h-full w-full absolute left-0 right-0 bottom-0 flex flex-wrap bg-white overflow-x-hidden'>
      <div className='w-full block'>
        <Header />
        <main className='bg-white'>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App