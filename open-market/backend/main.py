from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import cards
from .routers.auth.google import router as google_auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cards.router)
app.include_router(google_auth_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Open Market"}

