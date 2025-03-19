import {Phoneicon, Plusmarkicon } from '@/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setButtonClicked } from '@/features/plusButton/plusButton'
import { Link } from 'react-router-dom'
const Plusbutton = () => {
   const{buttonClicked}=useSelector((state)=>state.plusButton)
   const dispatch=useDispatch();
  return (
    <div className=' plusButton flex gap-7  w-fit'>
        <div className='w-14 grid place-content-center  '>
           <div  onClick={()=>{dispatch(setButtonClicked())}} className={` fixed z-50 bottom-10 ${buttonClicked&&"bottom-23"} left-4 cursor-pointer size-13 hover:scale-115  transition-all duration-300 rounded-full bg-[#5bb3ae] grid place-content-center`}><Plusmarkicon/></div>
        </div>
        <div className={` ${!buttonClicked&&"hidden"}  w-fit transition-all duration-600 `}>
            <Link to="/contactUs" onClick={()=>{dispatch(setButtonClicked())}}  className=' cursor-pointer w-fit'>
                <div   className=' cursor-pointer fixed  z-50 bottom-40 grid place-content-center size-13 transition-all duration-300 hover:scale-115  border-1 border-[#5bb3ae] rounded-full'><Phoneicon/></div>
                <p className='fixed bottom-32 left-20 text-[#042e2e]'>اتصل بنا</p>
            </Link>
            <Link  to='/FAQ' onClick={()=>{dispatch(setButtonClicked())}} className=' cursor-pointer w-fit '>
                <div className=' fixed z-50 bottom-10 grid place-content-center size-13 hover:scale-115 transition-all duration-300 border-1 border-[#5bb3ae] rounded-full text-lg text-[#5bb3ae]  font-extrabold'>?</div>
                <p className='fixed bottom-3 left-23.5 text-[#042e2e]'>FAQ</p>
            </Link>
        </div>
    </div>
  )
}

export default Plusbutton