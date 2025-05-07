import requests


r = requests.get(
    "http://127.0.0.1:8000/invoice/create",
    json={'amount': 99.10}
)

print(r.json())