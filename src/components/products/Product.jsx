import React, { useEffect, useState } from 'react'
import { HeartIcon,FacebookIcon,TwitterIcon,InstagramIcon,StarIcon } from 'lucide-react'
import { useAddProductToCartMutation, useGetProductQuery,useGetProductsQuery,useGetWishListQuery ,useAddProductToWishListMutation,useDeleteProductFromWishListMutation,useGetCartQuery} from '@/features/api/apiSlice'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setCount, setProductId, setSelectedColor, setSelectedSize } from '@/features/categoryproducts/catProducts'
import { useNavigate } from 'react-router-dom'
import { setError } from '@/features/login/login'
const Product = () => {
  const[err,setErr]=useState(false);
  const[status,setStatus]=useState(false);
  const[buyClick,setBuyClick]=useState(false);
  const{token}=useSelector((state)=>state.login)
  const[productAdded,setProductAdded]=useState({});
  const{data:cart}=useGetCartQuery(undefined,{skip:!token});
  const[finalLimit,setFinalLimit]=useState(0);
  const navigate=useNavigate();
  const[addStatus,setAddStatus]=useState(false);
    const[deleteStatus,setDeleteStatus]=useState(false);
  const[showMessage,setShowMessage]=useState(false)
    const [likedItems,setLikedItems]=useState({});
  const dispatch=useDispatch();
  const{name}=useParams();
  const{color,sort,size,limit,offset,minPriceP,maxPriceP,productId,count,selectedColor,selectedSize}=useSelector((state)=>state.catProducts);
   const{data:wishlistProducts}=useGetWishListQuery(undefined,{skip:!token});
    const[addProduct,{data:resp,isSuccess:success}]=useAddProductToWishListMutation();
     const[deleteProduct,{data:res,isSuccess:succ}]=useDeleteProductFromWishListMutation(); 
  const{data:products}=useGetProductsQuery({color:color,size:size,sort:sort,limit:limit,offset:offset,min_price:minPriceP,max_price:maxPriceP})
  useEffect(()=>{
    if(products){
      console.log(products)
      const matchedProduct=products?.data?.products?.find(product=>((product?.name_ar).trim())===name.trim())
      dispatch(setProductId(matchedProduct.id));
    }
},[products,name,dispatch])
const{data:product}=useGetProductQuery(productId,{skip:!productId});
const[addedProduct,{data:cartItems,isSuccess,isError}]=useAddProductToCartMutation();
const productt=product?.data?.product;
const firstColor=productt?.colors?.find((colour,index)=>index===0)
const firstSize=productt?.sizes?.find((sizee,index)=>index===0)
useEffect(()=>{
  if(product){
  dispatch(setSelectedColor(firstColor));
  dispatch(setSelectedSize(firstSize));}
},[product])
const[selectedColorId,setSelectedColorId]=useState(null);
const[selectedSizeId,setSelectedSizeId]=useState(null);
  useEffect(()=>{
    if(cart){
      console.log(cart);
      const productAdded=cart?.data?.cart_products?.find((product)=>(product.id===productId&& JSON.stringify(product.selectedColor)===JSON.stringify(selectedColor)&&JSON.stringify(product.selectedSize)===JSON.stringify(selectedSize)));
      setProductAdded(productAdded);
    }
  },[cart])
   useEffect(()=>{
      if(wishlistProducts?.data?.wishlist_products){
        setLikedItems(()=>
        wishlistProducts.data.wishlist_products.reduce((acc,wishlistProduct)=>({...acc,[wishlistProduct.id]:true}),{})
        )
     
      }
    },[wishlistProducts])
    useEffect(()=>{
      if(isError){
        setErr(true);
        setTimeout(()=>{
          setErr(false);
        },3500)
      }
    },[isError])
  useEffect(()=>{
    if(addStatus||deleteStatus||finalLimit||status||err){
     setShowMessage(true);
     const timer=setTimeout(()=>{
       setShowMessage(false);
    },3000)
   return ()=>clearTimeout(timer);
    }
},[addStatus,deleteStatus,finalLimit,status,err])
  useEffect(()=>{
    if(product){
      console.log(product)
    }
  },[product])
  useEffect(()=>{
    dispatch(setCount(1))
  },[name])
  useEffect(()=>{
    if(buyClick&&isSuccess){
      navigate("/orders/checkout")
      setBuyClick(false)
    }
  },[isSuccess,buyClick,cartItems])
  
  const handleAddToCart=async()=>{
      try {
        const response=await addedProduct({...productt,["selectedColor"]:selectedColor,["selectedSize"]:selectedSize,["quantity"]:count}).unwrap();
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
  const handleHeartIconClick=async(productId)=>{
    
      if(!likedItems[productId]){
        try {
          const response= await addProduct(productId).unwrap();
           if(response.status){
            setLikedItems((prev)=>({...prev,[productId]:true}))
             setAddStatus(true);
             setDeleteStatus(false);
           }
         } catch (e) {
           console.log(e?.data?.errors)
         }
        }else{
          try {
           const response=await deleteProduct(productId).unwrap();
           if(response.status){
            setLikedItems((prev)=>({...prev,[productId]:false}))
             setAddStatus(false);
             setDeleteStatus(true);
           }
          } catch (e) {
           console.log(e?.data?.errors)
          }
       }
      } 
  return (
    <div className='w-full flex flex-col gap-6'>
         <div className={` fixed z-30 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[300px]"}`}>
         {addStatus&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{resp?.data?.message}✔️</p>}
         {deleteStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{res?.data?.message }✔️</p>}
         {(finalLimit||err)&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>
         لقد نفذت الكمية ❌</p>}
         {status&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>
         تمت إضافة المنتج بنجاح✔️</p>}
        </div>
        <div className='w-full small:self-center small:w-fit large:w-[992px] xlarge:w-[1200px] flex flex-col gap-7 mb-15 large:flex large:flex-row-reverse large:items-start '>
          <div className='flex flex-col gap-7 '>
            <div className='flex justify-center'>
               <div className='  flex flex-col  w-[576px] h-[226px] larger:w-[768px] large:w-[492px] xlarge:w-[596px] larger:h-[422px] border mt-15'>
                <div className=' self-center h-full w-[224px] larger:w-[440px] '>
                    <img className='w-full h-full object-center object-cover' alt={productt?.name_ar} src={productt?.images?.[0]?.image_link}/>
                </div>
                </div>
             </div>
             <div className='self-end w-[150px] h-[146px] border grid place-content-center'>
              <div className='w-[112px] h-[112px] '>
                <img className='w-full h-full object-center object-cover' alt={productt?.name_ar} src={productt?.images?.[0]?.image_link}/>
              </div>
              </div>
            </div>
            <div className='flex flex-col gap-7 large:mt-13 '>
              <div className='text-right mr-4 text-[#042e2e] flex flex-col gap-4.5'>
                <p className='text-2xl'>{productt?.category?.name_ar}</p>
                <p className='text-3xl font-semibold'>{productt?.name_ar}</p>
                <div className='flex gap-7 justify-end'>
                  <p className='opacity-45'>5.0 (121 المراجعات)</p>
                  <p className='flex gap-0.5'>{[...Array(5)].map((_,i)=><StarIcon key={i} color='orange' fill='orange' size={20}/>)}</p>
                </div>
                <p className='text-lg'>${productt?.price}</p>
              </div>
              {productt?.sizes?.length>0&&<div className='text-right mr-4 flex flex-col gap-4 items-end' >
                <p className='text-xl'>الاحجام</p>
                <div className='flex flex-row-reverse flex-wrap  gap-4 '>
                {productt?.sizes?.map((sizee,index)=>
                <div onClick={()=>{
                  setSelectedSizeId(sizee.id);
                  dispatch(setSelectedSize(sizee));
                }} key={sizee.id} className={`cursor-pointer text-right text-black text-xs w-[120px] h-[70px] ${selectedSizeId===sizee.id&&"bg-[#51a5a1] text-white"} ${index===0&&!selectedSizeId&&"bg-[#51a5a1] text-white"} hover:shadow-lg rounded-sm flex flex-col justify-center items-end pr-2 `} >
                  <p className='flex gap-1 '><span>{sizee.value}</span><span>:الحجم</span></p>
                  <p>السعر :(${sizee.price})</p>

                </div>)}
                </div>
              </div>}
              <div className='text-right mr-4 flex flex-col gap-4'>
                <p className='text-xl'>ديكور</p>
                <div className='flex justify-end gap-1'>
                  <p className='text-xs'>{productt?.decor}</p>
                  <div className='w-5 h-5 rounded-full bg-[#51a5a1] grid place-content-center'><div className='w-1 h-1 rounded bg-white'></div></div>
                </div>
               </div>
               {productt?.colors?.length>0&&<div className='text-right mr-4 flex flex-col gap-4 items-end'>
                <p className='text-xl'>اللون</p>
                  <div className='flex flex-row-reverse gap-3'>
                  {productt?.colors?.map((colour,index)=>
                  <div key={colour.id}>
                    <div onClick={()=>{
                      setSelectedColorId(colour.id);
                      dispatch(setSelectedColor(colour));
                    }} className={`w-[40px] h-[40px] flex cursor-pointer ${selectedColorId===colour.id&&"border-4 w-[44px] h-[44px] border-[#51a5a1] rounded-sm"} ${index===0&&!selectedColorId&&"border-4 w-[44px] h-[44px] border-[#51a5a1] rounded-sm"} `}>
                   {colour.colors?.map((specificColor,index)=> <div key={index} className='w-full h-full ' style={{backgroundColor:specificColor,}}></div>)}
                   </div>
                  </div>
                   
                  )}
                  </div>
                 
              

               </div>}
               <div className='  mr-4 flex flex-row-reverse items-center justify-start flex-wrap gap-4.5 '>
                    <div className='flex justify-center items-center gap-5 h-[50px] w-[105px] border rounded-sm '>
                      <p className='cursor-pointer h-full text-lg grid place-content-center hover:bg-[#0000002c] hover:rounded-l-sm w-[50px] ' onClick={()=>{
                        if(count<productt?.count){dispatch(setCount(count+1));
                        setFinalLimit(0);
                      }else{setFinalLimit(finalLimit+1);
                        setTimeout(()=>{
                          setFinalLimit(0)
                        },3500)
                      }}}>+</p>
                      <p>{count}</p>
                      <p className='cursor-pointer h-full text-lg grid place-content-center hover:bg-[#0000002c] hover:rounded-r-sm w-[50px]'onClick={()=>{
                        if(count>1){dispatch(setCount(count-1));
                          setFinalLimit(0);
                        }}}>-</p>
                    </div>
                    <div className='flex flex-row-reverse gap-5.5 flex-wrap'>
                    <div onClick={()=>{
                      if(token){
                      handleAddToCart();
                    }else{
                        navigate("/auth/login");
                         dispatch(setError("يجب ان تسجل الدخول اولا"));
                      }
                    }} className='cursor-pointer w-[170px] h-[50px] rounded-sm text-white bg-[#51a5a1] grid place-content-center'>
                      <p>أضف للعربة</p>
                    </div>
                    <div onClick={()=>{
                      if(token){
                      setBuyClick(true)
                      handleAddToCart();
                      if(cartItems?.status){
                        navigate("/orders/checkout")
                      }}else{
                        navigate("/auth/login");
                         dispatch(setError("يجب ان تسجل الدخول اولا"));
                      }
                    }} className='cursor-pointer w-[170px] h-[50px] rounded-sm text-[#51a5a1] border-[#51a5a1] border-1 grid place-content-center '>
                    <p>اشترِ الآن</p>
                    </div>
                    </div>
                    {token&&<HeartIcon onClick={()=>{handleHeartIconClick(productt?.id)}} size={18} fill={`${(likedItems[productt?.id])?'red':'none'} `} color={`${(likedItems[productt?.id])?'red':'black'} `}/>}
                
                </div>
                <div className=' text-right mr-4 flex flex-col gap-4 items-end'>
                  <p className='text-xl'>نشر</p>
                  <div className='flex gap-3'>
                    <div className='w-[50px] h-[50px] border rounded-sm grid place-content-center'><InstagramIcon size={20} fill='#042e2e' color='white'/></div>
                    <div className='w-[50px] h-[50px] border rounded-sm grid place-content-center'><TwitterIcon size={20} fill='#042e2e' color='#042e2e' /></div>
                    <div className='w-[50px] h-[50px] border rounded-sm grid place-content-center'><FacebookIcon size={20} fill='#042e2e' color='#042e2e'/></div>
                  </div>
               </div>
               {productt?.description_ar&&<div className='
                text-right mr-4 flex flex-col gap-4 items-end'>
                <p className='text-xl text-[#51a5a1]'>وصف</p>
                <div className='mt-1 w-13 h-1 rounded-full bg-[#51a5a1]'></div>
                <p>{productt?.description_ar}</p>
               </div> }
            </div>

        </div>
      
     
       
      
      
    </div>
  )
}

export default Product