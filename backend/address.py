from geopy.geocoders import Nominatim
from flask import Blueprint, request, jsonify

import json
from bson import json_util
from db_connect import db_collection_menuCards 
from restuarantURLS import getRestaurantUrls, getRestuarantCards, getRestuarantMenus,generate_uuid
address = Blueprint("address", __name__)

# from geopy.geocoders import Nominatim

# geolocator = Nominatim(user_agent="MyApp")

# location = geolocator.geocode("Hyderabad")

# print("The latitude of the location is: ", location.latitude)
# print("The longitude of the location is: ", location.longitude)
def get_Long(param):
 geolocator = Nominatim(user_agent="my-app")
 addressData = param
 location = geolocator.geocode(addressData)

 if location is not None:
   
    longitude = location.longitude
    return longitude
   
      
 else:
    print("Location not found")

def get_Lat(param):
 geolocator = Nominatim(user_agent="my-app")
 addressData = param
 location = geolocator.geocode(addressData)

 if location is not None:
   
    longitude = location.latitude
    return longitude
   
    
 else:
    print("Location not found")


# print(get_Lat("75 Thorncliffe Park Drive"))

def formatInfo(info):
   if "Street" or "street"  in info:
    newInfo = info.replace("Street", "st")
    formattedInfo = newInfo.lower().replace(" ", "_")
    return formattedInfo

   elif "Drive" or "drive" in info:
    newInfo = info.replace("Drive", "dr")
    formattedInfo = newInfo.lower().replace(" ", "_")
    return formattedInfo

   elif "Avenue" or "avenue" in info:
    newInfo = info.replace("Avenue", "ave")
    formattedInfo = newInfo.lower().replace(" ", "_")
    return formattedInfo 
  
   elif "Boulevard" or "boulevard" in info:
    newInfo = info.replace("Boulevard", "blvd")
    formattedInfo = newInfo.lower().replace(" ", "_")
    return formattedInfo 
 
 
   else:
    newFormatInfo = info.lower().replace(" ", "_")
    return newFormatInfo



def formatProvince(prov):
 can_province_abbrev = {
  'Alberta': 'AB',
  'British Columbia': 'BC',
  'Manitoba': 'MB',
  'New Brunswick': 'NB',
  'Newfoundland and Labrador': 'NL',
  'Northwest Territories': 'NT',
  'Nova Scotia': 'NS',
  'Nunavut': 'NU',
  'Ontario': 'ON',
  'Prince Edward Island': 'PE',
  'Quebec': 'QC',
  'Saskatchewan': 'SK',
  'Yukon': 'YT'
}

 for key, value in can_province_abbrev.items():
    if prov == key:
        formatProv =  value.lower()
 return formatProv 

    

# @address.route('/info', methods=['POST'])
@address.route('/api/address', methods=['POST'])
def getAdressInfo():
    # get the data 
    address = request.json['address']
    postal_code = request.json['postalCode']
    city = request.json['city']
    province = request.json['province']
    country = request.json['country']
    
    formattedAddress = formatInfo(address)
    formattedPC = formatInfo(postal_code)
    formattedCity = formatInfo(city)
    formattedProvince = formatProvince(province)
    formattedCountry = formatInfo(country)
    latitude = get_Lat(address)
    longitude = get_Long(address)
    cardData = getRestuarantCards(formattedAddress,formattedCity,formattedProvince, formattedPC,formattedCountry,latitude, longitude)
    urls = getRestaurantUrls(formattedAddress,formattedCity,formattedProvince, formattedPC,formattedCountry,latitude, longitude)
    result = {}
    for i, (v0,v1, v2, v3, v4, v5) in enumerate(zip(generate_uuid(),cardData['name'],cardData['imageofCards'] , cardData['rating'], cardData['address'], urls)):
     result[i] = {'id':v0, 'name': v1, 'image': v2, 'rating': v3, 'address': v4, 'url':v5}
    return result
   #  return json.dumps(result, default=json_util.default)
        
    
@address.route('/api/getMenus', methods=['POST'])
def getMenuImages():
   url = request.json['url']
   menuImages = getRestuarantMenus(url)
   return menuImages