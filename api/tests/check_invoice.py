


import requests


r = requests.get(
    "http://127.0.0.1:8000/invoice/update/b93b8d1e-b944-48cf-8855-ea6c19175945",
)

print(r.json())