from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import bleach
import requests
from openai import OpenAI
from dotenv import load_dotenv
from os.path import join, dirname
import os

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/AI-Web-Analyzer"
mongo = PyMongo(app)
CORS(app, origins="http://localhost:5173")

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY']
)

initialPrompt = "Write a summary on the below text, this text was directly parsed from a URL in a specific website for context. "




@app.route('/')
def hello():
    return {'message': 'Hi!'}

#TODO: implement function to retrieve data from backend, when searching for a specific URL

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     try:
#         # Ensures the collection exists in the MongoDB database
#         if 'websites' in mongo.db.list_collection_names():
#             # Retrieve data from  collection
#             data = list(mongo.db.websites.find())
#             return jsonify({'data': data})
#         else:
#             return jsonify({'data': []})  # Return an empty list if the collection doesn't exist
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    
@app.route('/api/add_data', methods=['POST'])
def add_data():
    new_data = request.get_json()
    mongo.db.websites.insert_one(new_data)
    return jsonify({'message': 'Data added successfully'})


#TODO: clear the database when a new website is added.

@app.route('/api/add_website', methods=['POST'])
def add_website():
    try:
        data = request.get_json()
        site = data.get('site')

        # storing all visited URLs in a set to prevent duplicates
        visited = set()

        # creating a queue to keep track of URLs to scrape
        queue = [site]

        while queue:
            current_url = queue.pop(0)
            if current_url in visited:
                continue

            visited.add(current_url)

            try:
                # making a request to the current URL
                r = requests.get(current_url, timeout=5)
            except requests.exceptions.RequestException as e:
                # handling exceptions during request
                print(f"Error connecting to {current_url}: {e}")
                continue

            soup = BeautifulSoup(r.text, "html.parser")

            # Extracting text content and sanitizing HTML
            text_content = bleach.clean(soup.get_text(), tags=[], strip=True)

            # Storing the URL and sanitized text in the MongoDB collection 'websites'
            mongo.db.websites.insert_one({'url': current_url, 'text_content': text_content})
            
            for link in soup.find_all("a"):
                href = link.get("href")
                full_url = urljoin(site, href)
                # checking if the URL belongs to the same domain
                if site in full_url and full_url not in visited:
                    queue.append(full_url)
                    print(full_url)
        
        return jsonify({'message': 'Website URLs added successfully, choose a page to summarize or load another website below!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
                
@app.route('/api/website_summary', methods=['POST'])
def website_summary():
    try:
        data = request.get_json()
        target_url = data.get('target_url')

        # Retrieve text content from MongoDB based on the target URL
        website_data = mongo.db.websites.find_one({'url': target_url})

        if website_data:
            text_content = website_data.get('text_content', '')

            # Use OpenAI to summarize the text
            summary = client.completions.create(
                model="text-davinci-002",
                prompt=initialPrompt + text_content,
                max_tokens=800  # Adjust max_tokens as needed
            )['choices'][0]['text']

            return jsonify({'summary': summary})
        else:
            return jsonify({'error': 'Website data not found'}), 404
    except Exception as e:
        print(f"Error in website_summary: {e}")
        return jsonify({'error': str(e)}), 500