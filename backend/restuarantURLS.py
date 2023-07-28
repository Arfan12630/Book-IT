from bs4 import BeautifulSoup
import requests 
import uuid
from flask import Blueprint, request,jsonify
from db_connect import *
restuarant = Blueprint("restuarant", __name__)

def generate_uuid():
    return str(uuid.uuid4())


def getRestaurantUrls(adress, cty, prov,pc,coun,lat,long):
 address = adress
 city = cty
 province = prov
 postalCode = pc
 country = coun
 latitude = lat
 longitude = long
 url = f"https://www.sirved.com/restaurant/{address}-{city}-{province}_{postalCode}-{country}/list?lat={latitude}&lng={longitude}&offset=0"  
 result = requests.get(url).text
 doc = BeautifulSoup(result, "html.parser")
 divClasses = doc.find_all('div',class_="heading")
# print(divClasses)
 listOfUrls = []
 for divClas in divClasses:
    a_tag  = divClas.find('a')
    href = a_tag['href']
    newHref  = 'https://www.sirved.com' + href
    listOfUrls.append(newHref)
 return listOfUrls
#print(getRestaurantUrls("75_thorncliffe_park_dr","east_york","m4h_1l4","ontario","canada",43.7053001,-79.34153909999999))
 



def getRestuarantMenus(url):
    #wil be the url we get from frontend passed in 
    # we want to loop through the menu pictures  
 request = requests.get(url).text 
 doc = BeautifulSoup(request, "html.parser")
 images = doc.find_all('img', class_="swiper-lazy")
 imageList = []
 for image in images:
  imgsrc = image['data-src']
  imageList.append(imgsrc)
 return imageList
#print(getRestuarantMenus("https://www.sirved.com/restaurant/toronto-ontario-canada/galitos-flame-grilled-chicken/743053/menus"))

def getRestuarantCards(adress, cty, prov,pc,coun,lat,long):
 address = adress
 city = cty
 province = prov
 postalCode = pc
 country = coun
 latitude = lat
 longitude = long
 url = f"https://www.sirved.com/restaurant/{address}-{city}-{province}_{postalCode}-{country}/list?lat={latitude}&lng={longitude}&offset=0"  
 result = requests.get(url).text
 doc = BeautifulSoup(result, "html.parser")

 cardData = {}
 cardData['name'] = []
 cardData['imageofCards'] = []

 restuarantCardNameh2 = doc.find_all('h2', class_= "pointer")
 restuarantRating = doc.find_all('span', class_="rating-count")
 restuarantImages = doc.find_all('img', class_="visible")
 restuarantAdress = doc.find_all('span', class_="dec pointer")



 restuarantLogos = [(logo['data-src']) for logo in restuarantImages]
 filteredRestuarantLogos = restuarantLogos[::2]
 cardData['imageofCards'] = filteredRestuarantLogos

 adress_text = [span.text for span in restuarantAdress]
 formattedAddressText = []
 for i in range(0,len(adress_text),2):
   formattedAddressText.append(adress_text[i] + ' ' + adress_text[i+1])
 cardData['address'] = formattedAddressText
   
 
 rating_text = [span.text for span in restuarantRating]
 cardData['rating'] = rating_text


 
 for res in restuarantCardNameh2:
  restuarantCardName = res.find('span').text
  cardData['name'].append(restuarantCardName)

 #looping to make seperate dictionaries 
#  num_values = len(cardData['name'])
 
 return cardData

def getRestuarantImages():
   #put dynamic url in the parmeter
   
   url = ""
   result = requests.get(url).text
   doc = BeautifulSoup(result, "html.parser")
   
   restuarantImages = doc.find_all('img', class_="visible")
   restuarantLogos = [(logo['data-src']) for logo in restuarantImages]
   filteredRestuarantLogos = restuarantLogos[::2]
   return filteredRestuarantLogos
# print (getRestuarantImages)

def getRestaurantCuisinesCards(adress, cty, prov,pc,coun,lat,long, cuisin):
 address = adress
 city = cty
 province = prov
 postalCode = pc
 country = coun 
 latitude = lat
 longitude = long
 cuisine = cuisin
 url = f"https://www.sirved.com/restaurant/{address}-{city}-{province}_{postalCode}-{country}/list?lat={latitude}&lng={longitude}&keyword={cuisine}"
 result = requests.get(url).text
 doc = BeautifulSoup(result, "html.parser")

 cardData = {}
 cardData['name'] = []
 cardData['imageofCards'] = []

 restuarantCardNameh2 = doc.find_all('h2', class_= "pointer")
 restuarantRating = doc.find_all('span', class_="rating-count")
 restuarantImages = doc.find_all('img', class_="visible")
 restuarantAdress = doc.find_all('span', class_="dec pointer")



 restuarantLogos = [(logo['data-src']) for logo in restuarantImages]
 filteredRestuarantLogos = restuarantLogos[::2]
 cardData['imageofCards'] = filteredRestuarantLogos

 adress_text = [span.text for span in restuarantAdress]
 cardData['address'] = adress_text
 
 rating_text = [span.text for span in restuarantRating]
 cardData['rating'] = rating_text


 
 for res in restuarantCardNameh2:
  restuarantCardName = res.find('span').text
  cardData['name'].append(restuarantCardName)


 
 return restuarantCardNameh2

# \\\print(getRestuarantURLS("https://www.sirved.com/restaurant/75_thorncliffe_park_dr-east_york-ontario_m4h_1l4-canada/list?lat=43.7053001&lng=-79.34153909999999&offset=0"))
#  
#print(getRestuarantMenus("https://www.sirved.com/restaurant/east_york-ontario-canada/hakka-palace/704057/menus"))

# print(getRestaurantUrls())


     
     


# divCLip  = doc.find_all('div', class_="swiper-slide")
# print(divLA)


