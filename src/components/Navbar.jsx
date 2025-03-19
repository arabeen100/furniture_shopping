import React from 'react'
import { Carticon,Searchicon,Hearticon,Menuicon } from '@/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openSearch } from '../features/search/searchSlice'
import { setExpanded } from '../features/sidebar/sidebarSlice'
import profileLogo from "../assets/profile.webp"
import navbarLogo from "../assets/nav-logo.svg" 
const Navbar = () => {
  const{token}=useSelector((state)=>state.login)
  const dispatch= useDispatch();   
  return (
    <nav>
     <div className='flex justify-baseline items-center gap-3 relative  left-5'>
      <Link to="/auth/login" className={` ${token?"hidden ":"hidden large:grid large:place-content-center"} w-[140px] h-[30px]outline-none p-1 rounded-[5px] bg-[#042e2e] border border-white text-white  hover:bg-[#5bb3ae]  `}>تسجيل الدخول</Link>
      <Link to='/auth/signup' className={` ${token?"hidden":" hidden large:grid  large:place-content-center"} w-[80px] h-[30px]outline-none p-1 rounded-[5px] bg-[#042e2e] border border-white text-white  hover:bg-[#5bb3ae]`}>تسجيل</Link>
      <Link to='/profile/personalinfo' className={`${!token?"large:hidden":"large:grid large:place-content-center"}  hidden  w-[38px] h-[38px] bg-white rounded-full`}>
        <img src={profileLogo} alt='profile' loading='lazy' width='25' />
      </Link>  
      <button onClick={()=>{dispatch(openSearch())}} className=' cursor-pointer'>
        <Searchicon/> 
      </button>
      <Link to='/profile/wishlist'>
       <Hearticon/>
      </Link> 
      <Link to='/orders/checkout'>
        <Carticon/>
      </Link> 
      <div className='w-5 h-5 rounded-full bg-yellow-300 grid place-content-center relative right-6 bottom-3' >
       <p>0</p>
      </div>
      
      
     </div>
     <div className='flex large:flex-row-reverse  items-center relative right-5 gap-2'>
      <Link to='/'>
       <img src={navbarLogo} alt='Al-rahman_logo'loading='lazy'/>
      </Link>
      <button onClick={()=>{dispatch(setExpanded())}}>
        <Menuicon/>
      </button>
      <p className='hidden large:block  text-white text-[20px]'>فئات</p>
     
     </div>
    </nav>
  )
}

export default Navbar
