FROM node:14

WORKDIR /Chop-Chop-WEB

COPY package*.json ./
RUN npm install \
    && npm install react-router-dom@6 \
    && npm install @supabase/supabase-js \
    && npm install vite@latest

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-clear"]