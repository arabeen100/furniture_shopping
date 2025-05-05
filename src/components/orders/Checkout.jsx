import React, { useEffect ,useState} from 'react'
import { Trash2Icon ,HouseIcon} from 'lucide-react'
import { useGetCartQuery,useAddProductToCartMutation,useDeleteCartMutation, useGetCouponQuery } from '@/features/api/apiSlice'
import { useSelector,useDispatch } from 'react-redux'
import { resetSum, setCoupon ,setError,setSum, setTotal} from '@/features/checkout/checkout'
import { useNavigate } from 'react-router-dom'
const Checkout = () => {
  const[showMessage,setShowMessage]=useState(false);
  const[applyClicked,setApplyClicked]=useState(false);
  const[removeCoupon,setRemoveCoupon]=useState(true);
  const[applyStatus,setApplyStatus]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const[e,setE]=useState(false);
  const[err,setErr]=useState(false);
  const[status,setStatus]=useState(false);
  const[addedProduct,{data:cartItems,isError}]=useAddProductToCartMutation();
  const[deletedProduct,{data}]=useDeleteCartMutation();
  const{sum,coupon,total}=useSelector((state)=>state.checkout)
  const{data:couponInfo,isError:isErr,isFetching,isSuccess,requestId}=useGetCouponQuery({coupon:coupon},{skip:!coupon||!applyClicked ,
    refetchOnMountOrArgChange:true,
  });
  const [count,setCount]=useState(0); 
  const{token}=useSelector((state)=>state.login)
  const{data:cart ,isLoading}=useGetCartQuery(undefined,{skip:!token})
  const cartProducts=cart?.data?.cart_products;
  useEffect(()=>{
    dispatch(resetSum());
    if(cartProducts){
      cartProducts.forEach(product=>{dispatch( setSum(product.total))})
      dispatch(setError(""))
    }else{
      if(!isLoading){
      navigate("/")
      dispatch(setError("no cart found ❌"))
      setTimeout(()=>{
        dispatch(setError(""));
      },3500)}
    }
  },[cart])
    useEffect(()=>{
      if(status||err||e||applyStatus){
       setShowMessage(true);
       const timer=setTimeout(()=>{
         setShowMessage(false);
      },3000)
     return ()=>clearTimeout(timer);
      }
  },[status,err,e,applyStatus])
  useEffect(()=>{
    if(isError&&count===1){
      setErr(true);
      setTimeout(()=>{
        setErr(false);
      },3500)
    }
  },[isError,count])
  useEffect(()=>{
    if(isErr){
      setE(true);
      setTimeout(()=>{
        setE(false);
      },3500)
    }
  },[isErr])
  useEffect(()=>{
    if(isSuccess&&!isFetching&&requestId){
      setApplyStatus(true);
      setTimeout(()=>{
        setApplyStatus(false);
      },3500)
      setRemoveCoupon(false);
    
    }
   
  },[isFetching,isSuccess,requestId])
 useEffect(()=>{
  if(couponInfo){
   dispatch(setTotal(sum*((100-couponInfo?.data?.value)/100))) 
  }
 },[couponInfo,sum])
 

  const handleAddToCart=async(selectedCart,count)=>{
    setCount(count)
    try {
      const response=await addedProduct({...selectedCart,["quantity"]:count}).unwrap();
      if(response.status){
        setStatus(true);
        setTimeout(()=>{
          setStatus(false);
        },3500)
      } 


    } catch (e) {
      console.log(e?.data?.errros);
      
    }
}
const deleteCart=async(cartId)=>{
   try {
     const response=await deletedProduct(cartId).unwrap();
     if(response.status){
      setStatus(true);
      setTimeout(()=>{
        setStatus(false);
      },3500)
    }

   } catch (e) {
    console.log(e?.data?.errors)
   }

}
  return (
   
    <div  className='w-full flex  justify-center  '>
           <div className={` fixed z-30 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[300px]"}`}>
         {err&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>
         لقد نفذت الكمية ❌</p>}
         {e&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>لم يتم العثور على كوبون ❌</p>}
         {status&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>
         تم تحديث العربه بنجاح✔️</p>}
         {applyStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>تم تطبيق الكوبون بنجاح ✔️</p>}
        </div>
      
      <div className=' w-[90vw] small:w-[576px] larger:w-[768px] large:w-[992px] xlarge:w-[1200px] flex  flex-col  gap-6   my-13 items-center' >
      
      <p className='text-4xl self-end text-[#042e2e]'>الدفع</p>
      {<div className='flex  flex-col large:flex-row-reverse large:gap-5 large:items-start  items-end gap-23 w-full '>
        <div className='w-full  flex'>
         <table className='w-full  flex-grow table-fixed flex flex-col gap-5  '>
          <thead className='w-full flex-grow '>
            <tr className='w-full flex-grow gap-9.5 flex-row-reverse flex justify-start border-b pb-3 '>
              <th className=' flex-grow w-3/10 '>المنتجات</th>
              <th className='flex-grow w-2/10'>السعر</th>
              <th className='flex-grow w-2/10 '>الكمية</th>
              <th className='flex-grow w-2/10'>المجموع</th>
              <th className='flex-grow w-1/10'></th>
              
            </tr>
          </thead>
          <tbody className='w-full flex-grow flex flex-col gap-5 '>
            {cart?.data?.cart_products?.map(product=><tr className="w-full flex-grow flex flex-row-reverse justify-start border-b pb-3  " key={product.id}>
             <td className='ml-2 flex-grow w-3/10 flex flex-row-reverse justify-start items-center gap-1'>
               <div className='flex-grow max-w-26 grid place-content-center  border p-2 rounded-sm'>
                <div className='flex-grow  max-w-24 h-24'>
                <img src={product.images?.[0]?.image_link} alt={product.name_ar} className='w-full h-full object-center object-cover '/>
                </div>
               </div>
               <div  className='flex flex-col gap-3 items-end'>
                <p className='text-xs'>{product.name_ar}</p>
                {product.selectedColor&&<div className='flex flex-row-reverse items-center self-end text-xs'>
                  <p>:اللون</p>
                  <div className='flex '>
                    {product.selectedColor?.colors?.map((specificColor,index)=><div key={index} style={{backgroundColor:specificColor}} className='w-[12px] h-[25px]'>
                      </div>)}
                  </div>
                
                </div>}
                {product?.selectedSize&&<div className='flex flex-row-reverse items-center text-xs '>
                  <p>:الحجم</p>
                  <p>{product.selectedSize?.value}</p>
                 </div>}
               </div>
             </td> 
             <td className='flex-grow w-2/10 grid place-content-center whitespace-nowrap '>{product.price} $</td> 
             <td className='flex-grow flex  flex-row-reverse w-2/10 justify-center items-center gap-2 '>
               <p onClick={()=>{
                handleAddToCart(product,-1);
               }} className='cursor-pointer font-semibold text-lg'>-</p>
               <p>{product.quantity}</p>
               <p onClick={()=>{
                  handleAddToCart(product,1);
               }} className='cursor-pointer font-bold text-lg'>+</p>
               
             </td> 
             <td className=' flex-grow w-2/10 grid place-content-center  whitespace-nowrap '>{product.total} $</td> 
             <td className='flex-grow w-1/10 grid place-content-center '><Trash2Icon className='cursor-pointer' onClick={()=>{
              deleteCart(product.cart_id);
             }} size={22} color='red' /></td> 
            </tr>)}
          </tbody>

         </table>
         </div>
         <div className='mr-5.5 large:ml-3 flex flex-col  gap-7 w-fit'>
           <div className='flex justify-between border-b pb-3 '>
            <p>${sum.toFixed(2)}</p>
            <p>المجموع</p>
           </div>
           <div className={`${removeCoupon?"block":"hidden"} text-right `}>
            <p>أدخل رمز الخصم</p>
            <form onSubmit={(e)=>{e.preventDefault()}} className='flex mt-2'>
              <button onClick={()=>{
                setApplyClicked(true);
                  setTimeout(()=>{
                  setApplyClicked(false)
                },500) 
              
              }} className='cursor-pointer outline-0 p-4 bg-[#042e2e] text-white rounded-l-lg'>طبق</button>
              <input className='text-right outline-0 border w-48 h-15 focus:border-2 focus:border-[#042e2e] rounded-r-lg large:w-30 xlarge:w-60'
              type='text'
              value={coupon}
              onChange={(e)=>{
                dispatch(setCoupon(e.target.value));
                setApplyClicked(false) ;
              }}
              />
            </form>
           </div>
          <div className={`${!removeCoupon?"flex": "hidden"} mt-5.5 justify-between items-center gap-9.5 large:gap-20`}>
            <button onClick={()=>{setRemoveCoupon(true)}} className='p-4 text-white rounded-lg outline-0 cursor-pointer bg-red-500'>حذف</button>
            <p className='text-green-500 whitespace-nowrap'>تم تطبيق الكوبون بنجاح</p>
           </div>
           <div className='w-full border-t pt-6' >
            <div className='mb-4 flex justify-between '>
            <div className='flex gap-3' >
            <p className={`${isSuccess&&!removeCoupon&&"line-through"}`} >${sum.toFixed(2)}</p>  
            <p className={`${isSuccess&&!removeCoupon?"block":"hidden"}`}>${total.toFixed(2)}</p> 
            </div>
            <p>المجموع الكلي</p>
            </div>
            <button className=' cursor-pointer outline-0 text-white w-full bg-[#042e2e] h-15 grid place-content-center rounded-lg'>الذهاب للدفع</button>
           </div>
         </div>
      </div>}
      {<div className='flex  flex-col large:flex-row-reverse large:gap-5 large:items-start  items-end gap-23 w-full '>
        <div className='flex flex-col items-end gap-7'>
        <p className='text-4xl text-[#042e2e]'>عنوان الشحن</p>
        <div>
          <div className='flex flex-row-reverse'>
          <div className='bg-[#51a5a1] p-2.5 grid place-content-center rounded-md'><HouseIcon color='white' size={20} /></div>
          <div className='w-100 mb-3 border-b border-dashed'></div>
          </div>
          <p className='text-right'>العنوان</p>
        </div>


        </div>
      </div>}
      </div>
        
    </div>
  )
}

export default Checkout