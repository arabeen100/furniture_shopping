import React ,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { XIcon,ChevronUpIcon } from 'lucide-react'
import { setExpandedMenu } from '@/features/sidebar/sidebarSlice'
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import "rc-slider/assets/index.css";
import { setCategoryId,setColor, setMaxPriceP, setMinPriceP, setSize ,setLimit,setOffset,setSort, setCatMenuClicked1, setCatMenuClicked2, setCatMenuClicked3, setCatMenuClicked4, setSelectedSizeId,setSelectedColorId,setMinPrice,setMaxPrice} from '@/features/categoryproducts/catProducts';
import { useGetCategoryProductsQuery,useGetCategoriesQuery } from '@/features/api/apiSlice';
const Categoriesmenu = () => {
  const {data:categories}=useGetCategoriesQuery();
    const{color,sort,size,limit,offset,minPriceP,maxPriceP,categoryId,catMenuClicked1,catMenuClicked2,catMenuClicked3,catMenuClicked4,selectedSizeId,selectedColorId,minPrice,maxPrice,min,max}=useSelector((state)=>state.catProducts)
    const{data:categoryProducts}=useGetCategoryProductsQuery({categoryId:categoryId,color:color,size:size,sort:sort,limit:limit,offset:offset,min_price:minPriceP,max_price:maxPriceP},{skip:!categoryId,
    });
  const{expandedMenu}=useSelector((state)=>state.sidebar)
  const dispatch=useDispatch();
   useEffect(()=>{
            if(expandedMenu){
              document.body.classList.add("overflow-hidden");
            }else{
              document.body.classList.remove("overflow-hidden");
            }
            return ()=>{
              document.body.classList.remove("overflow-hidden");
            }
        
          },[expandedMenu])            
  return (
    <div className={`${expandedMenu&&"w-full h-full bg-[#00000070] fixed z-20"}`}>
    <div  onClick={(e)=>e.stopPropagation()} className={`h-full flex justify-center bg-white  transition-all overflow-y-auto duration-300  fixed left-0  z-30 w-[300px] ${expandedMenu ? " translate-x-0" : " -translate-x-full"}`}>
      <div className='w-[95%] flex flex-col h-fit pb-8'>
       <div>
      <XIcon onClick={()=>{dispatch(setExpandedMenu())}} size={21} className='cursor-pointer mt-6 ml-4.5 '/>
      </div> 
      <div className={`flex flex-col gap-5 text-lg mt-6 `}>
        <div onClick={()=>{dispatch(setCatMenuClicked1(!catMenuClicked1))}} className='flex justify-between cursor-pointer'>
         <ChevronUpIcon className={`transition-all duration-300 ${catMenuClicked1?"rotate-180":"rotate-0"}`}  size={20}/>
         <p>فئات</p>
        </div>
        <div className={`flex flex-col gap-5 ${catMenuClicked1?"max-h-0 opacity-0  pointer-events-none":"max-h-fit opacity-100 pointer-events-auto"} transition-all `}>
           {categories?.data?.categories?.map(category=>
                  <div key={category.id} className={`flex justify-between`}>
                    <p>{category.total_category_products}</p>
                    <Link to={`/categories/${category.name_ar}`}>{category.name_ar}</Link>
                  </div>  
                )}
        </div>
      </div>
     {min<max&&<div className='flex flex-col gap-5 mt-8'>
      <div onClick={()=>{dispatch(setCatMenuClicked2(!catMenuClicked2))}} className='flex justify-between items-baseline cursor-pointer'>
        <ChevronUpIcon className={`transition-all duration-300 ${catMenuClicked2?"rotate-180":"rotate-0"}`} size={20}/>
        <p className='text-lg'>تصفية حسب السعر</p>
      </div>
      <div className={`flex flex-col gap-5 ${catMenuClicked2?"max-h-0 opacity-0 pointer-events-none":"max-h-fit opacity-100 pointer-events-auto"}`}>
        <div className='flex flex-col gap-3 w-2/3 self-end'>
          <p className='text-right'>Min price:</p>
          <Slider
          reverse
         min={Number(categoryProducts?.data?.filters?.min_price)}
          max={Number(categoryProducts?.data?.filters?.max_price)}
          value={Number(minPrice)}
          onChange={(value)=>dispatch(setMinPrice(Math.min(Number(value),Number(maxPrice))))}
          styles={{
            track:{backgroundColor:"#3b82f6",height:6},
            handle:{
              backgroundColor:"#3b82f6",
              borderColor:"#3b82f6",
              width:15,
              height:15,
             
            },
            rail:{backgroundColor:"#e5e7eb",
              height:6,
              
            }
          }}
          
          />
          <p className='text-right'>${minPrice}</p>

         
        </div>
        <div className='flex flex-col gap-3 self-end w-2/3'>
          <p className='text-right'>Max price:</p>
          <Slider
          reverse
           min={Number(categoryProducts?.data?.filters?.min_price)}
           max={Number(categoryProducts?.data?.filters?.max_price)}
           value={Number(maxPrice)}
           onChange={(value)=>dispatch(setMaxPrice(Math.max(value,Number(minPrice))))}
          styles={{
            track:{backgroundColor:"#0675a8",height:6},
            handle:{
              backgroundColor:"#0675a8",
              borderColor:"#0675a8",
              width:15,
              height:15,
             
            },
            rail:{backgroundColor:"#e5e7eb",
              height:6,
              
            }
          }}
          />
          <p className='text-right'>${maxPrice}</p>

         
        </div>
        <div className='flex justify-end'>
        <button onClick={()=>{dispatch(setMinPriceP(minPrice));
          dispatch(setMaxPriceP(maxPrice));
        }} className='cursor-pointer w-[120px] h-[40px] grid place-content-center bg-[#0675a8] text-white rounded-sm' >Apply Filter </button>
        </div>
      </div>
      </div>}
      {categoryProducts?.data?.filters?.colors?.length>0&&
      <div className='mt-8 flex flex-col gap-5'>
         <div onClick={()=>{dispatch(setCatMenuClicked3(!catMenuClicked3))}}  className='flex justify-between items-baseline cursor-pointer'>
          <ChevronUpIcon className={`transition-all duration-300 ${catMenuClicked3?"rotate-180":"rotate-0"}`} size={20}/>
          <p className='text-lg'>تصفية حسب اللون</p>
         </div>
         <div className={`flex flex-col gap-2  ${catMenuClicked3?"max-h-0 opacity-0  pointer-events-none":"max-h-fit opacity-100 pointer-events-auto"}`}>
         { categoryProducts?.data?.filters?.colors.map(colour=>
         <div  key={colour.id} className='flex justify-end'>
          <div onClick={()=>{
          dispatch(setColor(colour.id));
          dispatch(setSelectedColorId(colour.id));
         }} className=' flex  justify-end items-center gap-2  cursor-pointer w-fit'>
           <div className=' flex flex-row-reverse '>
              {colour.colors.map((specificColor,index)=>
                <div key={index} style={{backgroundColor:specificColor}} className={`w-[25px] h-[50px]`}></div>
              )}
            </div>
            <div className={`w-3.5 h-3.5 border-[0.5px] border-black rounded-full ${(selectedColorId===colour.id)&& "bg-[#0675a8] border-white "} `}>
            </div>
          </div>  
          </div>

         )}
        </div>
      </div>}
      {categoryProducts?.data?.filters?.sizes?.length>0&&
      <div className='mt-8 flex flex-col gap-5'>
         <div  onClick={()=>{dispatch(setCatMenuClicked4(!catMenuClicked4))}} className='flex justify-between items-baseline cursor-pointer'>
          <ChevronUpIcon className={`transition-all duration-300 ${catMenuClicked4?"rotate-180":"rotate-0"}`} size={20}/>
          <p className='text-lg'>تصفية حسب الحجم</p>
         </div>
         <div className={`flex flex-col gap-2 ${catMenuClicked4?"max-h-0 opacity-0  pointer-events-none":"max-h-fit opacity-100 pointer-events-auto"}`}>
        {categoryProducts?.data?.filters?.sizes.map(sizee=>
        <div key={sizee.id} className='flex justify-end'>
          <div className='flex justify-end items-baseline gap-2 cursor-pointer w-fit'  onClick={()=>{
            dispatch(setSize(sizee.value));
            dispatch(setSelectedSizeId(sizee.id))
          }}>
            <p  className='font-semibold '>{sizee.value}</p>
            <div className={`w-3.5 h-3.5 border-[0.5px] border-black rounded-full ${(selectedSizeId===sizee.id)&& "bg-[#0675a8] border-white "} `}></div>
          </div>
        </div>  
        )}
        </div>
      </div>}
      <div className='flex justify-end mt-5 '>
        <button onClick={()=>{
          dispatch(setMinPriceP(0));
          dispatch(setMaxPriceP(0));
          dispatch(setColor(0));
          dispatch(setSize(""));
          dispatch(setSelectedSizeId(0));
          dispatch(setSelectedColorId(0));
          dispatch(setMinPrice(categoryProducts?.data?.filters?.min_price));
          dispatch(setMaxPrice(categoryProducts?.data?.filters?.max_price));
        }} className='cursor-pointer w-[120px] h-[40px] grid place-content-center bg-red-500 text-white rounded-sm' >مسح الفلاتر </button>
        </div>
      </div>
      


    </div>
    </div>
  )
}

export default Categoriesmenu