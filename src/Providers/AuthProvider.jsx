import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export const AuthContext = createContext(null) 

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createuser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signinuser=(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo
        })
    }
    const gooleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const userSignOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async currentUser=>{
            setUser(currentUser);
            // console.log('user captured: ', currentUser)
            if(currentUser){
                //do something
                const userInfo = { email: currentUser.email}
                try {
                  const response = await axiosPublic.post('/jwt', userInfo)
                  const token = response.data.token
                //   console.log('Token received: ', token);
                  if(token){
                    localStorage.setItem('jwt-token', token)
                    setLoading(false)
                  }
                } catch (error) {
                    // console.error('Error fetching token: ', error);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }else{
                //remove token from client side(if set roken incookies or local)
                localStorage.removeItem('jwt-token')
                setLoading(false)
            }
           
        })
        return ()=>{
            return unsubscribe()
        }
    },[axiosPublic])
    const authInfo = {
        loading,
        user,
        setUser,
        createuser,
        signinuser,
        updateUserProfile,
        gooleSignIn,
        userSignOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;