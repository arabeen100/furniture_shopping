import React from 'react'
import Profilecard from './Profilecard'
import { setProfileClicked,setUserOrdersClicked,setWishlistClicked } from '@/features/sidebar/sidebarSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetUserOrdersQuery } from '@/features/api/apiSlice'
import { setOpenorder, setOrderId } from '@/features/checkout/checkout'
const Userorders = () => {
  const dispatch=useDispatch();
  const{data:orders}=useGetUserOrdersQuery();
    useEffect(()=>{
        dispatch(setProfileClicked(false));
        dispatch(setUserOrdersClicked(true));
        dispatch(setWishlistClicked(false));
    },[])
  return (
    <main className='w-full larger:w-full flex  small:w-fit px-3 mx-auto larger:justify-center  '>
    <div className=' w-full larger:w-[736px] larger:flex-grow-0 large:w-[960px] xlarge:w-[1168px]  justify-center   flex-grow  mt-9 flex flex-col  '>
      
      <p className='self-end text-4xl text-[#042e2e] mr-5 mb-9 '>ملفي الشخصي</p>
      <div  className='w-full larger:w-full  flex-grow flex flex-col larger:flex larger:flex-row-reverse larger:items-start xlarge:self-end'> 
      <Profilecard/>
      <div  className='self-end mt-5 mb-25 h-[542px] p-6 border rounded-lg mr-2 larger:flex-grow  overflow-y-auto larger:mt-0 flex flex-col gap-10'>
      {orders?.data?.orders?.map(order=>
        <div className='flex justify-between gap-5' key={order.ID}>
          <div onClick={()=>{
            dispatch(setOpenorder(true));
            dispatch(setOrderId(order.Order_ID));
          }} className='p-2 h-12 grid place-content-center border-black border-1 hover:text-white  hover:bg-[#5bb3ae] hover:border-[#5bb3ae] rounded-sm cursor-pointer text-center'>
            اعرض الطلب
          </div>
          <div className='flex flex-col items-end'>
            <p className='text-right'>{order.Order_ID}</p>
            {order.Status==="Processing"? <p>طلبك تحت المعالجة</p>:order.Status==="Cancelled"?<p>طلبك تم إلغاؤه</p>:<p>طلبك تم تسليمه</p>}
            <div className={` ${order.Status==="Processing"?"text-amber-400 bg-amber-50":order.Status==="Cancelled"?"bg-red-50 text-red-400":"bg-green-50 text-green-400"} grid  place-content-center w-30 p-1  rounded-xs `}>
              {order.Status==="Processing"? <p> تحت المعالجة</p>:order.Status==="Cancelled"?<p> ملغى</p>:<p> تم الإستلام</p>}
            </div>
          </div>

        </div>
      )}
      </div> 
      </div>
    </div>
    </main>
  )
}

export default Userorders