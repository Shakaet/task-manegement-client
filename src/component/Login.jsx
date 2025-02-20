import React, { useContext } from 'react'
import { AuthContext } from '../AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {

    let {  googleSign } = useContext(AuthContext);
    const navigate = useNavigate();
    
    let location= useLocation()
    const redirectPath = location.state?.from || "/";

    const handleGoogleLogin = () => {
        googleSign()
          .then((result) => {

            let user=result.user
            // toast.success("Google login successful!");
            let usersData={
                name:user?.displayName,
                email:user?.email,

            }
            axios.post("http://localhost:3000/addUser",usersData)
            .then((res)=>{
                if(res.data.insertedId){
                    // alert("user added")
                    
                }
            })
            .catch((error)=>{
                // alert("user already existed")
            })
            navigate(redirectPath)
    
          })
          .catch((error) => {
            
          });
      };
  return (
    <div
    className="h-screen flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage: "url('https://i.ibb.co.com/vx5KhMzW/bg.webp')",
    }}
  >
    <button
      onClick={handleGoogleLogin}
      className="px-6 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center"
    >
      
      Sign in with Google
    </button>
  </div>
  )
}
