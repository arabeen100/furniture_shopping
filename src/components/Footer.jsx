
import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    < footer>
     
     <Link to="/" className=' relative top-12'><img  src='/src/assets/footer-logo.svg' alt='Al-Rahman_logo' loading='lazy' />
     </Link> 
      <div className='flex flex-col gap-4 text-white relative top-12 text-right ' >
        <p>فئات</p>
        <Link  className=' categories' to={`/categories/غرف النوم`}>غرف النوم</Link>
        <Link className='categories' to={`/categories/مجالس`} >مجالس</Link>
        <Link className=' categories' to={`/categories/مجامر`}>مجامر</Link>
        <Link className=' categories' to={`/categories/ستائر`}>ستائر</Link>
        <Link className=' categories' to={`/categories/any`}>any</Link>
      </div>
      <div className='flex flex-col gap-4 text-white relative top-12 text-right ' >
      <p>وسائل التواصل الاجتماعي</p>
      <div className='flex justify-around'>
         <a href=''> <img src='/src/assets/youtube.svg' alt='youtube_logo'loading='lazy'/>
         </a>
         <a href=''>
          <img src='/src/assets/twitter.svg' alt='twitter_logo'loading='lazy'/>
         </a>
          <a href=''>
          <img src='/src/assets/instagram.svg' alt='instagram_logo'loading='lazy'/>
         </a>

         <a href=''>
          <img src='/src/assets/facebook.svg' alt='facebook_logo'loading='lazy'/>
         </a>
        </div>
        <Link to="/orders/refund">استرجاع</Link>

      </div>
      < div className='text-white flex flex-col relative top-12 text-right gap-4'  >
        <p>اتصل بنا</p>
       
        <p>حجز فندقي:123-456-7890</p>
        <p>مكتب التذاكر:123-456-7890</p>
      </div>
     
    </footer>
  )
}

export default Footer