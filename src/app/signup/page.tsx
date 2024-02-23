"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  // if button disabled no body can press it. But if false we can press it.
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("User created successfully.");
      console.log("Sign up success", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error("Sign up failed! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-sky-100 py-2">
      <div className="flex items-center mb-6 justify-center text-5xl font-bold text-sky-900 drop-shadow-md shadow-sky-300">
        Create your account
      </div>
      <div className="flex flex-col items-center gap-5 bg-white/60 p-10 rounded-3xl backdrop-blur">
        <div className="text-3xl font-bold drop-shadow-md shadow-sky-300 text-sky-700">
          Sign up
        </div>
        <input
          className="text-lg p-2 border border-slate-300 rounded-md focus:outline-none focus:border-sky-700 text-black"
          id="userName"
          type="text"
          value={user.username}
          // ...user will keep everything same and only the userName will be changed in user variable using setUser.
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="UserName"
        />
        <input
          className="text-lg p-2 border border-slate-300 rounded-md focus:outline-none focus:border-sky-700 text-black"
          id="email"
          type="text"
          value={user.email}
          // ...user will keep everything same and only the email will be changed in user variable using setUser.
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email address"
        />
        <input
          className="text-lg p-2 border border-slate-300 rounded-md focus:outline-none focus:border-sky-700 text-black"
          id="password"
          type="password"
          value={user.password}
          // ...user will keep everything same and only the password will be changed in user variable using setUser.
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <div className="flex flex-col items-center w-full gap-2 mt-4">
          <button
            onClick={onSignup}
            className="text-xl p-1.5 w-full border border-sky-300 rounded-md focus:outline-none focus:border-sky-700 disabled:border-gray-300 text-white bg-sky-600 hover:bg-sky-500 disabled:bg-gray-300"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
          <Link
            href="/login"
            className="text-xl p-1.5 w-full border border-lime-300 rounded-md focus:outline-none focus:border-lime-700 text-white bg-lime-600 hover:bg-lime-500 text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
