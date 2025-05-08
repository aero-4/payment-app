import enum
import random
from typing import Dict, List

from tortoise import fields, Model
from pydantic import BaseModel


class Config(BaseModel):
    app_name: str
    wallets: Dict[str, Dict[str, List]]


class InvoiceModel(Model):

    class Statuses(enum.Enum):
        created = "created"
        payed = "payed"

    class Type:
        trc20 = 'trc20'

    id = fields.CharField(max_length=64, pk=True)
    date = fields.DatetimeField(auto_now=True)
    amount = fields.FloatField()
    type = fields.CharField(max_length=16, default=Type.trc20)
    status = fields.CharField(max_length=16, default=Statuses.created)
    address = fields.CharField(max_length=64, default=random.choice(Config.wallets[type]))
