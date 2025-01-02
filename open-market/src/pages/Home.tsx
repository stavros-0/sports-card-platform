import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "../types/Card";
import AddCardForm from "../components/AddCardForm";

export default function Home(){
    const [cards,setCards] = useState<Card[]>([]);
    useEffect(()=>{
        axios.get("http://localhost:8000/cards/")
        .then((response) => setCards(response.data))
        .catch((error)=> console.error(error));
    },[]);
    
    return(
        <>
        <AddCardForm/>
        <div className="card-grid">
            {cards.map((card) =>
            <div key={card.id} className="card">
                <img src={card.image_url} alt={card.title}/>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <span>Posted by: {card.user_instagram}</span>
            </div>
            )}
        </div>
        </>
        
    );
};