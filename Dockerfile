FROM node:slim
WORKDIR /mailclerk.dedsec.cl
RUN apt-get update && apt-get install -y procps openssl
ENV TZ=America/Santiago=value
COPY ./package.json .
COPY ./dist ./dist
COPY ./.env .
COPY ./prisma .
RUN npm install
RUN npx prisma generate --no-engine
EXPOSE 2500
CMD ["npm", "run", "start:prod"]
