import { useState } from "react";
import axios from "axios";
export default function AddCardForm(){
    
    const [formData,setFormData] = useState({title: "", description: "", image_url: "", user_instagram: ""});
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data before submitting: ", formData);
        axios.post("http://localhost:8000/cards/",formData)
        .then(() => {
            alert("Card added successfully!");
            setFormData({title:"", description:"", image_url: "", user_instagram: ""});
        })
        .catch((err) => console.error(err));
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            
            const uploadFormData = new FormData();
            uploadFormData.append("file", e.target.files[0]);
            try {
                const res = await axios.post("http://localhost:8000/upload/", uploadFormData);
                console.log("Image uploaded: ", res.data.url);
                setFormData((prev) => ({ ...prev, image_url: res.data.url }));
                console.log("Updated formData:", formData);
            }catch(err) {
                console.error("Error uploading image:", err);
            }
        }
        
    };
    

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Card Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
            <input type="text" placeholder="Instagram" value={formData.user_instagram} onChange={(e) => setFormData({...formData, user_instagram: e.target.value})}/>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
            <button type="submit"> Add Card</button>
        </form>
    );
}