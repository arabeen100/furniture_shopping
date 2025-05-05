import React,{useState,useEffect} from 'react'
import { SlidersHorizontalIcon,HeartIcon,ShoppingCartIcon } from 'lucide-react'
import rooms from "../../assets/rooms.png"
import seatings from "../../assets/seatings.png"
import curtains from "../../assets/curtains.png"
import fireplaces from "../../assets/fire_places.png"
import any from "../../assets/any.jpg"
import { useParams ,Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
import { useGetCategoryProductsQuery,useGetCategoriesQuery,useGetWishListQuery ,useAddProductToWishListMutation,useDeleteProductFromWishListMutation } from '@/features/api/apiSlice'
import { setExpandedMenu } from '@/features/sidebar/sidebarSlice'
import { setCategoryId, setCatMenuClicked1, setCatMenuClicked2, setCatMenuClicked3, setCatMenuClicked4, setColor, setLimit, setMaxPriceP, setMinPriceP, setOffset, setSize, setSort,setSelectedSizeId,setSelectedColorId } from '@/features/categoryproducts/catProducts'
import Slider from 'rc-slider';
import { ChevronDownIcon } from 'lucide-react'
import { setError } from '@/features/login/login'
const Category = () => {
   const{token}=useSelector((state)=>state.login)
    const navigate=useNavigate();
   const {data:categories}=useGetCategoriesQuery();
    const{expandedMenu}=useSelector((state)=>state.sidebar)
    const[minPrice,setMinPrice]=useState(0);
    const[maxPrice,setMaxPrice]=useState(1500);
  const{color,sort,size,limit,offset,minPriceP,maxPriceP,categoryId,catMenuClicked1,catMenuClicked2,catMenuClicked3,catMenuClicked4,selectedSizeId,selectedColorId}=useSelector((state)=>state.catProducts)
  const dispatch=useDispatch();
  const{name}=useParams();
  useEffect(()=>{
    if(categories){
    const matchedCategory=categories?.data?.categories?.find(category=>category.name_ar?.trim()===name.trim());
    dispatch(setCategoryId(matchedCategory.id))}
  },[categories,name]);
  const [likedItems,setLikedItems]=useState({});
    const[addStatus,setAddStatus]=useState(false);
    const[deleteStatus,setDeleteStatus]=useState(false);
     const[showMessage,setShowMessage]=useState(false)
  const{data:categoryProducts}=useGetCategoryProductsQuery({categoryId:categoryId,color:color,size:size,sort:sort,limit:limit,offset:offset,min_price:minPriceP,max_price:maxPriceP},{skip:!categoryId});
  const{data:wishlistProducts}=useGetWishListQuery(undefined,{skip:!token});
  const[addProduct,{data:resp,isSuccess:success}]=useAddProductToWishListMutation();
    const[deleteProduct,{data:res,isSuccess:succ}]=useDeleteProductFromWishListMutation();
  useEffect(()=>{
    if(categoryProducts){
      console.log(categoryProducts);
    }
  },[categoryProducts])
   useEffect(()=>{
      if(wishlistProducts?.data?.wishlist_products){
        setLikedItems(()=>
        wishlistProducts.data.wishlist_products.reduce((acc,wishlistProduct)=>({...acc,[wishlistProduct.id]:true}),{})
        )
     
      }
    },[wishlistProducts])
    useEffect(()=>{
                if(addStatus||deleteStatus){
                 setShowMessage(true);
                 const timer=setTimeout(()=>{
                   setShowMessage(false);
                },3000)
               return ()=>clearTimeout(timer);
                }
          },[addStatus,deleteStatus])
      useEffect(()=>{
      dispatch(setColor(0));
      dispatch(setSize(""));
      dispatch(setSort(null));
      dispatch(setLimit(20));
      dispatch(setOffset(0));
      dispatch(setMinPriceP(null));
      dispatch(setMaxPriceP(null));
    },[categoryId,dispatch])  
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
              navigate("/auth/login");
               dispatch(setError("يجب ان تسجل الدخول اولا"));
             }
            
            } 
  return (
    <div className= ' flex justify-center w-full pl-3 pr-3'>
       <div className={` fixed z-30 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[250px]"}`}>
         {addStatus&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{resp?.data?.message}✔️</p>}
         {deleteStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{res?.data?.message }✔️</p>}
      </div>
    <div className='mb-15 w-fit flex justify-center flex-grow larger:flex  larger:justify-center larger:items-baseline larger:gap-6 '>
      <div className=' w-fit small:w-[552px] small:flex-grow-0 larger:w-[416px] large:w-[640px] xlarge:w-[848px] flex-grow flex flex-col gap-4.5'>
      <div className='mt-10 flex justify-end  gap-4.5 larger:hidden'>
        <p className='font-semibold' >تصنيف</p>
       <SlidersHorizontalIcon className='cursor-pointer' onClick={()=>{dispatch(setExpandedMenu())}} />
      </div>
      <div className='flex-grow flex justify-between larger:mt-12'>
       <p className='text-lg'>فرز حسب الأحدث</p>
       <p className='text-lg'>عرض <span className='font-semibold'>{categoryProducts?.data?.products.length}</span> من <span className='font-semibold'>{categoryProducts?.data?.products.length}</span> نتائج</p>
      </div>
      <img className='w-full flex-grow ' src={name==="غرف النوم"?rooms:name==="مجالس"?seatings:name==="مجامر"?fireplaces:name==="ستائر"?curtains:name==="any"?any:null}  loading='lazy' />
      <div className='w-full flex-grow flex flex-wrap justify-end gap-2'>
        {categoryProducts?.data?.products.map(product=>
             <div className='flex-grow  small:flex-grow-0 small:w-[266px] larger:w-[202px] large:w-[205.328px] xlarge:w-[274.656px] max-small:max-w-12/25' key={product.id}>
              <div  className='relative flex-grow small:flex-grow-0 bg-gray-200 flex flex-col w-full h-[260px] larger:h-[320px] large:h-[320px] xlarge:h-[320px]  rounded-[20px] '>
              <div onClick={()=>{handleHeartIconClick(product.id)}}  className=' cursor-pointer w-9 h-9 rounded-full bg-white absolute grid place-content-center left-1.5 t.5'>
              <HeartIcon fill={`${(likedItems[product.id])?'red':'none'} `} color={`${(likedItems[product.id])?'red':'black'} `} className={` size-4.5 `}/>
              </div>
            <Link to={`/products/${product.name_ar}`} className=' flex justify-center w-full h-[190px] larger:h-[250px] large:h-[250px] xlarge:h-[250px]'>  
            <img className=' rounded-t-[20px] h-full w-full object-center object-cover ' src={`${product.images?.[0]?.image_link}`} loading='lazy' />
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
            </div>
        )}

      
      </div>
      </div>
      <div className={`max-larger:hidden larger:block h-full flex justify-center bg-white  w-[300px] mt-10 `}>
      <div className='w-[95%] flex flex-col h-fit pb-8'>
      <div className={`flex flex-col gap-5 text-lg  `}>
        <div  onClick={()=>{dispatch(setCatMenuClicked1(!catMenuClicked1))}}className='flex justify-between cursor-pointer'>
         <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked1?"rotate-180":"rotate-0"}`}  size={20}/>
         <p>فئات</p>
        </div>
        <div className={`flex flex-col gap-5 ${catMenuClicked1?"max-h-0 opacity-0 ":"max-h-fit opacity-100"} transition-all `}>
        {categories?.data?.categories?.map(category=>
          <div key={category.id} className={`flex justify-between`}>
            <p>{category.total_category_products}</p>
            <Link to={`/categories/${category.name_ar}`}>{category.name_ar}</Link>
          </div>  
        )}
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-8'>
      <div  onClick={()=>{dispatch(setCatMenuClicked2(!catMenuClicked2))}} className='flex justify-between items-baseline cursor-pointer'>
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
        <button  onClick={()=>{dispatch(setMinPriceP(minPrice));
          dispatch(setMaxPriceP(maxPrice));
        }} className='cursor-pointer w-[120px] h-[40px] grid place-content-center bg-[#0675a8] text-white rounded-sm' >Apply Filter </button>
        </div>
      </div>
      </div>
      {categoryProducts?.data?.filters?.colors?.length>0&&
      <div className='mt-8 flex flex-col gap-5'>
         <div  onClick={()=>{dispatch(setCatMenuClicked3(!catMenuClicked3))}} className='flex justify-between items-baseline cursor-pointer'>
          <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked3?"rotate-180":"rotate-0"}`} size={20}/>
          <p className='text-lg'>تصفية حسب اللون</p>
         </div>
         <div className={`flex flex-col gap-2 ${catMenuClicked3?"max-h-0 opacity-0 ":"max-h-fit opacity-100"}`}>
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
         <div  onClick={()=>{dispatch(setCatMenuClicked4(!catMenuClicked4))}}className='flex justify-between items-baseline cursor-pointer'>
          <ChevronDownIcon className={`transition-all duration-300 ${catMenuClicked4?"rotate-180":"rotate-0"}`} size={20}/>
          <p className='text-lg'>تصفية حسب الحجم</p>
         </div>
         <div className={`flex flex-col gap-2 ${catMenuClicked4?"max-h-0 opacity-0 ":"max-h-fit opacity-100"}`}>
             {categoryProducts?.data?.filters?.sizes.map(sizee=>
                  <div  key={sizee.id} className='flex justify-end'>
                     <div className='flex justify-end items-baseline gap-2 cursor-pointer w-fit 'onClick={()=>{
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
        <button onClick={()=>{dispatch(setMinPriceP(0));
          dispatch(setMaxPriceP(0));
          dispatch(setColor(""));
          dispatch(setSize(""));
          setMinPrice(0);
          setMaxPrice(1500);
          dispatch(setSelectedSizeId(0));
          dispatch(setSelectedColorId(0));

        }} className='cursor-pointer w-[120px] h-[40px] grid place-content-center bg-red-500 text-white rounded-sm' >مسح الفلاتر </button>
        </div>
      </div>
      


    </div>
    </div>
    
    </div>
  )
}

export default Category