from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise import Tortoise



@asynccontextmanager
async def lifespan(app: FastAPI):
    await Tortoise.init(config={
        "connections": {"default": "sqlite://db.sqlite3"},
        "apps": {
            "models": {
                "models": ['models'],
                "default_connection": "default",
            }
        },
    })
    print("Tortoise ORM initialized")
    await Tortoise.generate_schemas()

    yield

    await Tortoise.close_connections()
    print("Tortoise ORM connections closed")


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


