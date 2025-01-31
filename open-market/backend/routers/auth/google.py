from fastapi import APIRouter, HTTPException, Response, Depends, status

from fastapi.responses import RedirectResponse
import urllib.parse
from dotenv import load_dotenv
import os
import requests
from fastapi.responses import RedirectResponse
import sqlite3
import os


router = APIRouter()
load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
REDIRECT_URI = os.getenv('REDIRECT_URI')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
PROJECT_DIR = os.path.dirname(os.path.abspath("open-market"))
DB_PATH = os.path.join(PROJECT_DIR, "cards.db") 
FRONTEND_URL = os.getenv("FRONTEND_URL")


#Generates a Google OAuth URL and redirects the user to Google for login and consent.
@router.get("/auth/google")
def google_login():
    google_auth_url = ("https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "profile email",
    }))
    return RedirectResponse(url=google_auth_url)

#Handles the redirect from Google after user login.
@router.get("/auth/google/callback")
def google_callback(code: str, response: Response):
    token_url = "https://oauth2.googleapis.com/token"
    payload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI,
    }
    token_response = requests.post(token_url, data=payload)
    token_data = token_response.json()
    access_token = token_data.get("access_token")

    if not access_token:
        raise HTTPException(status_code=400, detail="Failed to retrieve access token")
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, samesite="Lax", secure=True) 

    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo",
                             headers={"Authorization": f"Bearer {access_token}"}).json()
    
    name = user_info.get("name")
    email = user_info.get("email")
    instagram = None

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    existing_user = cur.execute(
        "SELECT * FROM users WHERE email = ?", (email,)
    ).fetchone()
    if existing_user:
        frontend_url = f"http://localhost:5173/home"
        return RedirectResponse(url=frontend_url)
    else:
        cur.execute(
            "INSERT INTO users (name, email, instagram) VALUES(?,?,?)",
            (name, email,instagram )
        )
        conn.commit()
        new_user_id = cur.lastrowid
        conn.close()
        frontend_url = f"http://localhost:5173/home"
        return RedirectResponse(url=frontend_url)
        

    

