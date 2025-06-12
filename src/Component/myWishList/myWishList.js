export const myApplicationsPromise=(email,accessToken)=>{
    return fetch(`https://blog-server-three-inky.vercel.app/user/userWishlist/?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
} 
