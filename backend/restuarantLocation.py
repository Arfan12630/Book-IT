from bs4 import BeautifulSoup
import requests
import re
def formatRestuarantName():
 url = "https://www.yelp.ca/search?find_desc=chipotle&find_loc=Toronto%2C+ON"
 result = requests.get(url).text
 doc = BeautifulSoup(result, "html.parser")
 headings = doc.find_all('a', class_="css-19v1rkv")[3]
 headingText = headings.text

 # Since we got the test
 # now we can format
 formattedName = headingText.replace(" ", "-").lower()
 return formattedName


print(formatRestuarantName())
def findLocationName():
 url = "https://www.yelp.ca/search?find_desc=Bamiyan+Kabab&find_loc=Toronto%2C+ON"
 result = requests.get(url).text
 doc = BeautifulSoup(result, "html.parser")
 divs = doc.find_all('a', class_='css-19v1rkv')
 document = []
 for div in divs[2:]:
    newDiv = div.text
    document.append(newDiv)
 new_list =  [item for item in document if "Bamiyan Kabob" in item]
 return new_list

 def getAddress():
    return;

def getLocations():
 url = f"https://www.yelp.ca/search?find_desc=Bamiyan+Kabab&find_loc=Toronto%2C+ON"
 result = requests.get(url).text
 doc = BeautifulSoup(result, "html.parser")
 divs = doc.find_all('a', class_='css-19v1rkv')
 document = []

 for div in divs[3:]:
    newDiv = div['href']
    document.append(newDiv)
 urls = document
 locations = [   ]
 for url in urls:
    match = re.search(r'bamiyan-kabob-(.*?)[/?]', url)
    if match:
        location = match.group(1)
        locations.append(location)
 return locations
# #TODO


# # - Will need to do it dnamically
#  for url in urls:
#    if 'bamiyan-kabob' in url:
#         start_index = max(url.find('bamiyan-kabob') + len('bamiyan-kabob'))
#         end_index = url.find('?', start_index)
        
#         if end_index != -1:
#             desired_word = url[start_index:end_index].strip('-')
#         else:
#             desired_word = url[start_index:].strip('-')
        
#         desired_words.append(desired_word)

#  return desired_words


def formatRestuarantInput(restuarant):
    formattedInfo = restuarant.replace(' ', '-').lower()
    return formattedInfo

def capRestuarantInput(restuarant):
    formattedName = restuarant.split()
    capitalized_words = [word.capitalize() for word in formattedName]
    capitalized_text = " ".join(capitalized_words)
    capitalizedFormattedText = capitalized_text.replace(' ','+')
    return capitalizedFormattedText     
