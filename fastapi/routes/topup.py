from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from datetime import datetime

router = APIRouter()

@router.post("/topup")
def top_up_points(user_id: int, amount: int, db: Session = Depends(get_db)):
    """
    Add (top-up) points to a user's account.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    # Add points
    user.points += amount
    db.commit()
    db.refresh(user)

    return {
        "status": "success",
        "message": f"✅ Top-up successful! Added {amount} points.",
        "total_points": user.points
    }
