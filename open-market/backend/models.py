import sqlite3

conn = sqlite3.connect("cards.db")
cursor = conn.cursor()

sql = '''CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique ID for the card
    title TEXT NOT NULL,                  -- Title of the card
    description TEXT,                     -- Card description
    image_url TEXT NOT NULL,              -- URL of the uploaded card image
    user_instagram TEXT NOT NULL,         -- Instagram handle of the uploader
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when card was uploaded
    expires_at DATETIME,                  -- Timestamp when card will expire (24 hours later)
    downvotes INTEGER DEFAULT 0           -- Number of downvotes
);'''

cursor.execute(sql)
print("Table created")
conn.commit()
conn.close()