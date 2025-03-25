import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {PackageIcon} from 'lucide-react'
import { Hearticon, Usericon } from '@/icons'
import { useSelector,useDispatch } from 'react-redux'
import { setProfileClicked, setUserOrdersClicked, setWishlistClicked } from '@/features/sidebar/sidebarSlice'
const Profilecard = ({name}) => {
    const dispatch=useDispatch();
    const{profileClicked}=useSelector((state)=>state.sidebar)
 /*    const[wishlistClicked,setWishlistClicked]=useState(false);
    const[userordersClicked,setUserordersClicked]=useState(false);
    const[personalinfoClicked,setPersonalinfoClicked]=useState(false); */
    const{wishlistClicked}=useSelector((state)=>state.sidebar);
    const{userOrdersClicked}=useSelector((state)=>state.sidebar)
  return (
   <div className='w-full flex flex-grow larger:mx-2'>
    <div className={`flex-grow  ml-2 flex  flex-col justify-between  items-end  h-fit  w-fit small:w-[543px] small-flex-grow-0  gap-16 border  rounded-2xl text-right larger:w-[295px] larger:justify-normal larger:flex-grow-0  larger:h-[390px] `}>
        <p className='mt-3 mr-5'>{name}</p>
        <div className=' flex-grow larger:flex-grow-0 max-[459px]:flex max-[459px]:flex-row max-[459px]:flex-wrap-reverse max-[459px]:justify-end w-full larger:flex larger:flex-col-reverse larger:self-center flex flex-row'>

            <Link onClick={()=>{dispatch(setWishlistClicked(true));
                dispatch(setProfileClicked(false));
                dispatch(setUserOrdersClicked(false));
            }} to="/profile/wishlist" className={`flex
            flex-grow items-center justify-center gap-4 text-sm h-[50px] larger:justify-end larger:flex-grow-0  larger:text-lg px-4.5 larger:h-[40px] larger:items-center    ${wishlistClicked&&'bg-[#5bb3ae] text-white'} `}>قائمة رغباتي <Hearticon/></Link>
            <div className=' flex flex-grow max-[459px]:flex larger:flex larger:flex-col-reverse ' >
            <Link onClick={()=>{dispatch(setWishlistClicked(false));
                dispatch(setProfileClicked(false));
                dispatch(setUserOrdersClicked(true));
            }} to="/profile/userorders" className={`flex flex-grow   justify-center items-center gap-4 text-sm px-4.5 h-[50px] flex-nowrap larger:justify-end  larger:flex-grow-0 larger:h-[40px] larger:text-lg larger:items-center  ${userOrdersClicked&&'bg-[#5bb3ae] text-white'}`}>طلباتي <PackageIcon/></Link>      
            <Link onClick={()=>{dispatch(setWishlistClicked(false));
                dispatch(setProfileClicked(true));
                dispatch(setUserOrdersClicked(false));;
            }} to="/profile/personalinfo" className={`${(profileClicked)&&'bg-[#5bb3ae] text-white'} flex justify-center  flex-grow gap-4 text-sm  px-4.5 h-[50px] items-center larger:text-lg  larger:justify-end larger:flex-grow-0 larger:h-[40px] larger:items-center`}>معلومات شخصية <Usericon/></Link>
            </div>
        </div>


    </div>
   </div> 
  )
}

export default Profilecard

