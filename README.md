# AI-Web-Analyzer
This application was built as a technical exercise, it takes a given website URL, parses and stores the data in a database. And allows you to get summarized information from existing pages on the website stored using AI.

## Frontend
in the root folder of the React application run the following commands to setup and run locally:

### RUN

`npm i`

`npm run dev`

## Backend
in the root folder of the Flask application follow the steps, and run the following commands to setup and run locally:

### Step 1
Create a `.env` file in the root folder of the Flask App.

### Step 2
Create an `OPENAI_API_KEY` environment variable and assign it to your personal OpenAI API key, ensure the key was created from any account that is higher than the free tier or that was created in the last 3 months to get full access.

### Run

`source venv/scripts/activate`

`pip install -r requirements.txt`

`flask run`

Note: if the venv gives a problem, delete it and create your own, then install the dependencies and run.

## MongoDB Database
in the root folder of the Database folder run the following commands to setup and run locally:

### Note
You will need to have MongoDB installed locally on the desktop, by default the code is set to run and connect to the development DB `mongodb://localhost:27017/AI-Web-Analyzer` which has a collection `websites`

In the folder it has the mock DB /data folder that was used with the development DB. To test if everything is fine, use MongoDB Compass or `mongosh` to check if the database is being received correctly on your local machine. If not you can simply edit the code in the Python file to reflect your own newly created databse or just follow the original schema.

### Run

`mongod`


# Conclusion

If all steps went well, the application is now running locally at `http://localhost:5173/`, ready to be used.


