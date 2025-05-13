import React,{useState,useEffect} from 'react'
import { useRefundMutation } from '@/features/api/apiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSuccessMessage } from '@/features/addition/addition';
const Refund = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const[refundBody,{data:refund,isSuccess}]=useRefundMutation();
 const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [notes, setNotes] = useState('');
   

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
       const formData = new FormData();
                formData.append('order_id', orderId);
                formData.append('email', email);
                formData.append('notes', notes);
      const response=await refundBody(formData).unwrap();
          if(response.status){
          navigate("/");
          dispatch(setSuccessMessage(true));
          setTimeout(()=>{
            dispatch(setSuccessMessage(false));
          },3500);
           
       }
    } catch (e) {
      console.log(e?.data?.errors)
      
    }
  };
 
  return (
    <main className="w-full flex flex-col items-center  mt-25 mb-10 p-6  bg-white  rounded-2xl">
      <h2 className="text-2xl  mb-6 text-center text-[#042e2e]">استرجاع</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-[328px] flex flex-col gap-2.5">
        <div>
          <label className="block mb-1 text-right">البريد الالكتروني</label>
          <input
            required
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-right text-sm w-full p-3  border rounded-lg focus:outline-none focus:ring focus:border-1 focus:border-[#042e2e] " 
          />
        </div>
        <div>
          <label className="block mb-1  text-right">رقم الطلب</label>
          <input
            type="text"
            placeholder="Type your order ID"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="text-right text-sm  w-full p-3  border rounded-lg focus:outline-none focus:ring focus:border-1 focus:border-[#042e2e]"
          />
        </div>
        <div>
          <label className="block mb-1  text-right">ملاحظات</label>
          <textarea
            placeholder="Type your notes"
            value={notes}
            required
            onChange={(e) => setNotes(e.target.value)}
            className="text-right text-sm  w-full p-3  border rounded-lg focus:outline-none focus:ring focus:border-1 focus:border-[#042e2e] resize-none"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-[#042e2e] text-white py-3 px-4 rounded-lg hover:brightness-120 transition"
        >
          ارسل
        </button>
      </form>
    </main>
  );
}

export default Refund