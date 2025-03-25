import React from 'react'
import Profilecard from './Profilecard'
import { setProfileClicked,setUserOrdersClicked,setWishlistClicked } from '@/features/sidebar/sidebarSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const Wishlist = () => {
  const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setProfileClicked(false));
        dispatch(setUserOrdersClicked(false));
        dispatch(setWishlistClicked(true))
    },[])
  return (
    <div className='w-full flex small:w-fit px-3 mx-auto   '>
    <div className=' w-full justify-center   flex-grow  mt-9 flex flex-col items-end '>
      
      <p className='text-right text-4xl text-[#042e2e] mr-5 mb-9 '>ملفي الشخصي</p>
      <div className='w-full flex-col   larger:items-baseline'> 
      <Profilecard/>
      <p className='text-right mt-5 mb-5 mr-2 font-semibold '>Empty wishlist.</p>
      </div>
    </div>
    </div>
  )
}

export default Wishlist