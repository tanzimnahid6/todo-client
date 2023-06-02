import { createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { getAuth } from "firebase/auth"
import app from "../../firebase.config";
const auth = getAuth(app);
export const AuthContext = createContext(null)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
         setUser(currentUser)
        //  console.log('previous user',currentUser);
         setLoading(false)
     })
     return ()=>unsubscribe()
   },[])

   const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }


  const authInfo = {
    googleSignIn ,user, setUser,loading,logOut
  }
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
