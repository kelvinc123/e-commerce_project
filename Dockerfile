FROM node:16 AS gateway-build
COPY ./gateway /usr/src/myapp
WORKDIR /usr/src/myapp/gateway
RUN npm install
CMD npm start

FROM node:16 AS product-build
COPY ./product /usr/src/myapp
WORKDIR /usr/src/myapp/product
RUN npm install
CMD npm start

FROM node:16 AS payment-build
COPY ./payment /usr/src/myapp
WORKDIR /usr/src/myapp/payment
RUN npm install
CMD npm start

FROM node:16 AS purchase-build
COPY ./purchase /usr/src/myapp
WORKDIR /usr/src/myapp/purchase
RUN npm install
CMD npm start

FROM node:16 AS rating-build
COPY ./rating /usr/src/myapp
WORKDIR /usr/src/myapp/rating
RUN npm install
CMD npm start

FROM node:16 AS user-management-build
COPY ./user_management /usr/src/myapp
WORKDIR /usr/src/myapp/user_management
RUN npm install
CMD npm start