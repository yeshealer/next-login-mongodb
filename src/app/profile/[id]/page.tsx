export default function userPage({params}:any){
    
    return(
        <div className="flex flex-col min-h-screen flex flex-col items-center justify-center bg-slate-100 py-2">
            <h1 className="text-black font-bold text-xl">Profile</h1>
            
            <p className="text-black font-bold text-xl">
                <span> {params.id} </span>
            </p>
        </div>
    )
}