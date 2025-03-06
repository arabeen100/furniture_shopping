import React from 'react'
import { Carticon,Searchicon,Hearticon,Menuicon } from '@/icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openSearch } from '@/features/search/searchSlice'
import { setExpanded } from '../features/sidebar/sidebarSlice'
import { useSelector } from 'react-redux'
const Navbar = () => {
   const dispatch= useDispatch();
   const {registered}=useSelector((state)=>state.register)

  return (
    <nav>
     <div className='flex justify-baseline items-center gap-3 relative  left-5'>
      <Link to="/auth/login" className={` ${registered?"hidden":"grid place-content-center"} w-[140px] h-[30px]outline-none p-1 rounded-[5px] bg-[#042e2e] border border-white text-white`}>تسجيل الدخول</Link>
      <Link to='/auth/signup' className={` ${registered?"hidden":"grid  place-content-center"} w-[80px] h-[30px]outline-none p-1 rounded-[5px] bg-[#042e2e] border border-white text-white`}>تسجيل</Link>
      <Link to='/profile/personalinfo' className={`${!registered?"md:hidden":"md:grid md:place-content-center"}  hidden  w-[38px] h-[38px] bg-white rounded-full`}>
        <img src='/src/assets/profile.webp' alt='profile' loading='lazy' width='25' />
      </Link>  
      <button onClick={()=>dispatch(openSearch())} className=' cursor-pointer'>
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
     <div className='flex md:flex-row-reverse  items-center relative right-5 gap-2'>
      <Link to='/'>
       <img src='/src/assets/nav-logo.svg' alt='Al-rahman_logo'loading='lazy'/>
      </Link>
      <button onClick={()=>dispatch(setExpanded())}>
        <Menuicon/>
      </button>
      <p className='hidden md:block  text-white text-[20px]'>فئات</p>
     
     </div>
    </nav>
  )
}

export default Navbar
