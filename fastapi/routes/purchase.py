from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, Item, Purchase
from datetime import datetime

router = APIRouter()

@router.post("/purchase")
def make_purchase(user_id: int, item_id: int, db: Session = Depends(get_db)):
    print(f"🟢 Purchase request received: user_id={user_id}, item_id={item_id}")
    try:
        user = db.query(User).filter(User.id == user_id).first()
        item = db.query(Item).filter(Item.id == item_id).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")

        if user.points < item.price:
            return {
                "status": "failed",
                "message": f"❌ Not enough points! You have {user.points}, need {item.price}.",
            }

        user.points -= item.price
        purchase = Purchase(user_id=user.id, item_id=item.id, purchase_date=datetime.utcnow())
        db.add(purchase)
        db.commit()
        db.refresh(user)

        return {
            "status": "success",
            "message": f"✅ You bought {item.name}! (-{item.price} pts)",
            "remaining_points": user.points,
        }

    except Exception as e:
        print("❌ Server Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
