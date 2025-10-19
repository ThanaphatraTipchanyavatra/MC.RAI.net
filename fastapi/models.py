from sqlalchemy import (
    Column, Integer, String, DateTime, ForeignKey, Numeric, Float
)
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

# =======================
# BASE MODEL
# =======================
Base = declarative_base()


# =======================
# RANKS TABLE
# =======================
class Rank(Base):
    __tablename__ = "ranks"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    price_points = Column(Integer, nullable=False)

    # Relationships
    users = relationship("User", back_populates="rank")


# =======================
# USERS TABLE
# =======================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(100))
    points = Column(Integer, default=0)
    rank_id = Column(Integer, ForeignKey("ranks.id"), nullable=True)

    # Relationships
    rank = relationship("Rank", back_populates="users")
    purchases = relationship("Purchase", back_populates="user")
    topups = relationship("TopUp", back_populates="user")


# =======================
# PACKAGES TABLE
# =======================
class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    points = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)

    # Relationships
    topups = relationship("TopUp", back_populates="package")


# =======================
# TOPUPS TABLE
# =======================
class TopUp(Base):
    __tablename__ = "topups"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    package_id = Column(Integer, ForeignKey("packages.id"))
    amount_baht = Column(Numeric(10, 2), nullable=False)
    points_added = Column(Integer, nullable=False)
    topup_date = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="topups")
    package = relationship("Package", back_populates="topups")


# =======================
# ITEMS TABLE
# =======================
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255))
    price = Column(Float, nullable=False)
    type = Column(String(50))

    # Relationships
    purchases = relationship("Purchase", back_populates="item")


# =======================
# PURCHASES TABLE
# =======================
class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    purchase_date = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="purchases")
    item = relationship("Item", back_populates="purchases")
