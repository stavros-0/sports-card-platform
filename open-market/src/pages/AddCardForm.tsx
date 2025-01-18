import { useState, useEffect } from "react";
import axios from "axios";
import DropZone from "../components/DropZone"

export default function AddCardForm(){
    
    const [formData,setFormData] = useState({title: "", description: "", image_url: "", user_instagram: ""});
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data before submitting: ", formData);
        axios.post("http://localhost:8000/cards/",formData)
        .then(() => {
            setFormData({title:"", description:"", image_url: "", user_instagram: ""});
            alert("Card added successfully!");
        })
        .catch((err) => console.error(err));
    }

    const handleImageUpload = async (file:File) => {
            
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);

            try {
                const res = await axios.post("http://localhost:8000/upload/", uploadFormData);
                console.log("Image uploaded: ", res.data.url);
                setFormData((prev) => ({ ...prev, image_url: res.data.url }));
                console.log("Updated formData:", formData);
            }catch(err) {
                console.error("Error uploading image:", err);
            }
    } 

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); 
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="md:w-full max-w-5xl max-h-3xl bg-white shadow-lg rounded-lg p-8 max-md:max-w-xs">
                <div className="flex items-center pb-3 border-b border-gray-200">
                    <div className="flex-1">
                        <h3 className="text-center text-gray-800 text-xl font-bold">Upload Your Card</h3>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                        viewBox="0 0 320.591 320.591">
                    </svg>
                </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center m-5 p-5">
        {isMobile ? (
            <input type="file" accept="image/*" capture="environment"
                onChange={(e) => {
                    if (e.target.files) {
                        handleImageUpload(e.target.files[0]);
                    }}}/>
                    ) : (<DropZone handleImageUpload={handleImageUpload} />)}
            <div className="flex flex-col gap-4 w-full">
            <input type="text" placeholder="Card Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    className="text-xl p-2 rounded bg-gray-100 text-gray-800 border border-transparent focus:border-blue-500 focus:outline-none focus:outline--gray-500 selection:bg-blue-300" required/>

            <textarea  placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="text-lg resize-y rounded-md p-2 rounded bg-gray-100 text-gray-800 border border-transparent focus:border-blue-500 focus:outline-none h-32 selection:bg-blue-300"required/>
            
            <input type="text" placeholder="Instagram" value={formData.user_instagram} onChange={(e) => setFormData({...formData, user_instagram: e.target.value})} 
                    className="text-lg p-2 rounded bg-gray-100 text-gray-800 border border-transparent focus:border-blue-500 focus:outline-none selection:bg-blue-300" required/>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"> Add Card</button>
            </div>
        </form>
        </div>
        </div>
       
    );
}