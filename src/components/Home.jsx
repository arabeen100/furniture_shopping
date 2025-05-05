import React, { useEffect, useRef, useState } from 'react'
import { useGetCarouselsQuery,useGetTrendyQuery,useGetCategoriesQuery,useAddProductToWishListMutation,useDeleteProductFromWishListMutation ,useGetWishListQuery} from '@/features/api/apiSlice'
import { Link,useNavigate } from 'react-router-dom'
import {Swiper,SwiperSlide}from "swiper/react"
import"swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination ,Autoplay} from 'swiper/modules';
import { HeartIcon ,ShoppingCartIcon } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux'
import { setError } from '@/features/login/login'
const Home = () => {
  const{token}=useSelector((state)=>state.login);
  const{error}=useSelector((state)=>state.checkout)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {data:carousels,isLoading}=useGetCarouselsQuery();
  const[addStatus,setAddStatus]=useState(false);
  const[deleteStatus,setDeleteStatus]=useState(false);
  const [limit,setLimit]=useState(25);
   const[showMessage,setShowMessage]=useState(false)
  const [likedItems,setLikedItems]=useState({});
  const {data:trendy}=useGetTrendyQuery({limit:limit});
  const {data:categories}=useGetCategoriesQuery();
 const[addProduct,{data:resp,isSuccess:success}]=useAddProductToWishListMutation();
  const[deleteProduct,{data:res,isSuccess:succ}]=useDeleteProductFromWishListMutation(); 
  const{data:wishlistProducts}=useGetWishListQuery(undefined,{skip:!token});
  useEffect(()=>{
    if(wishlistProducts?.data?.wishlist_products){
      setLikedItems(()=>
      wishlistProducts.data.wishlist_products.reduce((acc,wishlistProduct)=>({...acc,[wishlistProduct.id]:true}),{})
      )
   
    }
  },[wishlistProducts])
   useEffect(()=>{
            if(addStatus||deleteStatus||error){
             setShowMessage(true);
             const timer=setTimeout(()=>{
               setShowMessage(false);
            },3000)
           return ()=>clearTimeout(timer);
            }
      },[addStatus,deleteStatus,error])
  useEffect(()=>{
      if(carousels){
        console.log(carousels)
      }
  },[carousels])
  useEffect(()=>{
    if(categories){
      console.log(categories)
    }
},[categories])
  useEffect(()=>{
    if(trendy){
      console.log(trendy)
    }
},[trendy])
useEffect(()=>{
  if(wishlistProducts){
    console.log(wishlistProducts)
  }
},[wishlistProducts])
const handleHeartIconClick=async(productId)=>{
  if(token){
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
     }}else{
      navigate('/auth/login');
       dispatch(setError("يجب ان تسجل الدخول اولا"));
     }
    
    } 
  return (
    <div>
      <div >
      <div className={` fixed z-30 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[250px]"}`}>
         {addStatus&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{resp?.data?.message}✔️</p>}
         {deleteStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{res?.data?.message }✔️</p>}
         {error&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{error}</p>}
      </div>
        <Swiper modules={[Navigation,Pagination,Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{delay:3000,disableOnInteraction:false}}
        speed={1000}
        navigation
        pagination={{clickable:true}}
        
        >
        {carousels?.data?.carousels.map(carousel=>
          <SwiperSlide  key={carousel.id}>
          <div className='w-full h-full bg-[#00000070] fixed z-20'></div>
          <div className='w-full h-[366.844px] small:h-[466.109px]  larger:h-[530px] large:h-[585px] xlarge:h-[585px] min-[2000px]:h-[885px]'>
            <img className='w-full h-full object-center object-cover'  src={`${carousel.image_link}`} loading='lazy' />
          </div>
          </SwiperSlide> )}
        </Swiper>

      </div>
      <div className='mt-15 mb-15 p-2'>
        <p className='text-4xl text-center text-[#042e2e] mb-12' >منتجات رائجة لأجلك</p>
        <Swiper modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{768:{slidesPerView:3,spaceBetween:70,},
                      1200:{slidesPerView:4,spaceBetween:70} ,
      }}
        loop={true}
        navigation
        className='w-[75vw] xlarge:w-[95%] large:w-[95%] large:max-w-[1000px] xlarge:max-w-[1100px] larger:w-[95%] min-w-[360px]'
        >
       
        {trendy?.data?.products?.map(product=>
          <SwiperSlide className='w-[20vw] max-w-[300px] min-w-[172.5px]' key={product.id}>
           
            <div className='relative  bg-gray-200 flex flex-col w-full h-[260px] larger:h-[320px] large:h-[320px] xlarge:h-[320px]  rounded-[20px] '>
              <div onClick={()=>{handleHeartIconClick(product.id)}}  className=' cursor-pointer w-9 h-9 rounded-full bg-white absolute grid place-content-center left-1.5 t.5'>
              <HeartIcon fill={`${(likedItems[product.id])?'red':'none'} `} color={`${(likedItems[product.id])?'red':'black'} `} className={` size-4.5 `}/>
              </div>
            <Link to={`/products/${product.name_ar}`} className=' flex justify-center w-full h-[190px] larger:h-[250px] large:h-[250px] xlarge:h-[250px]'>  
            <img className=' rounded-t-[20px] h-full w-full object-center object-cover ' alt='product' src={`${product.images?.[0]?.image_link}`} loading='lazy' />
            </Link>
            <div className='bg-[#042e2e] w-full h-[70px] rounded-b-[20px]'>
             <p className='text-right text-white p-1 text-lg flex flex-row-reverse '>{product.name_ar.length>12?`...${product.name_ar.slice(0,12)}`:`${product.name_ar}`}
              <span className='cursor-pointer absolute left-2 bottom-8 bg-[#5bb3ae] w-8 h-8 rounded-full grid place-content-center'> 
              <ShoppingCartIcon className='size-4.5'  />
              </span>
               </p>
             <p className='text-right text-white p-1 text-lg'>${product.price}</p>
             
            </div>
            </div>
          </SwiperSlide> )}

        </Swiper>

      </div>
      <div className=' flex flex-col justify-center items-center gap-7 mt-15 mb-15 p-2 '>
        <p className='text-4xl text-center text-[#042e2e] ' >الفئات</p>
        <div  className='flex justify-center flex-wrap gap-1.5'>
          {categories?.data?.categories?.map(category=>
            <Link className='larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw] w-[40vw] max-w-[300px] min-w-[172.5px] p-1 ' key={category.id} to={`/categories/${category.name_ar}`}>
            <div className='w-full'>
            <img className='  w-full h-full object-center object-cover hover:brightness-50' src={category.image_link} alt='category' loading='lazy'/>
           </div>
            <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{category.name_ar}</p>
              
            </Link>
          )}
          
    
        </div>
        <Link to="/categories" className='  text-xl text-white bg-[#042e2e] small:px-7 small:py-5 small:text-2xl py-2.5 px-5' >تسوق الان</Link>

      </div>
    </div>
  )
}

export default Home