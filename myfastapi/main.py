from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/items")
def create_item(name: str, db: Session = Depends(get_db)):
    item = models.Item(name=name)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
