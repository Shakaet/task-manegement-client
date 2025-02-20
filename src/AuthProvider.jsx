import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from './component/firebase.init';
import axios from 'axios';


export let AuthContext= createContext(null)

const AuthProvider = ({children}) => {


    
    let [user,setUser]=useState(null)
    const [loading,setLoading] = useState(true);

    
const provider = new GoogleAuthProvider();

let googleSign=()=>{
      
    setLoading(true)
    return signInWithPopup(auth, provider)
}

   


    // let createRegistered=(email,password)=>{
    //     setLoading(true)
    //       return createUserWithEmailAndPassword(auth,email,password)
    // }

    // let loginSetup =(email,password)=>{
    //     setLoading(true)
    //      return signInWithEmailAndPassword(auth,email,password)
    // }

    let signOuts=()=>{
        setLoading(true)
        return signOut(auth)
    }
    // let updateUserProfile = (user, profileUpdates) => {
    //     setLoading(true)
    //     return updateProfile(user, profileUpdates);
    //   };

      useEffect(()=>{
        let unsubscribe= onAuthStateChanged(auth, (CurrentUser) => {
            
           
            setUser(CurrentUser)
            console.log(CurrentUser)
            setLoading(false)

        
            

               

            
            
 
            
            
            
            
           //  // wait,put in in the correct place
           //  setLoading(false)
           });
            
            
    
            return ()=>{
                unsubscribe()
            }
            
        
      },[])



      let val= {
        
        signOuts,
        googleSign,
       
        user,
        loading

   }


    return (
        <div>
             <AuthContext.Provider value={val}>
                   {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;