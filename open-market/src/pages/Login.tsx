export default function Login(){
    
    return(
        <>
        <button onClick ={()=> window.location.href = "http://localhost:8000/auth/google" }>
            Login With Google
        </button>
        <h3>Login</h3>
        
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <input type="button" id="enter" value="Login"/>
        <h3>Sign Up</h3>
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <input type="button" id="enter" value="Sign Up"/>
        </>
    )
}