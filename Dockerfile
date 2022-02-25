# Sets base image (required)
FROM node:15

# Sets working directory of container, this folder already exists in the image (optional)
# Commands are run from this directory
# Coppied files go to this directory by default
WORKDIR /app

# Copy package.json into docker image
# . means current directory or /app in this case
# package.json is coppied first as an optimization
# each step in a docker file is a layer of the image
# After each layer docker caches the result of the layer
# if nothing changes at a layer docker just reuses the cached version
COPY package.json .

# Install dependencies 
RUN npm install

# Copy the rest of our files
COPY . ./

# Expose port 3000
EXPOSE 3000

# Start the app, CMD is at "run time", RUN above is at "build time"
CMD ["node", "index.js"]