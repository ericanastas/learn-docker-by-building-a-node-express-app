docker rm node-app -f
docker build -t node-app-image .
docker run --name node-app -d -p 3000:3000 -v ${pwd}:/app  node-app-image