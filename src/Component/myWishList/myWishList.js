export const myApplicationsPromise=(email,accessToken)=>{
    return fetch(`http://localhost:3000/user/userWishlist/?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
} 
