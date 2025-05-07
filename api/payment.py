class Payments:

    def __init__(self):
        ...


    async def check_invoice(self, id: str) -> bool:
        await self.check_card()
        await self.check_crypto()

        return False


    async def check_card(self):
        ...


    async def check_crypto(self):
        ...
