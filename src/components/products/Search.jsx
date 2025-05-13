import { XIcon,HeartIcon,ShoppingCartIcon } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { closeSearch } from '@/features/search/searchSlice'
import { useGetProductsQuery, useGetSearchQuery,useAddProductToWishListMutation,useDeleteProductFromWishListMutation,useGetWishListQuery } from '@/features/api/apiSlice'
import { setName } from '@/features/search/searchSlice'
import { setOpenAddition } from '@/features/addition/addition'
import { setProductId } from '@/features/categoryproducts/catProducts'
const Search = () => {
  const navigate=useNavigate();
  const[showMessage,setShowMessage]=useState(false)
    const{token}=useSelector((state)=>state.login);
   const[addStatus,setAddStatus]=useState(false);
    const[deleteStatus,setDeleteStatus]=useState(false);
    const [likedItems,setLikedItems]=useState({});
  const {isOpen,name}=useSelector((state)=>state.search)
  const dispatch=useDispatch();
  const [limit,setLimit]=useState(12);
  const [offset,setOffset]=useState(0);
  const[lang,setLang]=useState("ar");
  const{data:search,isLoading}=useGetSearchQuery({name:name,limit:limit,offset:offset,lang:lang},{skip:!name})
  const{data:products}=useGetProductsQuery({limit:20},{skip:name});
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
              if(addStatus||deleteStatus){
               setShowMessage(true);
               const timer=setTimeout(()=>{
                 setShowMessage(false);
              },3000)
             return ()=>clearTimeout(timer);
              }
        },[addStatus,deleteStatus])
        useEffect(()=>{
          if(isOpen){
            dispatch(setName(""));
          }
        },[isOpen])
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

  useEffect(()=>{
    if(isOpen){
      document.body.classList.add("overflow-hidden");
    }else{
      document.body.classList.remove("overflow-hidden");
    }
    return ()=>{
      document.body.classList.remove("overflow-hidden");
    }

  },[isOpen])

  return ( 
  <div className='w-[97%]  h-[95%] bg-white fixed z-60 top-5 left-[1.5%] right-[1.5%]  mx-auto  shadow-2xl border rounded-[8px] flex flex-col  items-center overflow-y-auto'>
     <div className={` fixed z-70 top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[250px]"}`}>
     {addStatus&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{resp?.data?.message}✔️</p>}
     {deleteStatus&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{res?.data?.message }✔️</p>}
     </div>
       <button className='cursor-pointer  absolute right-3  top-3' onClick={()=>{dispatch(closeSearch());
        
       }}><XIcon size={18}/></button>
    <form className=' w-[92%] flex mt-15 justify-center' onSubmit={(e)=>e.preventDefault()}>
       <input className=' w-full p-3 focus:border-[#042e2e] focus:border-2 border rounded-br-[10px] rounded-[10px] outline-0 text-xl'
       id='search'
       value={name}
       role='searchBox'
       type='text'
       placeholder='Search'
       autoFocus
       onChange={(e)=>dispatch(setName(e.target.value))}
       />
     
    </form>
    {!name&&
    <div className='w-[92%] flex flex-row-reverse flex-wrap gap-2.5 xlarge:gap-21 mt-10'>
    {products?.data?.products?.map(product=><div className=' small:w-[32%] max-small:w-14/29  max-w-[300px] min-w-[150px]' key={product.id}>
           
            <div className='relative  bg-gray-200 flex flex-col w-full h-[260px] larger:h-[320px] large:h-[320px] xlarge:h-[320px]  rounded-[20px] '>
              <div onClick={()=>{handleHeartIconClick(product.id)}}  className=' cursor-pointer w-9 h-9 rounded-full bg-white absolute grid place-content-center left-1.5 t.5'>
              <HeartIcon fill={`${(likedItems[product.id])?'red':'none'} `} color={`${(likedItems[product.id])?'red':'black'} `} className={` size-4.5 `}/>
              </div>
            <Link onClick={()=>{dispatch(closeSearch())}} to={`/products/${product.name_ar}`} className=' flex justify-center w-full h-[190px] larger:h-[250px] large:h-[250px] xlarge:h-[250px]'>  
            <img className=' rounded-t-[20px] h-full w-full object-center object-cover ' alt='product' src={`${product.images?.[0]?.image_link}`} loading='lazy' />
            </Link>
            <div className='bg-[#042e2e] w-full h-[70px] rounded-b-[20px]'>
             <p className='text-right text-white p-1 text-lg flex flex-row-reverse '>{product.name_ar.length>12?`...${product.name_ar.slice(0,12)}`:`${product.name_ar}`}
              <span 
               onClick={()=>{
                              dispatch(setOpenAddition(true));
                              dispatch(setProductId(product.id));
                            }} 
              className='cursor-pointer absolute left-2 bottom-8 bg-[#5bb3ae] w-8 h-8 rounded-full grid place-content-center hover:brightness-80'> 
              <ShoppingCartIcon className='size-4.5'  />
              </span>
               </p>
             <p className='text-right text-white p-1 text-lg'>${product.price}</p>
             
            </div>
            </div>
          </div>)}
          </div>}
          {name&&
          <div  className='w-[92%] flex flex-row-reverse flex-wrap gap-2.5 larger:gap-21 mt-10'>
          {search?.data?.products?.map(product=>
          <div className=' small:w-[40%] max-small:w-14/29  max-w-[300px] min-w-[150px]' key={product.id}>
           
            <div className='relative  bg-gray-200 flex flex-col w-full h-[260px] larger:h-[320px] large:h-[320px] xlarge:h-[320px]  rounded-[20px] '>
              <div onClick={()=>{handleHeartIconClick(product.id)}}  className=' cursor-pointer w-9 h-9 rounded-full bg-white absolute grid place-content-center left-1.5 t.5'>
              <HeartIcon fill={`${(likedItems[product.id])?'red':'none'} `} color={`${(likedItems[product.id])?'red':'black'} `} className={` size-4.5 `}/>
              </div>
            <Link onClick={()=>{dispatch(closeSearch())}}  to={`/products/${product.name_ar}`} className=' flex justify-center w-full h-[190px] larger:h-[250px] large:h-[250px] xlarge:h-[250px]'>  
            <img className=' rounded-t-[20px] h-full w-full object-center object-cover ' alt='product' src={`${product.images?.[0]?.image_link}`} loading='lazy' />
            </Link>
            <div className='bg-[#042e2e] w-full h-[70px] rounded-b-[20px]'>
             <p className='text-right text-white p-1 text-lg flex flex-row-reverse '>{product.name_ar.length>12?`...${product.name_ar.slice(0,12)}`:`${product.name_ar}`}
              <span 
               onClick={()=>{
                              dispatch(setOpenAddition(true));
                              dispatch(setProductId(product.id))
                            }} 
              className='cursor-pointer absolute left-2 bottom-8 bg-[#5bb3ae] w-8 h-8 rounded-full grid place-content-center hover:brightness-80'> 
              <ShoppingCartIcon className='size-4.5'  />
              </span>
               </p>
             <p className='text-right text-white p-1 text-lg'>${product.price}</p>
             
            </div>
            </div>
          </div>

          )}
          </div>}

     <p className= {`${(search?.data?.products?.length===0)?"block":"hidden"} text-xl mt-10 font-bold text-center `}>لم يتم العثور على أي منتجات</p>
    <p className={`${isLoading?"block":"hidden"} text-xl font-bold text-center text-[#044949]  mt-40`}>loading</p>
    </div>
  
  )
}

export default Search