import uuid

from fastapi import HTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse

from app import app
from models import InvoiceModel

from wallets import CryptoWalletTRC20


async def distributor(invoice: InvoiceModel):
    if invoice.type == InvoiceModel.Type.trc20:
        wallet = CryptoWalletTRC20(invoice.address)
        tx = wallet.build_unsigned_usdt_tx(invoice.amount)
        if not wallet.check_invoice(tx):
            return HTTPException(status_code=401, detail='No payed')

    invoice.status = InvoiceModel.Statuses.payed
    await invoice.save()
    return JSONResponse(content='ok')


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

    return distributor(invoice)
