import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import Search from './products/Search';
import Footer from './Footer'
import { AppSidebar } from "./AppSidebar"
import { setExpanded, setExpandedMenu } from '../features/sidebar/sidebarSlice';
import Plusbutton from './Plusbutton';
import Categoriesmenu from './categories/Categoriesmenu';
import Scrolltop from './Scrolltop';
import Editaddress from './Editaddress';
const Layout = () => {
  const dispatch=useDispatch();
  const {isOpen}=useSelector((state)=>state.search)
  const {expanded}=useSelector((state)=>state.sidebar);
  const {expandedMenu}=useSelector((state)=>state.sidebar);
  const {openEdit}=useSelector((state)=>state.checkout)
  return (

    <div  onClick={()=>{expanded && dispatch(setExpanded());
    expandedMenu&&dispatch(setExpandedMenu());
    }} className={`App`}>
          <Categoriesmenu/>
          <AppSidebar/>
          <Scrolltop/>
          <Navbar/>
          {openEdit&&<Editaddress/>}
          {isOpen&&<Search/>}
          <Plusbutton/>
          <Outlet/>
          <Footer/>
          
    </div>
  )
}

export default Layout


