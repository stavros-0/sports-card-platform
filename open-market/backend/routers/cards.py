from fastapi import APIRouter,FastAPI,HTTPException
from crud import get_card_by_id, del_cards, get_cards
import sqlite3

router = APIRouter()

#connect get_card_by_id to api route
@router.get("/cards/{id}")
def read_cards(id:int):
    conn=sqlite3.connect("cards.db")
    card = get_card_by_id(conn, id)
    conn.close()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

#remove_cards
@router.delete("cards/{id}")
def remove_cards(id:int):
    conn=sqlite3.connect("cards.db")
    delete = del_cards(conn,id)
    conn.close()
    if not delete == 0:
        raise HTTPException(status_code=404,detail="Card not deleted")
    return {"message": f"Card with id {id} successfully deleted"}

#add_cards
@router.post("cards/")
def add_cards(card:dict):
    conn=sqlite3.connect("cards.db")
    new_id = add_cards(conn, (card["title"], card["description"], card["image_url"], card["user_instagram"], card["expires_at"]))
    conn.close()
    conn.close()
    if not new_id:
        raise HTTPException(status_code=400, detail="Card not added")
    return {"message": f"Card successfully added with id {new_id}"}