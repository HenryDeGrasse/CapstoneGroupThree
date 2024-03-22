# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the app
RUN yarn run build

# Install serve to serve the build folder
RUN yarn global add serve

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
