"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      toast.success("Login successfull");
      router.push("/profile");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-slate-100 py-2">
      <h1 className="flex items-center mb-6 justify-center text-4xl font-bold text-black">
        Facebook
      </h1>
      <h1 className="text-black text-xl">{loading ? "Processing" : "Login"}</h1>
      <input
        className="text-lg p-2 border border-slate-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-black"
        id="email"
        type="text"
        value={user.email}
        // ...user will keep everything same and only the email will be changed in user variable using setUser.
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email address"
      />
      <input
        className="text-lg p-2 border border-slate-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-black"
        id="password"
        type="password"
        value={user.password}
        // ...user will keep everything same and only the password will be changed in user variable using setUser.
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        onClick={onLogin}
        className="text-xl p-2 px-10 border border-blue-300 rounded-md mb-4 focus:outline-none focus:border-blue-700 text-white bg-blue-600 hover:bg-blue-500"
      >
        Log in
      </button>
      <Link
        className="mb-4 text-md text-blue-700 hover:text-blue-500 hover:underline"
        href="/login"
      >
        Forgotten Password?
      </Link>
      <hr />
      <Link
        href="/signup"
        className="text-xl p-2 border ps-4 pe-4 border-green-300 rounded-md mb-4 focus:outline-none focus:border-green-700 text-white bg-green-600 hover:bg-green-500"
      >
        Create new account
      </Link>
    </div>
  );
}
