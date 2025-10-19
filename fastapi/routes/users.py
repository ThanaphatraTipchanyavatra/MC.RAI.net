# fastapi/routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User

router = APIRouter()

@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # points == crystals
    return {
        "id": user.id,
        "username": user.username,
        "rank": user.rank_name if hasattr(user, "rank_name") else "Coal",
        "points": user.points,  # <— points (aka crystals)
    }

# (optional) legacy endpoint for your old frontend:
@router.get("/points")
def get_points(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"points": user.points}
