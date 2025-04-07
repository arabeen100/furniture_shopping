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
            })
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
            query:({color,size,sort,limit,offset,minPrice,maxPrice})=>({
                url:'/products/',
                params:{
                    ...(color&&{color}),
                    ...(size&&{size}),
                    ...(sort&&{_sort:sort}),
                    ...(limit&&{limit}),
                    ...(offset&&{offset}),
                    ...(minPrice&&{minPrice}),
                    ...(maxPrice&&{maxPrice}),
                }
            })
        }),
        getCategoryProducts:builder.query({
            query:(categoryId,{color,size,sort,limit,offset,minPrice,maxPrice})=>({
                url:`/products/category/${categoryId}`,
                params:{
                    ...(color&&{color}),
                    ...(size&&{size}),
                    ...(sort&&{_sort:sort}),
                    ...(limit&&{limit}),
                    ...(offset&&{offset}),
                    ...(minPrice&&{minPrice}),
                    ...(maxPrice&&{maxPrice}),
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
            query:({limit=25})=>({
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
            }}
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
        query:(token)=>({
            url:'/profile/cart',
            headers:{
                Authorization:`bearer${token}`
            }
        })
    }),
    addProductToCart:builder.mutation({
        query:(productData,token)=>({
            url:'/profile/cart',
            method:'POST',
            body:productData,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }),
    deleteCart:builder.mutation({
        query:(cartId,token)=>({
            url:` /profile/cart/${cartId}`,
            method:'DELETE',
            headers:{
                Authorization:`bearer${token}`
            }
        })
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
        })}
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
        query:(token)=>({
            url:'/wishlist',
            headers:{
                Authorization:`bearer${token}`
            }
        })
    }),
    addProductToWishList:builder.mutation({
        query:(productId,token)=>({
            url:`/wishlist/${productId}`,
            method:'POST',
            headers:{
                Authorization:`bearer${token}`
            }
        })
    }),
    deleteProductFromWishList:builder.mutation({
        query:(productId,token)=>({
            url:`/wishlist/${productId}`,
            method:'DELETE',
            headers:{
                Authorization:`bearer${token}`
            }
        })
    }),




       



        




              

    })
})
export const {useGetCarouselsQuery,useRegisterMutation,useVerifyEmailMutation,useLogInMutation,useResendCodeMutation,useForgotPasswoedMutation,useResetPasswoedMutation,useLogOutMutation,useGetCategoriesQuery,useGetFaqsQuery,useContactMutation,useGetCouponQuery,useCheckOutMutation,useRefundMutation,useGetShippingPriceQuery,useGetProductsQuery,useGetCategoryProductsQuery,useGetProductQuery,useGetSearchQuery,useGetTrendyQuery,useGetProfileQuery,useGetAddressesQuery,useAddAddressMutation,useEditAddressMutation,useDeleteAddressMutation,useGetCartQuery,useAddProductToCartMutation,useDeleteCartMutation,useUpdateInfoMutation,useGetUserOrdersQuery,useGetWishListQuery,useAddProductToWishListMutation,useDeleteProductFromWishListMutation}=apiSlice;
// Define the API slice