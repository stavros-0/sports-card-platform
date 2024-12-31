import sqlite3

def add_cards(conn, card):
    sql = ''' INSERT INTO cards(title, description, image_url, user_instagram, expires_at)
              VALUES(?,?,?,?,?) '''
    try:
        cur = conn.cursor()
        cur.execute(sql, card)
        conn.commit()
        return cur.lastrowid
    except sqlite3.OperationError as e:
        print(e)
        return -1

def del_cards(conn,id):
    sql = ''' DELETE FROM cards WHERE id=?'''
    try:
        cur = conn.cursor()
        cur.execute(sql, (id,))
        conn.commit()
        return cur.rowcount
    except sqlite3.OperationalError as e:
        print(e)
        return 0

def get_cards(conn):
    sql = ''' SELECT * FROM cards '''
    try: 
        cur = conn.cursor()
        cur.execute(sql)
        return cur.fetchall()  # Fetch all rows from the query
    except sqlite3.OperationalError as e:
        print(e)
        return None

def get_card_by_id(conn, id):
    sql = ''' SELECT * FROM cards WHERE id = ? '''
    try:
        cur = conn.cursor()
        cur.execute(sql, (id,))
        return cur.fetchone()  
    except sqlite3.OperationalError as e:
        print(e)
        return None
    

def del_users(conn,id):
    sql = ''' DELETE FROM users WHERE id=?'''
    try:
        cur = conn.cursor()
        cur.execute(sql, (id,))
        conn.commit()
        return cur.rowcount
    except sqlite3.OperationalError as e:
        print(e)
        return 0   
    
def get_user_by_id(conn, id):
    sql = ''' SELECT * FROM users WHERE id = ? '''
    try:
        cur = conn.cursor()
        cur.execute(sql, (id,))
        return cur.fetchone()  
    except sqlite3.OperationalError as e:
        print(e)
        return None
    
def add_users(conn, card):
    sql = ''' INSERT INTO users(name, email, instagram, created_at)
              VALUES(?,?,?,?) '''
    try:
        cur = conn.cursor()
        cur.execute(sql, card)
        conn.commit()
        return cur.lastrowid
    except sqlite3.OperationError as e:
        print(e)
        return -1
    
