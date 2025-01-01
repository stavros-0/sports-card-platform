import sqlite3
import os

db_path = os.path.abspath("cards.db")
conn = sqlite3.connect(db_path)

print(f"Connected to database at {db_path}")

cursor = conn.cursor()

cards_table = ('''CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL,                  
    description TEXT,                    
    image_url TEXT NOT NULL,              
    user_instagram TEXT NOT NULL,         
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    expires_at DATETIME,                  
    downvotes INTEGER DEFAULT 0           
);''')

cursor.execute(cards_table)
print("Card table created")

users_table = ('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        instagram TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ); ''')
cursor.execute(users_table)
print("User table created")
conn.commit()
conn.close()