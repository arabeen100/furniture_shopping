import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice= createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://al-rahman-moebel.eu/api",
    }),
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(newUser)=>({
                url: '/auth/register',
                method: 'POST',
                body: newUser,
            })
        }),
        verifyEmail:builder.mutation({
            query:(code)=>{
                return({
                url:'/auth/verifyEmail',
                method:'POST',
                body:code,
            })}
        }),
        logIn:builder.mutation({
            query:(loginUser)=>{
                return({
                url:'/auth/login',
                method:'POST',
                body:loginUser,
            })}
        }),
        resendCode:builder.mutation({
            query:(resendCode)=>{
                return({
                url:'/auth/resendCode',
                method:'POST',
                body:resendCode,
            })}
        }),
        forgotPasswoed:builder.mutation({
            query:(email)=>{
                return({
                url:'/auth/forgotPassword',
                method:'POST',
                body:email,
            })}
        }),
        resetPasswoed:builder.mutation({
            query:(resetPass)=>{
                return({
                url:'/auth/resetPassword',
                method:'POST',
                body:resetPass,
            })}
        }),
        logOut:builder.mutation({
             query:()=>{
                 const token=localStorage.getItem("userToken")
                return{
                url:'/auth/logout',
                method:'POST',
                headers:{
                    "Authorization":`Bearer ${token}`
                }
              }
             }
        }),
        getCarousels:builder.query({
            query:()=>'/carousels/'
        }),
        getCategories:builder.query({
            query:()=>'/categories/'
        }),
        contact:builder.mutation({
            query:(contact)=>{
                return({
                url:'/contactus/',
                method:'POST',
                body:contact,
            })}
        }),
        getFaqs:builder.query({
            query:()=>'/faqs/'
        }),
        getCoupon:builder.query({
            query:({coupon})=>({
                url:'/orders/coupon',
                params:{coupon},
            }),
        }),
        checkOut:builder.mutation({
            query:(orderData,token)=>({
                url:'/checkout',
                method:'POST',
                body:orderData,
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        }),
        refund:builder.mutation({
            query:({orderId,email,notes})=>{
                const formData = new FormData();
                formData.append('orderId', orderId);
                formData.append('email', email);
                formData.append('notes', notes);
                return({
                url:'/orders/refund',
                method:'POST',
                body:formData,
            })}
        }),
        getShippingPrice:builder.query({
            query:()=>'/orders/shipping'
        }),
        getProducts:builder.query({
            query:({color,size,sort,limit,offset,min_price,max_price})=>({
                url:'/products/',
                params:{
                    ...(color&&{color}),
                    ...(size&&{size}),
                    ...(sort&&{_sort:sort}),
                    ...(limit&&{limit}),
                    ...(offset&&{offset}),
                    ...(min_price&&{min_price}),
                    ...(max_price&&{max_price}),
                }
            })
        }),
        getCategoryProducts:builder.query({
            query:({categoryId,color,size,sort,limit,offset,min_price,max_price})=>({
                url:`/products/category/${categoryId}`,
                params:{
                    ...(color&&{color}),
                    ...(size&&{size}),
                    ...(sort&&{_sort:sort}),
                    ...(limit&&{limit}),
                    ...(offset&&{offset}),
                    ...(min_price&&{min_price}),
                    ...(max_price&&{max_price}),
                }
            })
        }),
        getProduct:builder.query({
            query:(productId)=>`/products/product/${productId}`
        }),
        getSearch:builder.query({
            query:({name,limit,offset,lang})=>({
                url:'/products/search',
                params:{
                    name,
                    ...(limit&&{limit}),
                    ...(offset&&{offset}),
                    ...(lang&&{lang}),
                }

            })
        }),
        getTrendy:builder.query({
            query:({limit})=>({
                url:'/products/trendy',
                params:{
                    ...(limit&&{limit})
                }

            })
        }),
        getProfile:builder.query({
            query:()=>{
               const token=localStorage.getItem("userToken")
                return{
               url:'/profile/',
               headers:{
                   "Authorization":`Bearer ${token}`
               }
            }},
            providesTags:["profile"]
           
       }),
       getAddresses:builder.query({
            query:()=>{
                const token=localStorage.getItem("userToken")
                return{
                url:'/profile/addresses',
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }}
    }),
    addAddress:builder.mutation({
        query:(token,{latitude,longitude,location,street_name,building_number})=>{
            const formData=new FormData();
            formData.append("latitude", latitude);
            formData.append("longitude",longitude);
            if(location){
            formData.append('location',location)};
            formData.append("street_name",street_name);
            formData.append("building_number",building_number);
            return({
            url:'/profile/addresses',
            method:'POST',
            body:formData,
            headers:{
               Authorization:`bearer${token}`
            }
        })}
    }),
    editAddress:builder.mutation({
        query:(addressId,token,{latitude,longitude,location,street_name,building_number})=>{
            const formData=new FormData();
            formData.append("latitude", latitude);
            formData.append("longitude",longitude);
            if(location){
            formData.append('location',location)};
            formData.append("street_name",street_name);
            formData.append("building_number",building_number);
            return({
            url:`/profile/addresses/${addressId}`,
            method:'PUT',
            body:formData,
            headers:{
               Authorization:`bearer${token}`
            }
        })}
    }),
    deleteAddress:builder.mutation({
        query:(addressId,token)=>({
            url:`/profile/addresses/${addressId}`,
            method:'DELETE',
            headers:{
                Authorization:`bearer${token}`
            }
        })
    }),
    getCart:builder.query({
        query:()=>{
            const token=localStorage.getItem("userToken")
            return({
            url:'/profile/cart',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })},
        providesTags:["cart"]
    }),
    addProductToCart:builder.mutation({
        query:(productData)=>{
            const token=localStorage.getItem("userToken")
            return({
            url:'/profile/cart',
            method:'POST',
            body:productData,
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })},
        invalidatesTags:["cart"]
    }),
    deleteCart:builder.mutation({
        query:(cartId)=>{
            const token=localStorage.getItem("userToken")
            return({
            url:`/profile/cart/${cartId}`,
            method:'DELETE',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })},
        invalidatesTags:["cart"]
    }),
    updateInfo:builder.mutation({
        query:(updatedUser)=>{
            const token=localStorage.getItem("userToken")
            return({
            url:'/profile/update',
            method:'POST',
            body:updatedUser,
            headers:{
               "Authorization":`Bearer ${token}`
            }
        })},
        invalidatesTags:["profile"]
        
    }),
    getUserOrders:builder.query({
        query:(token)=>({
            url:'/profile/orders',
            headers:{
                Authorization:`bearer${token}`
            }
        })
    }),
    getWishList:builder.query({
        query:()=>{
            const token=localStorage.getItem("userToken")
            return({
            url:'/profile/wishlist',
            headers:{
                "Authorization":`Bearer ${token}`
            },
            
        })},
        providesTags:["wish"],
    }),
    addProductToWishList:builder.mutation({
        query:(productId)=>{
            const token=localStorage.getItem("userToken")
            return({
            url:`/profile/wishlist/${productId}`,
            method:'POST',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })},
        invalidatesTags:["wish"]
    }),
    deleteProductFromWishList:builder.mutation({
        query:(productId)=>{
            const token=localStorage.getItem("userToken")
            return({
            url:`/profile/wishlist/${productId}`,
            method:'DELETE',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })},
        invalidatesTags:["wish"]
    }),




       



        




              

    })
})
export const {useGetCarouselsQuery,useRegisterMutation,useVerifyEmailMutation,useLogInMutation,useResendCodeMutation,useForgotPasswoedMutation,useResetPasswoedMutation,useLogOutMutation,useGetCategoriesQuery,useGetFaqsQuery,useContactMutation,useGetCouponQuery,useCheckOutMutation,useRefundMutation,useGetShippingPriceQuery,useGetProductsQuery,useGetCategoryProductsQuery,useGetProductQuery,useGetSearchQuery,useGetTrendyQuery,useGetProfileQuery,useGetAddressesQuery,useAddAddressMutation,useEditAddressMutation,useDeleteAddressMutation,useGetCartQuery,useAddProductToCartMutation,useDeleteCartMutation,useUpdateInfoMutation,useGetUserOrdersQuery,useGetWishListQuery,useAddProductToWishListMutation,useDeleteProductFromWishListMutation}=apiSlice;
// Define the API slice