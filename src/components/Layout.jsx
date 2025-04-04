import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import Search from './products/Search';
import Footer from './Footer'
import { AppSidebar } from "./AppSidebar"
import { setExpanded } from '../features/sidebar/sidebarSlice';
import Plusbutton from './Plusbutton';
const Layout = () => {
  const dispatch=useDispatch();
  const {isOpen}=useSelector((state)=>state.search)
  const {expanded}=useSelector((state)=>state.sidebar)
  return (

    <div  onClick={()=>{expanded && dispatch(setExpanded())}} className='App '>
          <AppSidebar/>
          <Navbar/>
          <Plusbutton/>
          {isOpen&&<Search/>}
          <Outlet/>
          <Footer/>
          
    </div>
  )
}

export default Layout


