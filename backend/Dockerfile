# # Use a Node.js runtime as the base image
# FROM node:16

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 3008

# CMD ["npm", "start"]


# Use a Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install backend dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port (e.g., 3008)
EXPOSE 3008

# Start the Node.js application
CMD ["node", "server.js"]
