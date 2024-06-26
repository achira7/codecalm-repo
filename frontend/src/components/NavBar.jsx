import React, { useState, useContext } from 'react'
import "@fontsource/inter"
import 'typeface-inter'
import { Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const baseUrl = 'http://localhost:8000/api/employee/'

const media = 'http://127.0.0.1:8000/media/assets/'

const NavBar = () => {
  const navigate = useNavigate()
  const [ProfilePicture, setProfilePicture] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Employee, setEmployee] = useState([])
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getuser/", {
        withCredentials: true,
      });
      const user = response.data;
      setUserData(user);
    } catch (e) {
      console.error(e);
      setNavigate(true);
    }
  }


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  
 const logoutUser = async () => {
  try{
    const response = await axios.post('http://127.0.0.1:8000/api/logout/')
    return <Navigate to="/employee/login/"/>
  }
  catch{
    console.error('Error logging out:', error)
  }
 }

  const employeeLinks=[
    {
      id: 1,
      title: 'dashboard',
      link: './employee/dashboard'

    },
    {
      id: 2,
      title: 'live camera',
      link: './employee/livecam'
    },
    {
      id: 3,
      title: 'breathing excersise',
      link: '/employee/breathingexercise'
    },
    {
      id: 4,
      title: 'Ambinet white noise',
      link: './employee/player'
    },
  ]

  const supervisorLinks=[
    {
      id: 1,
      title: 'dashboard',
      link: './admin/dashboard'

    },
    {
      id: 2,
      title: 'live camera',
      link: './employee/livecam'
    },
    {
      id: 3,
      title: 'breathing excersise',
      link: '/employee/breathingexercise'
    },
    {
      id: 4,
      title: 'Ambinet white noise',
      link: './employee/player'
    },
  ]

  const adminLinks=[
    {
      id: 1,
      title: 'dashboard',
      link: './supervisor/dashboard'

    },
    {
      id: 2,
      title: 'live camera',
      link: './employee/livecam'
    },
    {
      id: 3,
      title: 'breathing excersise',
      link: '/employee/breathingexercise'
    },
    {
      id: 4,
      title: 'Ambinet white noise',
      link: './employee/player'
    },
  ]
  return(
      <div className='flex justify-between items-center w-full h-15 p-4 bg-sky-400 text-white sticky top-0 z-10 flex-initial'>
        <div className="flex items-center hover:cursor-pointer">
          <img className="h-8 px-2 drop-shadow-md shadow-blue-600/50 hover:cursor-pointer" src={`${media}codecalm-logo-colored.png`} /> 
          <h1 className='text-2xl font-google font-bold drop-shadow-xl shadow-blue-600/50 hover:cursor-pointer'>CodeCalm</h1>
        </div>

        <div className='flex justify-center w-full h-20 items-center fixed'>
              <ul className='flex'>
                {employeeLinks.map(({id, title, link}) => (
                    <li
                      key={id}
                      className='px-6 font-google font-semibold capitalize font-large text-white hover:text-green-300 hover:scale-105 hover:drop-shadow-xl duration-300'>
                         <Link to={link} className='cursor-pointer  drop-shadow-md shadow-blue-600/50'> {title} </Link></li>
                ))}
              </ul>
        </div>

        <div className='flex items-center space-x-4 mx-5'>
          <ul className='flex space-x-4 items-center'>
            
            <li>
              <svg className="h-6 w-6 transform hover:scale-110 transition-transform duration-300 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </li>
            <li>
              <svg className="h-6 w-6 transform hover:scale-110 transition-transform duration-300 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
              </svg>
            </li>
            <li>

            <button onClick={handleDropdownToggle} className="relative">
              <img className="h-9 rounded-full border-2 border-white shadow-blue-600/50 transform hover:scale-110 transition-transform duration-300 cursor-pointer" src={userData.profile_picture ? userData.profile_picture: "http://127.0.0.1:8000/media/profilePictures/default.jpg"}/>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-lg z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font google">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font google">Settings</Link>
                  <Link to="/employee/login" onClick={logoutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font google">Logout</Link>
                </div>
              )}
            </li>  
          </ul>
        </div>
      </div>
  )
}

export default NavBar