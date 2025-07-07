# Dockerfile
FROM node:22

WORKDIR /app

# tsconfig.json を含めてコピー
COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
