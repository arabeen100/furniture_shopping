import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import Search from './products/Search';
import Footer from './Footer'
import { AppSidebar } from "./AppSidebar"
import { setExpanded } from '../features/sidebar/sidebarSlice';


const Layout = () => {
  const dispatch=useDispatch();
  const {isOpen}=useSelector((state)=>state.search)
  const {expanded}=useSelector((state)=>state.sidebar)
  return (

    <div  onClick={()=>{expanded && dispatch(setExpanded())}} className='App '>
          <Navbar/>
          {isOpen&&<Search/>}
          <Outlet />
          <Footer/>
          <AppSidebar/>
    </div>
  )
}

export default Layout


