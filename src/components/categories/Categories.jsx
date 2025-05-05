import React from 'react'
import { useEffect } from 'react';
import { useGetCategoriesQuery } from '@/features/api/apiSlice'
import { Link } from 'react-router-dom';
import { setCategoryId } from '@/features/categoryproducts/catProducts';
import { useDispatch } from 'react-redux';
const Categories = () => {
  const dispatch=useDispatch();
  const {data:categories}=useGetCategoriesQuery();
    useEffect(()=>{
      if(categories){
        console.log(categories)
      }
  },[categories])
  return (
    <div className=' flex flex-col justify-center items-center gap-7 mt-15 mb-15 p-2 '>
        <p className='text-4xl text-center text-[#042e2e] ' >الفئات</p>
        <div className='flex flex-wrap justify-center'>
          {categories?.data?.categories.map((category)=>
            <Link onClick={()=>{dispatch(setCategoryId(category.id))}} key={category.id} to={`/categories/${category.name_ar}`} className={`larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw] w-[40vw] max-w-[300px] min-w-[167px] p-1 `}>
           
            <div className='w-full'>
             
             <img className='  w-full h-full object-center object-cover hover:brightness-50' src={category.image_link} alt='category' loading='lazy'/>
            </div>
             <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{category.name_ar}</p>
           </Link>
          )}
        </div>
        
    </div>
  )
}

export default Categories