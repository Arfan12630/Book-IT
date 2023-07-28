from bs4 import BeautifulSoup
import requests
url = "https://www.yelp.ca/search?find_desc=restaurants+near+me&find_loc=256+phillip+street"
result = requests.get(url).text
doc = BeautifulSoup(result, "html.parser")


menuNames = doc.find('a', class_ = "css-19v1rkv")

href = menuNames['href']
print(href)
# menuNames = doc.find_all('a',class_='css-19v1rkv')
# rlist = []
# for menuName in menuNames[3:]:
#     string = menuName.text
#     rlist.append(string)
    
# print(rlist)