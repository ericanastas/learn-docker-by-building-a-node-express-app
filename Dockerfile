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

#This is an argument that is passed into docker file
ARG NODE_ENV

# Install dependencies 
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy the rest of our files
COPY . ./

# Add PORT variable 
ENV PORT 3000

# The EXPOSE instruction informs Docker that the container listens 
# on the specified network ports at runtime. 
# EXPOSE does NOT make the ports of the container accessible to the host.
EXPOSE $PORT

# Start the app, CMD is at "run time", RUN above is at "build time"
CMD ["node", "index.js"]