# Use an official Node LTS (long term support) version Carbon as a parent image
FROM node:carbon

ENV JWT_SECRET="xisd3b4k5ds6vsfd"
ENV DATABASE="mongodb://mongo:27017/demo"

# Create app directory
WORKDIR /Users/Home/GitHub/node-prototype

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --no-optional

# Bundle app source
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 8000
# Run the app
CMD [ "node", "index" ]