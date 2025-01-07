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
    return(
        <div className="justify-center m-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            {cards.map((card) =>
            <div key={card.id} className="border border-gray-300 rounded p-3 mb-4 flex flex-col items-center w-80">
                <img src={card.image_url} alt={card.title} className="w-full h-full object-cover" />
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <span onClick={() => redirectToInstagram(card.user_instagram)}>Posted by: {card.user_instagram}</span>
            </div>
            )}
         </div>
        </div>
    
        
    );
};