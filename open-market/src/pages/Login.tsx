
import axios from 'axios';
import {useEffect} from 'react';

export default function Login(){
    const fetchUserInfo = async (code: string) =>{
        const response = await axios.get(`http://localhost:8000/auth/google/callback?code=${code}`);
        console.log(response.data.user);
    }
    useEffect(() =>{
        const queryParams = new URLSearchParams(window.location.search);
        const code: string | null = queryParams.get('code');
        if (code){
            fetchUserInfo(code);
        }
    },[])
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