from fastapi import APIRouter, HTTPException
import urllib.parse
from dotenv import load_dotenv
import os
import requests

router = APIRouter()
load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
REDIRECT_URI = os.getenv('REDIRECT_URI')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

@router.get("/auth/google")
def google_login():
    google_auth_url = ("https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "profile email",
    }))
    return {"url": google_auth_url}

@router.get("/auth/google/callback")
def google_callback(code: str):
    token_url = "https://ouath2.googleapis.com/token"
    payload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI,
    }
    token_response = requests.post(token_url, data=payload)
    token_data = token_response.json()

    if "access_token" not in token_data:
        raise HTTPException(status_code=400, detail="Failed to retrieve access token")
    
    access_token = token_data["access_token"]

    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo",
                             headers={"Authorization": f"Bearer {access_token}"}).json()
    
    return {"user": user_info}