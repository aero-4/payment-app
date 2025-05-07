import enum

from tortoise import fields, Model


class InvoiceModel(Model):

    class Statuses(enum.Enum):
        created = "created"
        payed = "payed"

    id = fields.CharField(max_length=64, pk=True)
    date = fields.DatetimeField(auto_now=True)
    amount = fields.FloatField()
    status = fields.CharField(max_length=16, default=Statuses.created)

