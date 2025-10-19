from sqlalchemy import func
from fastapi import APIRouter, Depends
from database import get_db
from models import User, TopUp
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/leaderboard/topspenders")
def get_top_spenders(db: Session = Depends(get_db), limit: int = 10):
    results = (
        db.query(
            User.username,
            func.sum(TopUp.amount_baht).label("total_spent")
        )
        .join(TopUp, TopUp.user_id == User.id)
        .group_by(User.username)
        .order_by(func.sum(TopUp.amount_baht).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "rank": i + 1,
            "username": r.username,
            "total_spent": float(r.total_spent)
        }
        for i, r in enumerate(results)
    ]
