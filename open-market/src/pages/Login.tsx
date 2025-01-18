export default function Login(){
    
    return(
        // add a button that redirects to the Google OAuth URL
        // design the button to look like a button
        //add login page
        <div className="flex justify-center items-center h-screen bg-gray-800 animate-fade-in-down">
            
        <button onClick ={()=> window.location.href = "http://localhost:8000/auth/google" }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Login With Google
        </button>
        
        
        
        </div>
    )
}