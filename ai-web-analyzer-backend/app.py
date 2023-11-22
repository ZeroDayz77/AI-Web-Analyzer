from flask import Flask, jsonify, request
from flask_cors import CORS
from business_logic import add_website, website_summary

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

@app.route('/')
def hello():
    return {'message': 'Hi!'}

@app.route('/api/add_website', methods=['POST'])
def add_website_route():
    return add_website(request)

@app.route('/api/website_summary', methods=['POST'])
def website_summary_route():
    return website_summary(request)

if __name__ == '__main__':
    app.run(debug=True)
