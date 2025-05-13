import React from 'react'
import { useEffect } from 'react';
import { useGetCategoriesQuery } from '@/features/api/apiSlice'
import { Link } from 'react-router-dom';
import { setCategoryId } from '@/features/categoryproducts/catProducts';
import { useDispatch } from 'react-redux';
const Categories = () => {
  const dispatch=useDispatch();
  const {data:categories}=useGetCategoriesQuery();
  return (
    <main className=' flex flex-col justify-center items-center gap-7 mt-15 mb-15 p-2 '>
        <p className='text-4xl text-center text-[#042e2e] ' >الفئات</p>
        <section dir='rtl' className='  w-[75vw] large:max-w-[1000px] xlarge:max-w-[1100px] larger:w-[95%] min-w-[340px] grid grid-cols-2 gap-4
         larger:grid-cols-3
         large:grid-cols-4
         auto-rows-fr'>
          {categories?.data?.categories.map((category)=>
            <Link onClick={()=>{dispatch(setCategoryId(category.id))}} key={category.id} to={`/categories/${category.name_ar}`} className={`larger:min-w-[230px] larger:w-[30vw] large:w-[20vw] xlarge:w-[23vw] w-[36vw] max-w-[270px] min-w-[167px] p-1 `}>
           
            <div className='w-full'>
             
             <img className='  w-full h-full object-center object-cover hover:brightness-50' src={category.image_link} alt='category' loading='lazy'/>
            </div>
             <p className='text-lg text-white grid place-content-center w-full h-[50px] bg-[#042e2e] '>{category.name_ar}</p>
           </Link>
          )}
        </section>
        
    </main>
  )
}

export default Categories