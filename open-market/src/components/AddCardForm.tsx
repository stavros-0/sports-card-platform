import { useState, useEffect } from "react";
import axios from "axios";
export default function AddCardForm(){
    
    const [formData,setFormData] = useState({title: "", description: "", image_url: "", user_instagram: ""});
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:8000/cards/",formData)
        .then(() => {
            alert("Card added successfully!");
            setFormData({title:"", description:"", image_url: "", user_instagram: ""});
        })
        .catch((err) => console.error(err));
    }

    

    /*const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const formData = new FormData();
            formData.append("file",e.target.files[0]);
            axios.post("http://localhost:8000/upload", formData)
            .then((res)=>console.log("Image uploaded: ", res.data))
            .catch((err)=> console.error(err));
        }
    }*/

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Card Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
            <input type="text" placeholder="Instagram" value={formData.user_instagram} onChange={(e) => setFormData({...formData, user_instagram: e.target.value})}/>
            <input type="text" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})}/>
            <button type="submit"> Add Card</button>
        </form>
    );
}