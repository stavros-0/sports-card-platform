import { useState } from "react";
import axios from "axios";
export default function AddCardForm(){
    const [formData,setFormData] = useState({title: "", description: "", image_url: "", user_instagram: ""});
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:8000/cards/",formData)
        .then(() => {
            alert("Card added successfully!");
        })
        .catch((err) => console.error(err));
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Card Name" onChange={(e) => setFormData({...formData, title: e.target.value})}/>
            <input type="text" placeholder="Description" onChange={(e) => setFormData({...formData, description: e.target.value})}/>
            <input type="url" placeholder="Image URL" onChange={(e) => setFormData({...formData, image_url: e.target.value})}/>
            <input type="text" placeholder="Instagram" onChange={(e) => setFormData({...formData, image_url: e.target.value})}/>
            <button type="submit"> Add Card</button>
        </form>
    );
}