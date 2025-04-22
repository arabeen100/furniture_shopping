import React ,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { XIcon,ChevronDownIcon } from 'lucide-react'
import { setExpandedMenu } from '@/features/sidebar/sidebarSlice'
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import "rc-slider/assets/index.css";
import { setCategoryId,setColor, setMaxPriceP, setMinPriceP, setSize } from '@/features/categoryproducts/catProducts';
import { useGetCategoryProductsQuery,useGetCategoriesQuery } from '@/features/api/apiSlice';
const Categoriesmenu = () => {
  const {data:categories}=useGetCategoriesQuery();
    const{color,sort,size,limit,offset,minPriceP,maxPriceP,categoryId}=useSelector((state)=>state.catProducts)
    const{data:categoryProducts}=useGetCategoryProductsQuery({categoryId:categoryId,color:color,size:size,sort:sort,limit:limit,offset:offset,min_price:minPriceP,max_price:maxPriceP},{skip:!categoryId});

  const[minPrice,setMinPrice]=useState(0);
  const[maxPrice,setMaxPrice]=useState(1500);
  const[catMenuClicked1,setCatMenuClicked1]=useState(false);
  const[catMenuClicked2,setCatMenuClicked2]=useState(false);
  const[catMenuClicked3,setCatMenuClicked3]=useState(false);
  const[catMenuClicked4,setCatMenuClicked4]=useState(false);
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
          useEffect(()=>{
              if(categoryProducts){
                console.log(categoryProducts);
              }
            },[categoryProducts])
            useEffect(()=>{
              console.log(size,typeof(size));
              
            },[size])
            
  return (
    <div className={`${expandedMenu&&"w-full h-full bg-[#00000070] fixed z-20"}`}>
    <div  onClick={(e)=>e.stopPropagation()} className={`h-full flex justify-center bg-white  transition-all overflow-y-auto duration-300  fixed left-0  z-30 w-[300px] ${expandedMenu ? " translate-x-0" : " -translate-x-full"}`}>
      <div className='w-[95%] flex flex-col h-fit pb-8'>
       <div>
      <XIcon onClick={()=>{dispatch(setExpandedMenu())}} size={21} className='cursor-pointer mt-6 ml-4.5 '/>
      </div> 
      <div className={`flex flex-col gap-5 text-lg mt-6 `}>
        <div onClick={()=>{setCatMenuClicked1(!catMenuClicked1)}} className='flex justify-between cursor-pointer'>
         <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked1?"rotate-180":"rotate-0"}`}  size={20}/>
         <p>فئات</p>
        </div>
        <div className={`flex flex-col gap-5 ${catMenuClicked1?"max-h-0 opacity-0 ":"max-h-fit opacity-100"} transition-all `}>
        <div className={`flex justify-between`}>
          <p>3</p>
          <Link onClick={()=>{dispatch(setCategoryId(categories?.data?.categories?.[0].id))}} to='/categories/غرف النوم'>غرف النوم</Link>
        </div>
        <div className={`flex justify-between`}>
          <p>5</p>
          <Link onClick={()=>{dispatch(setCategoryId(categories?.data?.categories?.[1].id))}} to='/categories/مجالس'>مجالس</Link>
        </div>
        <div className={`flex justify-between`}>
          <p>1</p>
          <Link onClick={()=>{dispatch(setCategoryId(categories?.data?.categories?.[2].id))}} to='/categories/مجامر'>مجامر</Link>
        </div>
        <div className={`flex justify-between`}>
          <p>3</p>
          <Link onClick={()=>{dispatch(setCategoryId(categories?.data?.categories?.[3].id))}} to='/categories/ستائر'>ستائر</Link>
        </div>
        <div className={`flex justify-between`}>
          <p>3</p>
          <Link onClick={()=>{dispatch(setCategoryId(categories?.data?.categories?.[4].id))}} to='/categories/any'>any</Link>
        </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-8'>
      <div onClick={()=>{setCatMenuClicked2(!catMenuClicked2)}}  className='flex justify-between items-baseline cursor-pointer'>
        <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked2?"rotate-180":"rotate-0"}`} size={20}/>
        <p className='text-lg'>تصفية حسب السعر</p>
      </div>
      <div className={`flex flex-col gap-5 ${catMenuClicked2?"max-h-0 opacity-0 ":"max-h-fit opacity-100"}`}>
        <div className='flex flex-col gap-3 w-2/3 self-end'>
          <p className='text-right'>Min price:</p>
          <Slider
          reverse
          min={0}
          max={1500}
          value={minPrice}
          onChange={(value)=>setMinPrice(Math.min(value,maxPrice))}
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
          min={0}
          max={1500}
          value={maxPrice}
          onChange={(value)=>setMaxPrice(Math.max(value,minPrice))}
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
      </div>
      {categoryProducts?.data?.filters?.colors?.length>0&&
      <div className='mt-8 flex flex-col gap-5'>
         <div onClick={()=>{setCatMenuClicked3(!catMenuClicked3)}}  className='flex justify-between items-baseline cursor-pointer'>
          <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked3?"rotate-180":"rotate-0"}`} size={20}/>
          <p className='text-lg'>تصفية حسب اللون</p>
         </div>
         <div className={`flex flex-col gap-2  ${catMenuClicked3?"max-h-0 opacity-0 ":"max-h-fit opacity-100"}`}>
        {categoryProducts?.data?.filters?.colors.map(colour=>
         <div key={colour.id} className=' flex justify-end gap-2 '>
            <label className='cursor-pointer flex flex-row-reverse ' htmlFor={colour.id}>
              {colour.colors.map((specificColor,index)=>
                <div key={index} style={{backgroundColor:specificColor}} className={`w-[25px] h-[50px]`}></div>
              )}

            </label>
            <input 
            type="radio"
            name='color'
            id={colour.id}
            value={colour.id}
            checked={String(color)===String(colour.id)}
            onChange={(e)=>{dispatch(setColor(e.target.value));
            }}
            className='cursor-pointer'
            /> 
            </div>
        )}
        </div>
      </div>}
      {categoryProducts?.data?.filters?.sizes?.length>0&&
      <div className='mt-8 flex flex-col gap-5'>
         <div onClick={()=>{setCatMenuClicked4(!catMenuClicked4)}} className='flex justify-between items-baseline cursor-pointer'>
          <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked4?"rotate-180":"rotate-0"}`} size={20}/>
          <p className='text-lg'>تصفية حسب الحجم</p>
         </div>
         <div className={`flex flex-col gap-2 ${catMenuClicked4?"max-h-0 opacity-0 ":"max-h-fit opacity-100"}`}>
        {categoryProducts?.data?.filters?.sizes.map(sizee=>
          <div key={sizee.id} className='flex justify-end gap-2 '>
            <label className=' cursor-pointer' htmlFor={sizee.value}>
            <p className='font-semibold '>{sizee.value}</p>
            </label>
            <input 
            type="radio"
            name='size'
            id={sizee.value}
            value={sizee.value}
            checked={String(size)===String(sizee.value)}
            onChange={(e)=>{dispatch(setSize(e.target.value));
            }}
            className='cursor-pointer'
            />

          </div>
        )}
        </div>
      </div>}
      <div className='flex justify-end mt-5 '>
        <button onClick={()=>{dispatch(setMinPriceP(0));
          dispatch(setMaxPriceP(0));
          dispatch(setColor(0));
          dispatch(setSize(""));
          setMinPrice(0);
          setMaxPrice(1500);
        }} className='cursor-pointer w-[120px] h-[40px] grid place-content-center bg-red-500 text-white rounded-sm' >مسح الفلاتر </button>
        </div>
      </div>
      


    </div>
    </div>
  )
}

export default Categoriesmenu