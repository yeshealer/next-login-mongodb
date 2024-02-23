"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import React from "react";
import {useEffect } from "react";
import {toast} from 'react-hot-toast';
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    
    // if button disabled no body can press it. But if false we can press it.
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            toast.success("User created successfully.")
            console.log("Sign up success", response.data);
            router.push("/login");

        } catch (error: any) {
            toast.error("Sign up failed! "+error.message);
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);            
        }
        else { 
            setButtonDisabled(true);
        }
    }, [user]);


    return(
        <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-slate-100 py-2">
            <h1 className="flex items-center mb-6 justify-center text-4xl font-bold text-black">
                Facebook
            </h1>
            <h1 className="text-black text-lg"> {loading ? "Processing..." : "Sign up"} </h1>
            <input
                className="text-lg p-2 border border-slate-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-black"
                id = "userName"
                type="text"
                value={user.username}
                // ...user will keep everything same and only the userName will be changed in user variable using setUser.
                onChange={e => setUser({...user, username:e.target.value})}
                placeholder="UserName"
            />
            <input
                className="text-lg p-2 border border-slate-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-black"
                id = "email"
                type="text"
                value={user.email}
                // ...user will keep everything same and only the email will be changed in user variable using setUser.
                onChange={e => setUser({...user, email:e.target.value})}
                placeholder="Email address"
            />
            <input
                className="text-lg p-2 border border-slate-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-black"
                id = "password"
                type="password"
                value={user.password}
                // ...user will keep everything same and only the password will be changed in user variable using setUser.
                onChange={e => setUser({...user, password:e.target.value})}
                placeholder="Password"
            />
            <button 
            onClick={onSignup} 
            className="text-xl p-2 px-12 border border-green-300 rounded-md mb-4 focus:outline-none focus:border-green-700 text-white bg-green-600 hover:bg-green-500"
            >
                {buttonDisabled ? "No Sign up" : "Sign up" }
            </button>
            <Link
                href="/login"
                className="text-xl p-2 border ps-4 pe-4 border-blue-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-white bg-blue-600 hover:bg-blue-500">
                Login
            </Link>

        </div>
    );
}











