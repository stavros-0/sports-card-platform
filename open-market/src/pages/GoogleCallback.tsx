import React, {useEffect} from 'react';
import axios from 'axios';

//FC = Functional component, and is used to return jsx and is stateless or state-managed
const GoogleCallback: React.FC = () => {
    useEffect(() => {
        //extract the code parameter from the URL. 
        const queryParams = new URLSearchParams(window.location.search);
        const code: string | null = queryParams.get("code");

        if (code){
            axios.get(`http://localhost:8000/auth/google/callback?code=${code}`).then((response)=> {
                const token = response.data.token;
                localStorage.setItem("token",token);
                localStorage.setItem("user",JSON.stringify(response.data.user));
                window.location.href = "/home";
            })
            .catch((error)=> {
                console.error("Error during Google login:", error);
            });
        } else{
            console.error("No code parameter found in URL");
        }
    },[]);
    return <div>Processing Google Login...</div>
}
export default GoogleCallback;