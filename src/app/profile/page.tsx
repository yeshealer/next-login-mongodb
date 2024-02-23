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
    <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-slate-100 py-2">
      <h1 className="text-black font-bold text-xl">Profile</h1>
      <h2 className="p-3 text-black font-bold text-xl">
        User Details:{" "}
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        onClick={logout}
        className="text-xl p-2 px-12 border border-green-300 rounded-md mb-4 focus:outline-none focus:border-green-700 text-white bg-green-600 hover:bg-green-500"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="text-xl p-2 px-12 border border-green-300 rounded-md mb-4 focus:outline-none focus:border-green-700 text-white bg-green-600 hover:bg-green-500"
      >
        Get User Details
      </button>
    </div>
  );
}
