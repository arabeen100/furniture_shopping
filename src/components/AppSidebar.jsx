import { Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { useLogOutMutation } from "@/features/api/apiSlice"
import { Closeicon } from "@/icons"
import { setExpanded } from "../features/sidebar/sidebarSlice"
import profileLogo from "../assets/profile.webp"
import { useNavigate } from "react-router-dom"
import { setItem, setToken } from "@/features/login/login"
import { useEffect } from "react"
export function AppSidebar() {
  const{token}=useSelector((state)=>state.login)
  const navigate=useNavigate();
      const dispatch=useDispatch();
      const {expanded} =useSelector((state)=>state.sidebar)
        useEffect(()=>{
          if(expanded){
            document.body.classList.add("overflow-hidden");
          }else{
            document.body.classList.remove("overflow-hidden");
          }
          return ()=>{
            document.body.classList.remove("overflow-hidden");
          }
      
        },[expanded])
      
         const[logoutUser]=useLogOutMutation()
        
         const handleLogout=async()=>{
          try{
          const response= await logoutUser().unwrap();
           if(response.status){
            dispatch(setToken(""))
            dispatch(setItem())
            navigate('/auth/login')
           }
          }catch(e){ console.log(e.data.errors)}
         }
    
      return (
         <div className={`${expanded&&"w-full h-full bg-[#00000070] fixed z-20"}`}>
          <div className="h-full">
          <aside  onClick={(e)=>e.stopPropagation()} className={`h-full  bg-white  transition-all overflow-y-auto duration-300  fixed left-0  z-30 w-[300px] ${expanded ? " translate-x-0" : " -translate-x-full"}`}>
            
              <button  onClick={()=>{dispatch(setExpanded())}} className=" relative cursor-pointer top-10 left-5">
                <Closeicon/>
              </button>
              <ul className=" text-right leading-10 mr-5 flex flex-col justify-end ">
                <li>فئات</li>
                <li><Link to='/categories/غرف النوم'>غرف النوم</Link></li>
                <li><Link to='/categories/مجالس'>مجالس</Link></li>
                <li><Link to='/categories/مجامر'>مجامر</Link></li>
                <li><Link to='/categories/ستائر'>ستائر</Link></li>
                <li><Link to='/categories/any'>any</Link></li>
                <li><Link to='profile/Personalinfo' className={`${!token&& " hidden"} md:hidden relative top-2 left-64 w-[38px] h-[38px]`} ><img src={profileLogo} width='25' alt="profile-logo"loading="lazy"/></Link></li>
                <li ><button onClick={()=>{
                dispatch(setExpanded());
                handleLogout();
                }}className={`${!token&& " hidden"} w-[60px] h-[40px] bg-white outline-0  \cursor-pointer border  text-sm border-black grid place-content-center relative top-6 left-56 `}>logout</button ></li>
                 <li>
                  <ul  className={`${!token?"inline-flex gap-3":"hidden"} relative left-1 top-1`}>
                <li><Link onClick={()=>{dispatch(setExpanded())}} to="/auth/login" className={`w-[140px] outline-none  rounded-[5px] bg-white border-1 border-black grid  place-content-center  transition-colors duration-100 large:hidden hover:bg-[#5bb3ae]  hover:text-white hover:border-[#5bb3ae] `}>تسجيل الدخول</Link></li>
                <li><Link onClick={()=>{dispatch(setExpanded())}}  to="/auth/signup"className={` w-[80px]  outline-none rounded-[5px] bg-white border border-black grid  place-content-center  transition-colors duration-100 large:hidden hover:bg-[#5bb3ae] hover:text-white hover:border-[#5bb3ae]`}>تسجيل</Link></li>
              </ul>
              </li>
              </ul>
          </aside>
          </div>
        </div>
      )
    }
