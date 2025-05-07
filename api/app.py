import uuid

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from tortoise import Tortoise

from models import InvoiceModel
from payment import Payments


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


@app.get('/invoice/create')
async def handle_create_invoice(request: Request):
    try:
        data = await request.json()
        m = await InvoiceModel.create(id=uuid.uuid4(),
                                      amount=data.get('amount'), )
        return m
    except:
        return HTTPException(status_code=404, detail="You have a problem")


@app.get('/invoice/update/{id}')
async def handle_create_invoice(id: str):
    invoice = await InvoiceModel.get_or_none(id=id)
    if not invoice:
        return HTTPException(status_code=400, detail='Invoice not found')

    if not await Payments().check_invoice(id):
        return HTTPException(status_code=401, detail='No payed')

    invoice.status = InvoiceModel.Statuses.payed
    await invoice.save()

    return JSONResponse(content='ok')
