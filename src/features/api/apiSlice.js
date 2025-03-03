import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice= createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://al-rahman-moebel.eu/api"
    }),
    endpoints:(builder)=>({
        register:builder.mutation({
            query:({email,userName,name,phone,password})=>{
                const formData=new FormData();
                formData.append("email", email);
                formData.append("userName",userName);
                formData.append('name',name)
                formData.append("phone",phone);
                formData.append("password",password);
                return({
                url:'/auth/register',
                method:'POST',
                body:formData,
            })}
        }),
        verifyEmail:builder.mutation({
            query:({email,verificationCode})=>{
                const formData=new FormData();
                formData.append("email", email);
                formData.append("verificationCode",verificationCode);
                return({
                url:'/auth/verifyEmail',
                method:'POST',
                body:formData,
            })}
        }),
        logIn:builder.mutation({
            query:(user,{userIdentifier,password})=>{
                const formData = new FormData();
                formData.append('userIdentifier', userIdentifier);
                formData.append('password', password);
                return({
                url:'/auth/login',
                method:'POST',
                body:formData,
            })}
        }),
        resendCode:builder.mutation({
            query:({email,codeType})=>{
                const formData = new FormData();
                formData.append('email', email);
                formData.append('codeType', codeType);
                return({
                url:'/auth/resendCode',
                method:'POST',
                body:formData,
            })}
        }),
        forgotPasswoed:builder.mutation({
            query:({email})=>{
                const formData = new FormData();
                formData.append('email', email);
                return({
                url:'/auth/forgotPassword',
                method:'POST',
                body:formData,
            })}
        }),
        resetPasswoed:builder.mutation({
            query:({email,resetPasswordCode,password})=>{
                const formData = new FormData();
                formData.append('email', email);
                formData.append('resetPasswordCode', resetPasswordCode);
                formData.append('password', password);
                return({
                url:'/auth/resetPassword',
                method:'POST',
                body:formData,
            })}
        }),
        logOut:builder.mutation({
             query:(token)=>({
                url:'/auth/logout',
                method:'POST',
                headers:{
                    Authorization:`Bearer${token}`
                }
             })
        }),
        getCarousels:builder.query({
            query:()=>'/carousels/'
        }),
        getCategories:builder.query({
            query:()=>'/categories/'
        }),
        contact:builder.mutation({
            query:({name,email,phone,message})=>{
                const formData=new FormData();
                formData.append("name",name);
                formData.append("email", email);
                formData.append("phone",phone);
                formData.append("message",message);
                return({
                url:'/contactus/',
                method:'POST',
                body:formData,
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
            query:({limit})=>({
                url:'/products/trendy',
                params:{
                    ...(limit&&{limit})
                }

            })
        }),
        getProfile:builder.query({
            query:(token)=>({
               url:'/profile/',
               headers:{
                   Authorization:`Bearer${token}`
               }
            })
       }),
       getAddresses:builder.query({
        query:(token)=>({
            url:'/addresses',
            headers:{
                Authorization:`bearer${token}`
            }
        })
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
            url:'/addresses',
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
            url:`/addresses/${addressId}`,
            method:'PUT',
            body:formData,
            headers:{
               Authorization:`bearer${token}`
            }
        })}
    }),
    deleteAddress:builder.mutation({
        query:(addressId,token)=>({
            url:`/addresses/${addressId}`,
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
        query:({name,email,userName,password,phone})=>{
            const formData=new FormData();
            formData.append("name", name);
            formData.append("email",email);
            formData.append('userName',userName)
            formData.append("password",password);
            formData.append("phone",phone);
            return({
            url:'/profile/update',
            method:'POST',
            body:formData,
            headers:{
               Authorization:`bearer${token}`
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
export default apiSlice.reducer;
export const {useGetCarouselsQuery,useRegisterMutation,useVerifyEmailMutation,useLogInMutation,useResendCodeMutation,useForgotPasswoedMutation,useResetPasswoedMutation,useLogOutMutation,useGetCategoriesQuery,useGetFaqsQuery,useContactMutation,useGetCouponQuery,useCheckOutMutation,useRefundMutation,useGetShippingPriceQuery,useGetProductsQuery,useGetCategoryProductsQuery,useGetProductQuery,useGetSearchQuery,useGetTrendyQuery,useGetProfileQuery,useGetAddressesQuery,useAddAddressMutation,useEditAddressMutation,useDeleteAddressMutation,useGetCartQuery,useAddProductToCartMutation,useDeleteCartMutation,useUpdateInfoMutation,useGetUserOrdersQuery,useGetWishListQuery,useAddProductToWishListMutation,useDeleteProductFromWishListMutation}=apiSlice;
// Define the API slice