# ビルド環境
FROM node:13.7-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# RUN npm install
# RUN npm install -g @quasar/cli
RUN yarn global add @quasar/cli
COPY . .
RUN yarn
RUN yarn lint
RUN quasar build

# 本番環境
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
