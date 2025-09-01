
# Use the official Node.js image as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /angapp

COPY package.json /angapp/package.json

# Copy the application files into the working directory
COPY . /angapp

# Install the application dependencies
RUN npm install

ENV PORT 8000

EXPOSE 8000

# Define the entry point for the container
CMD ["npm", "start:server", "start"]
