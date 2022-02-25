docker rm node-app -f
docker build -t node-app-image .
docker run --name node-app -d -p 3000:4000 -v ${pwd}:/app:ro -v /app/node_modules --env PORT=4000  node-app-image