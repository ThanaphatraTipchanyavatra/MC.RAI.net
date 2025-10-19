# fastapi/routes/packages.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, Package

router = APIRouter()

@router.get("/packages")
def list_packages(db: Session = Depends(get_db)):
    packs = db.query(Package).all()
    return [
        {"id": p.id, "title": p.title, "points": p.points, "price": float(p.price)}
        for p in packs
    ]

@router.post("/packages/buy")
def buy_package(user_id: int, package_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    pkg = db.query(Package).filter(Package.id == package_id).first()
    if not user or not pkg:
        raise HTTPException(status_code=404, detail="User or package not found")

    user.points += pkg.points
    db.commit()
    db.refresh(user)

    return {
        "message": f"Top-up successful! +{pkg.points} pts",
        "total_points": user.points,  # <— important for frontend sync
    }
