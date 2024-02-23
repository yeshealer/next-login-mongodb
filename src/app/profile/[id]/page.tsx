import Link from "next/link";

export default function userPage({ params }: any) {
  return (
    <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-sky-100 py-2">
      <div className="flex flex-col items-center gap-5 bg-white/60 p-10 rounded-3xl backdrop-blur">
        <div className="text-3xl font-bold drop-shadow-md shadow-sky-300 text-sky-700">
          Profile
        </div>
        <div className="font-semibold text-sky-500 text-xl">{params.id}</div>
        <Link
          href="/profile"
          className="text-xl p-1.5 w-full border border-rose-300 text-center rounded-md focus:outline-none focus:border-rose-700 text-white bg-rose-600 hover:bg-rose-500"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
