from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/AI-Web-Analyzer"
mongo = PyMongo(app)
CORS(app, origins="http://localhost:5173")

@app.route('/')
def hello():
    return {'message': 'Hello from Flask!'}

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Ensures the collection exists in the MongoDB database
        if 'websites' in mongo.db.list_collection_names():
            # Retrieve data from  collection
            data = list(mongo.db.websites.find())
            return jsonify({'data': data})
        else:
            return jsonify({'data': []})  # Return an empty list if the collection doesn't exist
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/add_data', methods=['POST'])
def add_data():
    new_data = request.get_json()
    mongo.db.websites.insert_one(new_data)
    return jsonify({'message': 'Data added successfully'})