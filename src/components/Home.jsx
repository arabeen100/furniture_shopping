import React, { useEffect, useState } from 'react'
import { useGetCarouselsQuery,useGetTrendyQuery,useGetCategoriesQuery } from '@/features/api/apiSlice'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide}from "swiper/react"
import"swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination ,Autoplay} from 'swiper/modules';
import { HeartIcon ,ShoppingCartIcon } from 'lucide-react';
const Home = () => {
  const {data:carousels,isLoading,error}=useGetCarouselsQuery();
  const [limit,setLimit]=useState(25)
  const {data:trendy}=useGetTrendyQuery({limit});
  const {data:categories}=useGetCategoriesQuery();

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
  return (
    <div>
      <div >
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
       
        {trendy?.data?.products.map(product=>product.images.map(image=>
          <SwiperSlide className='w-[20vw] max-w-[300px] min-w-[172.5px]' key={image.id}>
           
            <div className='relative  bg-gray-200 flex flex-col w-full h-[260px] larger:h-[320px] large:h-[320px] xlarge:h-[320px]  rounded-[20px] '>
              <div className='w-9 h-9 rounded-full bg-white absolute grid place-content-center left-1.5 t.5'>
              <HeartIcon className=' size-4.5 '/>
              </div>
            <div className=' flex justify-center w-full h-[190px] larger:h-[250px] large:h-[250px] xlarge:h-[250px]'>  
            <img className=' rounded-t-[20px] h-full w-full object-center object-cover ' src={`${image.image_link}`} loading='lazy' />
            </div>
            <div className='bg-[#042e2e] w-full h-[70px] rounded-b-[20px]'>
             <p className='text-right text-white p-1 text-lg flex flex-row-reverse '>{product.name_ar.length>12?`...${product.name_ar.slice(0,12)}`:`${product.name_ar}`}
              <span className='absolute left-2 bottom-8 bg-[#5bb3ae] w-8 h-8 rounded-full grid place-content-center'> 
              <ShoppingCartIcon className='size-4.5'  />
              </span>
               </p>
             <p className='text-right text-white p-1 text-lg'>${product.price}</p>
             
            </div>
            </div>
          </SwiperSlide> ))}

        </Swiper>

      </div>
      <div className=' flex flex-col justify-center items-center gap-7 mt-15 mb-15 p-2 '>
        <p className='text-4xl text-center text-[#042e2e] ' >الفئات</p>
       {/*  {categories?.data?.categories.map((category,index)=>

        <div className='flex flex-col ' key={category.id}>
              <img className='scale-45' src={category.image_link} loading='lazy' alt='category'/>
              <p className='text-center mt-0'>{category.name_ar}</p>

        </div>
        )} */}
        <div className='grid grid-col-2 larg:grid-col-4 large:gap-2 larger:grid-cols-3 larger:gap-2' >
          
          <Link to='/categories/غرف النوم' className='larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw] w-[40vw] max-w-[300px] min-w-[172.5px] p-1'>
           <div className='w-full '>
            <img className='w-full h-full object-center object-cover' src={categories?.data?.categories?.[0].image_link} alt='category' loading='lazy'/>
           </div>
            <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{categories?.data?.categories?.[0].name_ar}</p>
          </Link>
          <Link to='/categories/مجالس' className= 'larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw]  w-[40vw] max-w-[300px] min-w-[172.5px]  p-1  '>
          <div className='w-full '>
            <img className='w-full h-full object-center object-cover' src={categories?.data?.categories?.[1].image_link} alt='category' loading='lazy'/>
           </div>
            <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{categories?.data?.categories?.[1].name_ar}</p>
          </Link>
          <Link to='/categories/مجامر' className=' larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw] w-[40vw] max-w-[300px] min-w-[172.5px]   p-1 '>
          <div className='w-full '>
            <img className='w-full h-full object-center object-cover' src={categories?.data?.categories?.[2].image_link} alt='category' loading='lazy'/>
            </div>
            <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{categories?.data?.categories?.[2].name_ar}</p>
          </Link>
          <Link to='/categories/ستائر' className='larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw]  w-[40vw] max-w-[300px] min-w-[172.5px]  p-1'>
          <div className='w-full '>
            <img className='w-full h-full object-center object-cover' src={categories?.data?.categories?.[3].image_link} alt='category' loading='lazy'/>
           </div>
            <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{categories?.data?.categories?.[3].name_ar}</p>
          </Link>
          <Link to='/categories/any' className='col-start-2 large:col-start-4 larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw]  w-[40vw] max-w-[300px] min-w-[172.5px]  p-1'>
           <div className='w-full  '>
            <img className='w-full h-full object-center object-cover' src={categories?.data?.categories?.[4].image_link} alt='category' loading='lazy'/>
           </div>
            <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e]'>{categories?.data?.categories?.[4].name_ar}</p>
          </Link>
        </div>
        <Link to="/categories" className='  text-xl text-white bg-[#042e2e] small:px-7 small:py-5 small:text-2xl py-2.5 px-5' >تسوق الان</Link>

      </div>
    </div>
  )
}

export default Home