import React, { useEffect ,useState} from 'react'
import { Trash2Icon ,HouseIcon,SquarePenIcon} from 'lucide-react'
import { useGetCartQuery,useAddProductToCartMutation,useDeleteCartMutation, useGetCouponQuery,useGetAddressesQuery,useDeleteAddressMutation,useAddAddressMutation,useGetShippingPriceQuery ,useCheckOutMutation} from '@/features/api/apiSlice'
import { useSelector,useDispatch } from 'react-redux'
import { resetSum, setCoupon ,setError,setFinalTotal,setOpenEdit,setSelectedAddressId,setSum, setTotal} from '@/features/checkout/checkout'
import { useNavigate ,useLocation} from 'react-router-dom'
import paypal from "../../assets/paypal.webp"
import klarna from"../../assets/klarna.webp"
const Checkout = () => {
  const{pathname}=useLocation();
  const [addAddressStatus,setAddAddressStatus]=useState(false);
  const[products,setProducts]=useState([]);
  const [order,{data:checkout,isSuccess:Success}]=useCheckOutMutation();
  const {data:addresses}=useGetAddressesQuery();
  const[deliveryInfo,setDeliveryInfo]=useState("delivery");
  const[payment,setPayment]=useState("PayPal");
  const[latitude,setLatitude]=useState("");
  const[longitude,setLongitude]=useState("");
  const[deliverClick,setDeliverClick]=useState(true);
  const[pickupClick,setPickupClick]=useState(false);
  const[paypalClick,setPayPalClick]=useState(true);
  const[klarnaClick,setKlarnaClick]=useState(false); 
  const[choosenAddressLatitude,setChoosenAddressLatitude]=useState("");
  const[choosenAddressLongitude,setChoosenAddressLongitude]=useState(""); 
  const[shippingPrice,setShippingPrice]=useState(0); 
  const[firstPayment,setFirstPayment]=useState(false); 
  const[returnToCart,setReturnToCart]=useState(true);
  const[streetName,setStreetName]=useState(""); 
  const[selectedLocation,setSelectedLocation]=useState("Cairo,Egypt"); 
  const[buildingNumber,setBuildingNumber]=useState(""); 
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
  const{sum,coupon,total,location,finalTotal,selectedAddressId,editStatus}=useSelector((state)=>state.checkout)
  const{data:couponInfo,isError:isErr,isFetching,isSuccess,requestId}=useGetCouponQuery({coupon:coupon},{skip:!coupon||!applyClicked ,
    refetchOnMountOrArgChange:true,
  });
  const [count,setCount]=useState(0); 
  const{token}=useSelector((state)=>state.login)
  const{data:cart ,isLoading}=useGetCartQuery(undefined,{skip:!token})
  const[deleteAddress,{data:deleteaddr}]=useDeleteAddressMutation();
  const[addAddress,{data:addAddr}]=useAddAddressMutation();
  const{data:shipping}=useGetShippingPriceQuery();
  useEffect(()=>{
    if(shipping&&deliverClick){
      const R = 6371; 
      const toRad = angle => (angle * Math.PI) / 180;
      const dLat = toRad(shipping?.data?.[0]?.latitude - choosenAddressLatitude);
      const dLon = toRad(shipping?.data?.[0]?.longitude - choosenAddressLongitude);
      const a =
       Math.sin(dLat / 2) ** 2 +
       Math.cos(toRad(shipping?.data?.[0]?.latitude)) *
       Math.cos(toRad(choosenAddressLatitude)) *
       Math.sin(dLon / 2) ** 2;
       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
       const distance=R * c;
       setShippingPrice((distance* shipping?.data?.[0]?.shipping).toFixed(2))
    }
  },[shipping,choosenAddressLatitude,choosenAddressLongitude,deliverClick])
  const cartProducts=cart?.data?.cart_products;
  useEffect(()=>{
    const matchedLocation=location.find(location=>location.name===selectedLocation)
    setLatitude(matchedLocation.latitude);
    setLongitude(matchedLocation.longitude);
    
  },[selectedLocation])
  useEffect(()=>{
    if(addresses){
    const firstAddress=addresses?.data?.addresses?.find((address,index)=>index===0)
    setChoosenAddressLatitude(firstAddress?.latitude);
    setChoosenAddressLongitude(firstAddress?.longitude);
    dispatch(setSelectedAddressId(firstAddress?.id))
  }

  },[addresses])
  useEffect(()=>{
    window.scrollTo(0,0);
  },[firstPayment,returnToCart])
  useEffect(()=>{
    dispatch(resetSum());
    if(cartProducts){
      cartProducts.forEach(product=>{dispatch( setSum((Number(product.price)+(Number(product.selectedSize?.price)||0))*product.quantity))})
      dispatch(setError(""));
      const result=cartProducts?.reduce((acc,product)=>
      ([...acc,{["id"]:product.id,["selectedColor"]:product.selectedColor,["selectedSize"]:product.selectedSize,["quantity"]:product.quantity}]),[]
      )
      setProducts(result)
    }else{
      if(!isLoading){
      navigate("/")
      dispatch(setError("no cart found ❌"))
      setTimeout(()=>{
        dispatch(setError(""));
      },3500)}
    }
  },[cartProducts])
    useEffect(()=>{
      if(status||err||e||applyStatus||addAddressStatus||editStatus){
       setShowMessage(true);
       const timer=setTimeout(()=>{
         setShowMessage(false);
      },3000)
     return ()=>clearTimeout(timer);
      }
  },[status,err,e,applyStatus,addAddressStatus,editStatus])
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
  if(couponInfo&&applyClicked){
   dispatch(setTotal(sum*((100-couponInfo?.data?.value)/100))) ;
   dispatch(setFinalTotal((total+Number(shippingPrice))*((100-couponInfo?.data?.value)/100)))
  }else{
    dispatch(setTotal(sum));
    dispatch(setFinalTotal(total+Number(shippingPrice)))  
  }
 },[couponInfo,sum,total,shippingPrice,applyClicked])
 
