import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({curUser , clearUserData}) {
  return <>
  <Navbar curUser={curUser} clearUserData={clearUserData} />

  <Outlet/>
  
  </>
}
