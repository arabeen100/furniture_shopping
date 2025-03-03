import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Forgotpassword from "./components/authentication/Forgotpassword";
import Resetpassword from "./components/authentication/Resetpassword";
import Verifyemail from "./components/authentication/Verifyemail";
import Signup from "./components/authentication/Signup";
import Category from "./components/categories/Category";
import Checkout from "./components/orders/Checkout";
import Refund from "./components/orders/Refund";
import Product from "./components/products/Product";
import Personalinfo from "./components/profile/Personalinfo";
import Userorders from "./components/profile/Userorders";
import Wishlist from "./components/profile/Wishlist";
import {  Route,Routes } from "react-router-dom";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="auth">
          <Route path="
          signup" element={<Signup/>}/>
           <Route path="
          verifyemail" element={<Verifyemail/>}/>
           <Route path="
          login" element={<Login/>}/>
           <Route path="
          forgotpass" element={<Forgotpassword/>}/>
           <Route path="
          resetpass" element={<Resetpassword/>}/>
        </Route>
        <Route path="categories">
          <Route path=":name" element={<Category/>}/>
        </Route>
        <Route path="orders">
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="refund" element={<Refund/>}/>
        </Route>
        <Route path="products">
          <Route path=":name" element={<Product/>}/>
        </Route>
        <Route path="profile">
          <Route index element={<Personalinfo/>}/>
          <Route path="userorders" element={<Userorders/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
