import React, { useEffect, useState } from "react";
import './popup.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../background/firebase";

const Popup = () => {
    
    
    const [user, setUser] = useState(null)
    useEffect(() => { 
        chrome.runtime.sendMessage({ message: "getUser" }, (response) => {
            setUser(response.response);
        });
        
    }, [user])

    const handleSignOut = () => { 
        chrome.runtime.sendMessage({ message: "signOut" }, (response) => { 
            setUser(response.response);
        });
    }
    
    const handleSignIn = async () => { 
        // await signInWithPopup(auth, new GoogleAuthProvider());
        // chrome.runtime.sendMessage({ message: "signIn" }, (response) => {
        //     setUser(response.response);
        // })
    }
    
    return (
        <div>
            <h1 className="text-4xl text-green-500">Yesssss</h1>
            {user && (<button onClick={handleSignOut} >SignOut</button>)}
            {!user && (<button onClick={handleSignIn} >SignIn</button>)}
        </div>
    )
};

export default Popup;