import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import LoadingSpinner from '../LoadingSpinner'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler =  async () => {
      setLoading(true)
      await  authService.logout().then(() => {
            dispatch(logout())
        })
      setLoading(false)
      navigate(`/login`) 
    }

  return (
    loading? (<LoadingSpinner/> ) : (
      <button
      className='lg:m-0 lg:ml-1 md:m-0 m-2 inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full bg-black text-white hover:text-black ml-1'
      onClick={logoutHandler}
      >Logout</button>
      )
  )
}

export default LogoutBtn