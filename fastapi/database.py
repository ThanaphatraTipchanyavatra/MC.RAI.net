from databases import Database
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# PostgreSQL connection details
# PostgreSQL connection details (LOCAL)
POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "mcserver"
POSTGRES_HOST = "localhost"  # changed from 'db' to 'localhost'
POSTGRES_PORT = "5432"


ASYNC_DATABASE_URL = (
    f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)
SYNC_DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)

# SQLAlchemy setup (for models)
engine = create_engine(SYNC_DATABASE_URL)
metadata = MetaData()
Base = declarative_base()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Databases library setup (for async operations)
database = Database(ASYNC_DATABASE_URL)

# Async connection handlers
async def connect_db():
    await database.connect()
    print("✅ Database connected")

async def disconnect_db():
    await database.disconnect()
    print("❎ Database disconnected")

# Example async functions (optional)
async def insert_user(username: str, password_hash: str, email: str):
    query = """
    INSERT INTO users (username, password, email)
    VALUES (:username, :password_hash, :email)
    RETURNING id, username, email, created_at
    """
    values = {"username": username, "password_hash": password_hash, "email": email}
    return await database.fetch_one(query=query, values=values)

async def get_user(user_id: int):
    query = "SELECT * FROM users WHERE id = :user_id"
    return await database.fetch_one(query=query, values={"user_id": user_id})

async def update_user(user_id: int, username: str, password_hash: str, email: str):
    query = """
    UPDATE users 
    SET username = :username, password = :password_hash, email = :email
    WHERE id = :user_id
    RETURNING id, username, email, created_at
    """
    values = {"user_id": user_id, "username": username, "password_hash": password_hash, "email": email}
    return await database.fetch_one(query=query, values=values)

async def delete_user(user_id: int):
    query = "DELETE FROM users WHERE id = :user_id RETURNING *"
    return await database.fetch_one(query=query, values={"user_id": user_id})
