FROM node:18.16.0-alpine3.18
ADD "dist/*" .
EXPOSE 8080
CMD ["node", "app.js"]