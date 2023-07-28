from pymongo import MongoClient

client = MongoClient("mongodb+srv://arfan12630:Lakers123@cluster1.u2jgysw.mongodb.net/?retryWrites=true&w=majority")

db = client['menuData']

db_collection_menuCards = db['menuCards']
#Login Collection

