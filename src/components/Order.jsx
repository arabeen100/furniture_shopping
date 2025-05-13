import React ,{useEffect}from 'react'
import { XIcon } from 'lucide-react'
import { useDispatch,useSelector } from 'react-redux'
import { setOpenorder } from '@/features/checkout/checkout'
import { useGetUserOrdersQuery } from '@/features/api/apiSlice'
const Order = () => {
  const{data:orders}=useGetUserOrdersQuery();

  const{openOrder,orderId}=useSelector((state)=>state.checkout);
  const dispatch=useDispatch();
  const matchedOrder=orders?.data?.orders?.find(order=>order.Order_ID===orderId)
  useEffect(()=>{
              if(openOrder){
                document.body.classList.add("overflow-hidden");
              }else{
                document.body.classList.remove("overflow-hidden");
              }
              return ()=>{
                document.body.classList.remove("overflow-hidden");
              }
          
            },[openOrder])
  return (
     <div className='w-[97%]  max-h-[90%] bg-white fixed z-60 top-5 left-[1.5%] right-[1.5%]  mx-auto  shadow-2xl border rounded-[8px] flex flex-col  items-center overflow-y-auto'>
        <button className='cursor-pointer  absolute right-3  top-3' onClick={()=>dispatch(setOpenorder(false))}><XIcon size={18}/></button>
        <div className='w-[92%] large:w-[78%] flex flex-col items-end gap-10 mt-15 mb-15'>
          <div className='w-full flex flex-col gap-20'>
            {matchedOrder.Products?.map(product=>
                <div className='w-full flex flex-col items-end gap-4' key={product.ID}>
                    <div className='w-full flex justify-between'>
                    <p className='font-semibold text-lg'>{(Number(product.Total)+((Number(JSON.parse(product.Size)?.price)||0)*Number( product.Count)))}$</p>
                    <div className='flex gap-4'>
                    <div className='flex flex-col items-end'>
                        <p>{product.Product?.name_ar}</p>
                       {product.Size&& <p className='flex '><span>{JSON.parse(product.Size)?.value}</span><span>:الحجم</span></p>}
                        {product.Color&&<div className='flex gap-2 justify-end'>
                            <div className='flex'>
                                {JSON.parse(product.Color)?.colors.map((specificColor,index)=>
                                    <div  key={index}>
                                      <div className='w-[22px] h-[22px] ' style={{backgroundColor:specificColor,}}></div>
                                    </div>
                                )}
                            </div>
                            <p>: اللون</p>

                        </div>}
                        <p>{product.Count}:الكمية</p>
                    </div>
                    <img alt={product.Product?.name_ar} src={product.Product?.image} loading='lazy' className='w-[112px] h-[112px]'/>
                    </div>
                    </div>
                    <div className='flex gap-4 justify-end '>
                    {matchedOrder.Status==="Processing"? <p>طلبك تحت المعالجة</p>:matchedOrder.Status==="Cancelled"?<p>طلبك تم إلغاؤه</p>:<p>طلبك تم تسليمه</p>}
                    <div className={` ${matchedOrder.Status==="Processing"?"text-amber-400 bg-amber-100":matchedOrder.Status==="Cancelled"?"bg-red-100 text-red-400":"bg-green-100 text-green-400"} grid  place-content-center w-30 p-1  rounded-xs  text-lg`}>
                    {matchedOrder.Status==="Processing"? <p> تحت المعالجة</p>:matchedOrder.Status==="Cancelled"?<p> ملغى</p>:<p> تم الإستلام</p>}
                   </div>
                   </div>
                   <hr className='w-full'/>
                   
                </div>
                
            )}
          </div>
        
          

        </div>

    </div>
  )
}

export default Order