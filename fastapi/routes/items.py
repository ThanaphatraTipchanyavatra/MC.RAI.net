from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Item

router = APIRouter()

@router.get("/items")
def get_all_items(db: Session = Depends(get_db)):
    """Fetch all available items from the shop"""
    items = db.query(Item).all()
    if not items:
        raise HTTPException(status_code=404, detail="No items found")

    return [
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "type": item.type,
        }
        for item in items
    ]
