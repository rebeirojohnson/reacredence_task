import requests

response = requests.delete(url="http://127.0.0.1:8000/api/items/",json={"product_id":"3"})

print(response.content)