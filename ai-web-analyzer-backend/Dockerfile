# Use an official Python runtime as a parent image
FROM python:3.11.4

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the Flask application files
COPY . .

# Copy the virtual environment into the container
COPY /ai-web-analyzer-backend/venv /usr/src/app/venv

# Copy requirements.txt to the working directory
COPY /ai-web-analyzer-backend/requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Specify the command to run on container start
CMD ["python", "app.py"]
