from fastapi import APIRouter,FastAPI,HTTPException, File, UploadFile
from backend.crud import get_card_by_id, del_cards, get_user_by_id, del_users, add_users, get_cards, add_cards
import sqlite3
import os
import shutil
from datetime import datetime, timedelta

router = APIRouter()

#connect get_card_by_id to api route
@router.get("/cards/{id}")
def read_cards(id:int):
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    card = get_card_by_id(conn, id)
    conn.close()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

#get all cards
@router.get("/cards/")
def get_all_cards():
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    conn.row_factory = sqlite3.Row
    cards = get_cards(conn)
    conn.close()
    cards = [dict(card) for card in cards]
    
    if not cards:
        raise HTTPException(status_code=404, detail="No cards found")
    return cards
    

#remove_cards
@router.delete("/cards/{id}")
def remove_cards(id:int):
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    delete = del_cards(conn,id)
    conn.close()
    if not delete == 0:
        raise HTTPException(status_code=404,detail="Card not deleted")
    return {"message": f"Card with id {id} successfully deleted"}

#add_cards
@router.post("/cards/")
def adding_cards(card:dict):
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    new_id = add_cards(conn, (card["title"], card["description"], card["image_url"], card["user_instagram"]))
    conn.close()
    
    if not new_id:
        raise HTTPException(status_code=400, detail="Card not added")
    return {"message": f"Card successfully added with id {new_id}"}


#get user
@router.get("/users/{id}")
def read_users(id:int):
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    card = get_user_by_id(conn, id)
    conn.close()
    if not card:
        raise HTTPException(status_code=404, detail="User not found")
    return card

#remove user
@router.delete("/users/{id}")
def remove_cards(id:int):
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    delete = del_users(conn,id)
    conn.close()
    if not delete == 0:
        raise HTTPException(status_code=404,detail="User not deleted")
    return {"message": f"User with id {id} successfully deleted"}

#add user
@router.post("/users/")
def add_user(user:dict):
    conn = sqlite3.connect(os.path.abspath("cards.db"))
    new_id = add_users(conn, (user["name"], user["email"], user["instagram"], user["created_at"]))
    conn.close()
    
    if not new_id:
        raise HTTPException(status_code=400, detail="User not added")
    return {"message": f"User successfully added with id {new_id}"}
      
@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_path=f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {"file_path": file_path,"expires_at": datetime.utcnow()+ timedelta(hours=24)}