useEffect(()=>{
  dispatch(setCoupon(""))
},[pathname])
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
const handleDeleteAddress=async(addressId)=>{
  try {
    const response= await deleteAddress(addressId).unwrap();
    
  } catch (e) {
    console.log(e?.data?.errors)
    
  }

}
const handleAddAddress=async (e)=>{
  e.preventDefault();
  try {
    const formData=new FormData();
    formData.append("latitude", latitude);
    formData.append("longitude",longitude);
    if(selectedLocation){
      formData.append("location",selectedLocation)
    }
    formData.append("street_name",streetName);
    formData.append("building_number",buildingNumber);
    const response =await addAddress(formData).unwrap();
    if(response.status){
      setAddAddressStatus(true);
      setTimeout(()=>{
        setAddAddressStatus(false)
      },3500)
    }
  } catch (e) {
    console.log(e?.data?.errors)
    
  }
}
const handleCheckout=async()=>{


  try {
    const formData=new FormData();
    formData.append("price",Number(total)||(Number(sum)));
    formData.append("delivery",deliveryInfo);
    formData.append("address",selectedAddressId);
    formData.append("shipping",Number(shippingPrice));
    formData.append("products",JSON.stringify(products));
    formData.append("payment_gate",payment);
    if(couponInfo&&!removeCoupon){
    formData.append("coupon",couponInfo?.data?.coupon);}
    const response=await order(formData).unwrap();
   
    if (response?.data?.payment_info?.payment_link) {
      window.open(response.data.payment_info.payment_link, '_blank');
      navigate('/');
      dispatch(setError("no cart found ❌"));
      setTimeout(() => {
        dispatch(setError(""));
      }, 3500);
    }
    if(cartProducts){
    cartProducts?.forEach(cart=>{
      deleteCart(cart.cart_id)
    }
    )}
     
    
    
  } catch (e) {
    console.log(e?.data?.errros);
    }
  }

  return (
   
    <main  className='w-full flex  justify-center  '>
           <div className={` fixed z-30 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[300px]"}`}>
         {err&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>
         لقد نفذت الكمية ❌</p>}
         {e&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>لم يتم العثور على كوبون ❌</p>}
         {status&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>
         تم تحديث العربه بنجاح✔️</p>}
         {applyStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>تم تطبيق الكوبون بنجاح ✔️</p>}
         {addAddressStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>تمت إضافة العنوان بنجاح✔️</p>}
         {editStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>تم تعديل العنوان بنجاح✔️</p>}
        </div>
      
      <div className=' w-[90vw] small:w-[576px] larger:w-[768px] large:w-[992px] xlarge:w-[1200px] flex  flex-col  gap-6   my-13 items-center ' >
      
      <p className='text-4xl self-end text-[#042e2e]'>الدفع</p>
      <div className={`${returnToCart?"block":"hidden"} flex  flex-col large:flex-row-reverse large:gap-5 large:items-start  items-end gap-23 w-full `}>
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
             <td className='flex-grow w-2/10 grid place-content-center whitespace-nowrap '>{(Number(product.price)+(Number(product.selectedSize?.price)||0)).toFixed(2)} $</td> 
             <td className='flex-grow flex  flex-row-reverse w-2/10 justify-center items-center gap-2 '>
               <p onClick={()=>{
                handleAddToCart(product,-1);
               }} className='cursor-pointer font-semibold text-lg'>-</p>
               <p>{product.quantity}</p>
               <p onClick={()=>{
                  handleAddToCart(product,1);
               }} className='cursor-pointer font-bold text-lg'>+</p>
               
             </td> 
             <td className=' flex-grow w-2/10 grid place-content-center  whitespace-nowrap'>{((Number(product.price)+(Number(product.selectedSize?.price)||0))*product.quantity).toFixed(2)} $</td> 
             <td className='flex-grow w-1/10 grid place-content-center  '><Trash2Icon className='cursor-pointer hover:opacity-80' onClick={()=>{
              deleteCart(product.cart_id);
             }} size={22} color='red' /></td> 
            </tr>)}
          </tbody>

         </table>
         </div>
         <div className='mr-5.5 large:ml-3 flex flex-col  gap-7 w-fit'>
           <div className='flex justify-between border-b pb-3 '>
            <p>${(sum).toFixed(2)}</p>
            <p>المجموع</p>
           </div>
           <div className={`${removeCoupon?"block":"hidden"} text-right `}>
            <p>أدخل رمز الخصم</p>
            <form onSubmit={(e)=>{e.preventDefault()}} className='flex mt-2'>
              <button onClick={()=>{
                setApplyClicked(true);
              
              }} className='cursor-pointer outline-0 p-4 bg-[#042e2e] text-white rounded-l-lg hover:opacity-90'>طبق</button>
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
            <button onClick={()=>{setRemoveCoupon(true);
              setApplyClicked(false)
            }
             
          } className='p-4 text-white rounded-lg outline-0 cursor-pointer bg-red-500 hover:opacity-90'>حذف</button>
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
            <button onClick={()=>{
              setFirstPayment(true);
              setReturnToCart(false);
            }} className=' cursor-pointer outline-0 text-white w-full bg-[#042e2e] h-15 grid place-content-center rounded-lg hover:opacity-90'>الذهاب للدفع</button>
           </div>
         </div>
      </div>
      <div className={`${firstPayment?"block":"hidden"} flex  flex-col large:flex-row-reverse large:justify-between large:items-baseline  items-end gap-7 w-full `}>
       <div className='w-full max-small:max-w-[370px] small:w-[422px] large:w-[708px] x-large:w-[715px] flex flex-col items-end gap-7 '> 
        <div className='w-full flex flex-col items-end gap-7'>
        <p className='text-4xl text-[#042e2e]'>عنوان الشحن</p>
        <div className='w-full'>
          <div className=' w-full flex flex-row-reverse'>
          <div className='bg-[#51a5a1] p-2.5 grid place-content-center rounded-md'><HouseIcon color='white' size={20} /></div>
          <div className='w-full flex-grow mb-3 border-b border-dashed'></div>
          </div>
          <p className='text-right'>العنوان</p>
        </div>


        </div>
        <div className='w-full flex flex-col gap-2 items-end '>
          <p className='text-2xl'>اختر كيف تستلم الطلب</p>
          <div className='w-full flex justify-between'>
            <p className='text-xl'>${deliverClick?shippingPrice:"--"}</p>
            <div onClick={()=>{
              setDeliverClick(true);
              setPickupClick(false);
              setDeliveryInfo("delivery")
            }} className='flex gap-2 items-center cursor-pointer'>
              <p className='text-xl'>توصيل</p>
              <div className={`border w-4 h-4 rounded-full ${deliverClick&&"bg-[#51a5a1]"} grid place-content-center`}><div className='w-1.5 h-1.5 rounded bg-white'></div></div>
            </div>
          
          </div>
          <div className='w-full flex justify-between'>
            <p className='text-xl'>$0</p>
            <div  onClick={()=>{
              setDeliverClick(false);
              setPickupClick(true);
              setDeliveryInfo("branch");
              setShippingPrice(0);
            }} className='flex gap-2 items-center cursor-pointer'>
              <p className='text-xl'>الاستلام من الفرع</p>
              <div className={`border w-4 h-4 rounded-full  ${pickupClick&&"bg-[#51a5a1]"} grid place-content-center`}><div className='w-1.5 h-1.5 rounded bg-white'></div></div>
            </div>
            

          </div>
        </div>
        <div className='w-full flex flex-col gap-2.5 items-end '>
          <p className='text-2xl'>اختر طريقة الدفع</p>
          <div onClick={()=>{
            setPayPalClick(true);
            setKlarnaClick(false);
            setPayment("PayPal")
          }} className='flex gap-2 items-center cursor-pointer'>
           <img alt='paypal' src={paypal} className='w-22 h-11'/>
           <div className={`border w-4 h-4 rounded-full ${paypalClick&&"bg-[#51a5a1]"} grid place-content-center`}><div className='w-1.5 h-1.5 rounded bg-white'></div></div>
          </div> 
          <div onClick={()=>{
            setPayPalClick(false);
            setKlarnaClick(true);
            setPayment("Klarna")
          }}  className='flex gap-2 items-center cursor-pointer'>
           <img alt='paypal' src={klarna} className='w-22 h-11'/>
           <div className={`border w-4 h-4 rounded-full ${klarnaClick&&"bg-[#51a5a1]"} grid place-content-center`}><div className='w-1.5 h-1.5 rounded bg-white'></div></div>
          </div> 
        </div>
        <div className={` ${addresses?.data?.addresses?.length>0?"block":"hidden"} ${deliverClick?"block":"hidden"} w-full flex flex-col gap-2.5 items-end `}>
          <p className='text-2xl'>اختر عنوان التوصيل</p>
          <div className=' flex flex-row-reverse justify-start flex-wrap  w-full gap-5'>
          {addresses?.data?.addresses?.map((address,index)=>
            <div  onClick={()=>{
              setChoosenAddressLatitude(address.latitude);
              setChoosenAddressLongitude(address.longitude);
              dispatch(setSelectedAddressId(address.id));
            }} className={`border shadow-sm rounded-sm py-4 pr-3 w-full small:w-[199.156px] large:w-[342.250px] xlarge:w-[344px] flex flex-col items-end text-right gap-3  ${selectedAddressId===address.id&&"border-1 border-[#51a5a1] text-[#51a5a1] bg-[#51a5a113]"} hover:border-1 hover:border-[#51a5a1] hover:text-[#51a5a1] hover:bg-[#51a5a113] cursor-pointer `}  key={address.id}>
              <p>{address.street_name}</p>
              <p>الموقع: {address.latitude}, {address.longitude}</p>
              <div className='flex justify-end gap-3'>
                <button onClick={()=>{handleDeleteAddress(address.id)}} className='flex items-center justify-center gap-1 p-2 outline-0 bg-red-100 text-red-500  rounded-sm cursor-pointer hover:opacity-80'>
                  <p>حذف</p>
                  <Trash2Icon color='red' size={16}/>
                  
                </button>
                <button onClick={()=>{
                  dispatch(setSelectedAddressId(address.id));
                  dispatch(setOpenEdit(true));
                }} className='flex items-center gap-1 outline-0 bg-gray-100 p-2 rounded-sm text-gray-800 cursor-pointer hover:opacity-80'>
                  <p>تعديل</p>
                  <SquarePenIcon size={16}/>
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
        <div className={`${deliverClick?"block":"hidden"} w-full flex flex-col gap-2.5 items-end `}>
        <p className='text-2xl'>أضف عنوانًا جديدًا</p>
        <form onSubmit={(e)=>{handleAddAddress(e);
        setStreetName("");
        setBuildingNumber("");
        setSelectedLocation("Cairo,Egypt");
        }} className='w-full flex flex-col gap-5'>
          <div className='w-full flex flex-col gap-1 text-right text-sm'>
          <label htmlFor='location'>الموقع</label>
          <select value={selectedLocation}
           onChange={(e)=>{setSelectedLocation(e.target.value)}}
           className='text-right outline-0 border rounded-sm py-3 px-2 shadow-xs  text-sm focus:border-2 focus:border-[#042e2e]  w-full' id='location' name='location'>
            {location.map(location=>
              <option onClick={()=>{setLatitude(location.latitude);
                setLongitude(location.longitude);
              }} value={location.name} key={location.id}>{location.name}</option>
            )}
          </select>
          </div>
          <div className='w-full flex flex-col gap-1 text-right text-sm'>
            <label htmlFor='streetName'>اسم الشارع</label>
            <input 
            className='w-full text-right outline-0 border rounded-sm px-2 py-3 shadow-xs  text-sm focus:border-2 focus:border-[#042e2e]  '
            required
            id='streetName'
            type='text'
            value={streetName}
            onChange={(e)=>{setStreetName(e.target.value)}}
            />
          </div>
          <div className='w-full flex flex-col gap-1 text-right text-sm'>
            <label htmlFor='buildingNumber'>رقم المبني</label>
            <input 
             className='w-full text-right outline-0 border rounded-sm px-2 py-3 shadow-xs  text-sm focus:border-2 focus:border-[#042e2e] '
            required
            id='buildingNumber'
            type='text'
            value={buildingNumber}
            onChange={(e)=>{setBuildingNumber(e.target.value)}}
            />
          </div>
          <button className='cursor-pointer outline-0 py-4 px-3 text-white bg-[#042e2e] rounded-md hover:opacity-90'>أضف عنوانًا جديدًا</button>
        </form>
        </div>
       </div> 
       <div className=' large:ml-3 mt-25 flex flex-col  gap-7 w-fit'>
           <div className='flex justify-between border-b pb-3 '>
            <p>${(sum+Number(shippingPrice)).toFixed(2)}</p>
            <p>المجموع</p>
           </div>
           <div className={`${removeCoupon?"block":"hidden"} text-right `}>
            <p>أدخل رمز الخصم</p>
            <form onSubmit={(e)=>{e.preventDefault()}} className='flex mt-2'>
              <button onClick={()=>{
                setApplyClicked(true);
              }} className='cursor-pointer outline-0 p-4 bg-[#042e2e] text-white rounded-l-lg hover:opacity-90'>طبق</button>
              <input className='text-right outline-0 border flex-grow w-48 h-15 focus:border-2 focus:border-[#042e2e] rounded-r-lg large:w-30 xlarge:w-60'
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
            <button onClick={()=>{setRemoveCoupon(true)
              setApplyClicked(false)
            }} className='p-4 text-white rounded-lg outline-0 cursor-pointer bg-red-500 hover:opacity-90'>حذف</button>
            <p className='text-green-500 whitespace-nowrap'>تم تطبيق الكوبون بنجاح</p>
           </div>
           <div className='w-full border-t pt-6' >
            <div className='mb-4 flex justify-between '>
            <div className='flex gap-3' >
            <p className={`${isSuccess&&!removeCoupon&&"line-through"}`} >${(sum+Number(shippingPrice)).toFixed(2)}</p>  
            <p className={`${isSuccess&&!removeCoupon?"block":"hidden"}`}>${finalTotal.toFixed(2)}</p> 
            </div>
            <p>المجموع الكلي</p>
            </div>
            <button onClick={handleCheckout} className=' cursor-pointer outline-0 text-white w-full bg-[#042e2e] h-15 grid place-content-center rounded-lg hover:opacity-90'>الدفع</button>
            
            <button onClick={()=>{
              setFirstPayment(false);
              setReturnToCart(true);
            }} className=' cursor-pointer outline-0 text-white w-full bg-[#042e2e] h-15 grid place-content-center rounded-lg mt-4 hover:opacity-90'>عد للعربة</button>
           </div>
       </div>
      </div>
      </div>
        
    </main>
  )
}

export default Checkout