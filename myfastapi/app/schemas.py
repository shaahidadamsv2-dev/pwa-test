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
