"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function Profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [data, setData] = React.useState("nothing");

  const getUserDetails = async () => {
    const resp = await axios.get("/api/users/home");
    console.log(resp.data);
    setData(resp.data.data._id);
  };

  return (
    <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-sky-100 py-2">
      <div className="flex flex-col items-center gap-5 bg-white/60 p-10 rounded-3xl backdrop-blur">
        <div className="text-3xl font-bold drop-shadow-md shadow-lime-300 text-lime-700">
          Successfully Logged in
        </div>

        <div className="flex flex-col items-center w-full gap-2 mt-4">
          <button
            onClick={logout}
            className="text-xl p-1.5 w-full border border-rose-300 rounded-md focus:outline-none focus:border-rose-700 text-white bg-rose-600 hover:bg-rose-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
