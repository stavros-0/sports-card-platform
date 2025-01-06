import { useState } from "react";
import axios from "axios";
import {useDropzone} from "react-dropzone";
import { useCallback } from "react";
import DropZone from "../components/DropZone"


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
        
    } 

    
    

    return(
        <div className="justify-center align-center">

        <form onSubmit={handleSubmit} className="flex gap-4 justify-center m-5 p-5 ">
            <DropZone />
            <div className="flex flex-col gap-4 w-2/3">
            <input type="text" placeholder="Card Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="p-2 border border-gray-300 rounded w-full"/>
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="p-2 border border-gray-300 rounded w-full"/>
            <input type="text" placeholder="Instagram" value={formData.user_instagram} onChange={(e) => setFormData({...formData, user_instagram: e.target.value})} className="p-2 border border-gray-300 rounded w-full"/>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="p-2 border border-gray-300 rounded w-full"/>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"> Add Card</button>
            </div>
        </form>
        </div>

    );
}