import requests

url = "https://api.locationiq.com/v1/autocomplete"

address = '75 Thorncliffe Park Drive'
data = {
    'key': 'pk.411df6312f5fe8cd1b8d7c290413ee30',
    'q': address
}

response = requests.get(url, params=data)
res  = response.json()
print(res)
