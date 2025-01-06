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
            alert("Card added successfully!");
            setFormData({title:"", description:"", image_url: "", user_instagram: ""});
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
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); 
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    return(
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full before:fixed before:inset-0 before:w-full before:h-full z-[10] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 relative">
                <div className="flex items-center pb-3 border-b border-gray-200">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-xl font-bold">Upload File</h3>
                        <p className="text-gray-600 text-xs mt-1">Upload file to this project</p>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                        viewBox="0 0 320.591 320.591">
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"></path>
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"></path>
                    </svg>
                </div>

       

        <form onSubmit={handleSubmit} className="flex gap-4 justify-center m-5 p-5 ">
        {isMobile ? (
            <input type="file" accept="image/*" capture="environment"
                onChange={(e) => {
                    if (e.target.files) {
                        handleImageUpload(e.target.files[0]);
                        setIsSuccess(true);
                    }}}/>
                    ) : (<DropZone handleImageUpload={handleImageUpload} />)}
            <div className="flex flex-col gap-4 w-2/3">
            <input type="text" placeholder="Card Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="p-2 border border-gray-300 rounded"/>
            <input type="textarea" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="resize-y rounded-md p-2 border border-gray-300 rounded"/>
            <input type="text" placeholder="Instagram" value={formData.user_instagram} onChange={(e) => setFormData({...formData, user_instagram: e.target.value})} className="p-2 border border-gray-300 rounded w-full"/>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"> Add Card</button>
            </div>
        </form>


        </div>
        </div>
       
    );
}