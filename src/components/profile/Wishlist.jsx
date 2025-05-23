import React from 'react'
import Profilecard from './Profilecard'
import { setProfileClicked,setUserOrdersClicked,setWishlistClicked } from '@/features/sidebar/sidebarSlice'
import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDeleteProductFromWishListMutation, useGetWishListQuery } from '@/features/api/apiSlice'
import { HeartIcon,ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { setItem, setToken } from '@/features/login/login'
import { setOpenAddition } from '@/features/addition/addition'
import { setProductId } from '@/features/categoryproducts/catProducts'
const Wishlist = () => {
 
 const{data:wishlistProducts,error}=useGetWishListQuery();


 const[deleteProduct,{data:res,isSuccess:succ}]=useDeleteProductFromWishListMutation(); 
  const[showMessage,setShowMessage]=useState(false)
  const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setProfileClicked(false));
        dispatch(setUserOrdersClicked(false));
        dispatch(setWishlistClicked(true))
    },[])
     useEffect(()=>{
                if(succ){
                 setShowMessage(true);
                 const timer=setTimeout(()=>{
                   setShowMessage(false);
                },3000)
               return ()=>clearTimeout(timer);
                }
          },[succ])
    useEffect(()=>{
      if(!wishlistProducts){
      
        if(error){
          dispatch(setToken(""));
          dispatch(setItem());
          navigate("/auth/login");
        }
      }
    },[wishlistProducts])
    const handleDeleteWishlistProduct=async(productId)=>{
        try {
         await deleteProduct(productId).unwrap();
        } catch (e) {
         console.log(e?.data?.errors)
        }
     }
  return (
    <main className='w-full larger:w-full flex  small:w-fit px-3 mx-auto larger:justify-center  '>
      <div  className=' w-full larger:w-[736px] larger:flex-grow-0 large:w-[960px] xlarge:w-[1168px]  justify-center   flex-grow  mt-9 flex flex-col  '>
      <div className={` fixed z-30 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[150px]"}`}>
         {succ &&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{res?.data?.message}✔️</p>}
      </div>
      <p className='self-end text-4xl text-[#042e2e] mr-5 mb-9 '>ملفي الشخصي</p>
      <div className='w-full larger:w-full  flex-grow flex flex-col larger:flex larger:flex-row-reverse larger:items-start xlarge:self-end'> 
      <Profilecard/>
      {wishlistProducts?.data?.wishlist_products&&<div className='small:w-[543px] flex  flex-wrap  justify-end gap-5 mt-4  mb-20 larger:flex-grow larger:mt-0'>
      {wishlistProducts?.data?.wishlist_products?.map(wishlistProduct=>
          <div key={wishlistProduct.id} className='relative bg-gray-200 flex flex-col larger:w-[230.922px]  large:w-[222.844px]  w-[200px]  h-[260px] larger:h-[320px] large:h-[320px]  rounded-[20px] '>
          <div onClick={()=>{handleDeleteWishlistProduct(wishlistProduct.id)}}  className=' cursor-pointer w-9 h-9 rounded-full bg-white absolute grid place-content-center left-1.5 t.5'>
          <HeartIcon fill={`red`} color={`red`} className={` size-4.5 `}/>
          </div>
        <Link to={`/products/${wishlistProduct.name_ar}`} className=' flex justify-center w-full h-[190px] larger:h-[250px] large:h-[250px] xlarge:h-[250px]'>  
        <img  className=' rounded-t-[20px] h-full w-full object-center object-cover ' src={`${wishlistProduct.images?.[0]?.image_link}`} loading='lazy' />
        </Link>
        <div className='bg-[#042e2e] w-full h-[70px] rounded-b-[20px]'>
         <p className='text-right text-white p-1 text-lg flex flex-row-reverse '>{wishlistProduct.name_ar.length>12?`...${wishlistProduct.name_ar.slice(0,12)}`:`${wishlistProduct.name_ar}`}
          <span  onClick={()=>{
                   dispatch(setOpenAddition(true));
                   dispatch(setProductId(wishlistProduct.id))
                }} className='cursor-pointer absolute left-2 bottom-8 bg-[#5bb3ae] w-8 h-8 rounded-full grid place-content-center hover:brightness-80 '> 
          <ShoppingCartIcon className='size-4.5'  />
          </span>
           </p>
         <p className='text-right text-white p-1 text-lg'>${wishlistProduct.price}</p>
         
        </div>
        </div>
      )}
      </div>}
      {wishlistProducts?.data?.message&&<p className='text-right mt-5 mb-25 mr-2 font-semibold '>Empty wishlist.</p>}
      </div>
    
    </div>
    </main>
  )
}

export default Wishlist