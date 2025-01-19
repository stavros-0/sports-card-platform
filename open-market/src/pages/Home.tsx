import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "../types/Card";



export default function Home(){
    const [cards,setCards] = useState<Card[]>([]);
    useEffect(()=>{
        axios.get("http://localhost:8000/cards/")
        .then((response) => setCards(response.data))
        .catch((error)=> console.error(error));
    },[]);

    const isValidInstagramUsername = (username: string) => {

        const trimmedUsername = username.trim();
        return /^[a-zA-Z0-9._]+$/.test(trimmedUsername);
    }

    const redirectToInstagram = (username: string) =>{
        if (!isValidInstagramUsername(username)) {
            console.error("Invalid Instagram username");
            return;
        }
        
        const instagramURL = `https://instagram.com/${encodeURIComponent(username)}`;
        window.open(instagramURL, "_blank");
    };
    return (
        <div className="w-full flex justify-center items-center bg-gray-800 md:pt-20">
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 md:p-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="border border-gray-300 rounded p-3 mb-4 flex flex-col items-center w-72 sm:w-64 md:w-60"
                    >
                        <img src={card.image_url} alt={card.title} className="w-full h-full object-cover" />
                        <h2 className="text-lg font-semibold mt-2">{card.title}</h2>
                        <p className="text-sm font-semibold mt-1">{card.description}</p>
                        <span
                            onClick={() => redirectToInstagram(card.user_instagram)}
                            className="text-center bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105 m-2"
                        >
                            Posted by: {card.user_instagram}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};