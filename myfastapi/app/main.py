from fastapi import FastAPI
from myfastapi.app.routers import transactions
from .database import engine
from .models import Base
from .routers import users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI CRUD")

app.include_router(users.router)
app.include_router(transactions.router)

@app.get("/health")
def health():
    return {"status": "ok"}
