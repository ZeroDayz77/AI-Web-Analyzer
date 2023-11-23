# Use an official MongoDB image as a parent image
FROM mongo:latest

# Create a directory within the container to store MongoDB data
WORKDIR /data/db

# Copy your MongoDB data from the host into the container
COPY /ai-web-analyzer-database/db /data/db

# Optionally, copy your MongoDB configurations to the container
# COPY /path/to/your/mongodb/config /docker-entrypoint-initdb.d
