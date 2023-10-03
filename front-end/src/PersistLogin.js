// import {Outlet}  from "react-router-dom"
// import { useState,useEffect } from "react"
// import RefreshToken from "./RefreshToken"
// import useAuth from "./useAuth"



// const PersistentLogin =()=>{
//     const [isLoading,setIsLoading] = useState(true)
//     const refresh = RefreshToken()

//     const {auth} = useAuth()

//     useEffect(()=>{
//         const verifyRefreshToken = async()=>{
//             try{
//                 await refresh()

//             }catch(err){
//                 console.log(err)
//             }
//             finally{
//                 setIsLoading(false)
//             }
//         }

//         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)


//     },[])


//     useEffect(()=>{
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`authToken : ${auth?.accessToken}`)
//     },[isLoading])

//     return (
//         <>
//             {
//                 isLoading
//                     ? <p>...loading</p>
//                     :<Outlet/>
//             }
//         </>
//     )
// }


// export default PersistentLogin
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import RefreshToken from "./RefreshToken";
import useAuth from "./useAuth";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = RefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const initialize = async () => {
      if (!auth?.accessToken) {
        await verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
    };

    initialize();
  }, [auth?.accessToken]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`authToken: ${auth?.accessToken}`);
    console.log("authObject",auth)
  }, [isLoading]);

  return (
    <>
      {isLoading ? <p>...loading</p> : <Outlet />}
    </>
  );
};

export default PersistentLogin;
