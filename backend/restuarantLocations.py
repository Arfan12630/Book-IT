import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask import Blueprint

restuarantLocations  = Blueprint("restuarantLocations", __name__          )
# Initialize the Chrome WebDriver
def getPlaces(city, province, country, latitude, longitude):
 driver = webdriver.Chrome()

 try:
    # Navigate to the website
    url = f"https://www.sirved.com/restaurant/{city}-{province}-{country}/list?lat={latitude}&lng={longitude}&keyword=Bamiyan%20Kabob"
    #url = "https://www.sirved.com/restaurant/toronto-ontario-canada/list?lat=43.653226&lng=-79.3831843&keyword=Bamiyan%20Kabob"
    driver.get(url)

    # Wait for the button to load
    span = driver.find_element(By.CLASS_NAME, "show-chain.lg")

    # Use ActionChains to simulate more realistic interactions
    actions = ActionChains(driver)
    actions.move_to_element(span).click().perform()

    # Wait for the <ul> element containing the <li> elements to become visible
    wait = WebDriverWait(driver, 30)
    ul_element = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "loc-list")))

    # Locate and loop through the <li> elements within the <ul>
    li_elements = ul_element.find_elements(By.TAG_NAME, "li")
    items = {}
    items['places'] = []
    items['address'] = []
    for li in li_elements:
        # Locate the <a> tag within the <li> element
        a_element = li.find_element(By.TAG_NAME, "a")
        href = a_element.get_attribute("href")  

        # Locate the <span> tag within the <a> element and extract its text
        span_element = a_element.find_element(By.TAG_NAME, "span")
        address_text = span_element.text.split(",")[0]
        span_text = span_element.text.split(",")[1]

        
        items["places"].append(span_text)
        items['address'].append(address_text)
        # Print the extracted information
    return items
    

 finally:
    # Close the WebDriver
    
    driver.quit()
   



# import time
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

# # Initialize the Chrome WebDriver
# def getPlaces(city,province,country,lat,long):
#     driver = webdriver.Chrome()

#     try:
#         # Navigate to the website
#         driver.get("https://www.sirved.com/restaurant/toronto-ontario-canada/list?lat=43.653226&lng=-79.3831843&keyword=Bamiyan%20Kabob")

#         # Wait for the button to load
#         span = driver.find_element(By.CLASS_NAME, "show-chain.lg")

#         # Use ActionChains to simulate more realistic interactions
#         actions = ActionChains(driver)
#         actions.move_to_element(span).click().perform()

#         # Wait for the <ul> element containing the <li> elements to become visible
#         wait = WebDriverWait(driver, 30)
#         ul_element = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "loc-list")))

#         # Locate and loop through the <li> elements within the <ul>
#         li_elements = ul_element.find_elements(By.TAG_NAME, "li")
#         items = {'places': [], 'address': []}
        
#         for li in li_elements:
#             try:
#                 # Locate the <a> tag within the <li> element
#                 a_element = li.find_element(By.TAG_NAME, "a")
#                 href = a_element.get_attribute("href")  

#                 # Locate the <span> tag within the <a> element and extract its text
#                 span_element = a_element.find_element(By.TAG_NAME, "span")
#                 address_text = span_element.text.split(",")[0]
#                 span_text = span_element.text.split(",")[1]

#                 items["places"].append(span_text)
#                 items['address'].append(address_text)
                
#             except Exception as e:
#                 print("Error processing a <li> element:", e)
        
#         return items

#     finally:
#         # Close the WebDriver
#         driver.quit()

# print(getPlaces())
