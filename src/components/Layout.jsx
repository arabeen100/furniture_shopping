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
import Addition from './Addition';
import Order from './Order';
const Layout = () => {
  const dispatch=useDispatch();
  const {isOpen}=useSelector((state)=>state.search)
  const {expanded}=useSelector((state)=>state.sidebar);
  const {expandedMenu}=useSelector((state)=>state.sidebar);
  const {openEdit}=useSelector((state)=>state.checkout)
  const{openOrder}=useSelector((state)=>state.checkout);  
  const {openAddition}=useSelector((state)=>state.addition)
  return (

    <div   onClick={()=>{expanded && dispatch(setExpanded());
    expandedMenu&&dispatch(setExpandedMenu());
    }} className={`App flex flex-col`}>
          <Categoriesmenu/>
          <AppSidebar/>
          <Scrolltop/>
          <Navbar/>
          {openOrder&&<Order/>}
          {openAddition&&<Addition/>}
          {openEdit&&<Editaddress/>}
          {isOpen&&<Search/>}
          <Plusbutton/>
          <main className='flex-1'>
          <Outlet/>
          </main>
          <Footer/>
          
    </div>
  )
}

export default Layout


