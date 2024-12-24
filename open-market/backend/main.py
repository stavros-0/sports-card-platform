from fastapi import FastAPI
from routers import cards
from routers.auth.google import router as google_auth_router

app = FastAPI()
app.include_router(cards.router)
app.include_router(google_auth_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Open Market"}

