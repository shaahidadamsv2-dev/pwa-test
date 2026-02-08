from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    name: str | None = None

class UserOut(BaseModel):
    id: int
    email: str
    name: str | None

    class Config:
        from_attributes = True

class TransactionCreate(BaseModel):
    amount: float
    category: str | None = None

class TransactionOut(BaseModel):
    id: int
    amount: float
    category: str | None

    class Config:
        from_attributes = True