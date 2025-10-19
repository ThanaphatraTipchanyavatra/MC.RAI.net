# fastapi/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import connect_db, disconnect_db
from database import Base, engine


from routes.users import router as users_router
from routes.purchase import router as purchase_router
from routes.topup import router as topup_router
from routes.packages import router as packages_router
from routes import items, leaderboard
# from routes import topup  # ← keep disabled to avoid duplicates

app = FastAPI()

# CORS for Next.js
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

@app.get("/api/health")
def health():
    return {"ok": True}

# MOUNT everything under /api
app.include_router(users_router,       prefix="/api")
app.include_router(purchase_router,    prefix="/api")
app.include_router(topup_router,       prefix="/api")
app.include_router(packages_router,    prefix="/api")
app.include_router(items.router,       prefix="/api")
app.include_router(leaderboard.router, prefix="/api")
# app.include_router(topup.router, prefix="/api/topup")
