# # Use Node.js image to build React app
# FROM node:16 as build

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json .
# RUN npm install

# # Copy the rest of the application code and build it
# COPY . .

# # Dockerfile
# COPY .env.docker .env

# RUN npm run build

# # Serve the React app using nginx
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80



# Step 1: Use a node image to build the app
FROM node:16 AS build

WORKDIR /app

# Copy environment file
# COPY .env.docker .env

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and build it
COPY . .

# Dockerfile
#COPY .env.docker .env
# Use .env.aws as .env in Jenkins build
ARG REACT_ENV=aws
RUN cp .env.${REACT_ENV} .env

# Build the React app
 RUN npm run build

# Step 2: Serve the app using a lightweight web server (Nginx)


FROM nginx:alpine

# Copy the built React app to the Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html


# Expose port 81 for Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
