from bs4 import BeautifulSoup
import requests

url = "https://www.sirved.com/"
request = requests.get(url).text 
doc = BeautifulSoup(request, "html.parser")


