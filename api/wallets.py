from tronpy import AsyncTron, Tron
from tronpy.providers import AsyncHTTPProvider, HTTPProvider


class CryptoWalletTRC20:
    USDT_CONTRACT = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'
    TRON_NODE_URL = 'https://api.trongrid.io'

    def __init__(self, wallet_address: str):
        self.client = AsyncTron(provider=AsyncHTTPProvider(self.TRON_NODE_URL))
        self.sync_client = Tron(provider=HTTPProvider(self.TRON_NODE_URL))
        self.wallet = wallet_address
        self._unsigned_tx = None

    async def check_invoice(self, tx_id: str) -> dict:
        return await self.client.get_transaction_info(tx_id)

    async def get_usdt_balance(self) -> float:
        ctr = await self.client.get_contract(self.USDT_CONTRACT)
        bal = await ctr.functions.balanceOf(self.wallet)
        return bal / 1_000_000

    def build_unsigned_usdt_tx(self, amount: float) -> dict:
        ctr = self.sync_client.get_contract(self.USDT_CONTRACT)
        qty = int(amount * 1_000_000)
        unsigned = (
            ctr.functions.transfer(
                'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
                qty
            )
            .with_owner(self.wallet)
            .fee_limit(10_000_000)
            .build()
        )
        self._unsigned_tx = unsigned
        return unsigned

    async def broadcast_signed_tx(self, signed_tx: dict) -> str:
        res = await self.client.broadcast(signed_tx)
        return res["txid"]

    async def close(self):
        await self.client.close()
