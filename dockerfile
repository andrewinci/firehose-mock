FROM alpine
RUN apk add --update nodejs
ADD "dist/*" .
EXPOSE 8080
CMD ["node", "app.js"]