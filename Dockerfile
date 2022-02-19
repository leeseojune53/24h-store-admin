FROM node:16.13.1-alpine
EXPOSE 3000
COPY ./dist /dist
COPY ./node_modules /node_modules
CMD [ "node", "dist/main" ]