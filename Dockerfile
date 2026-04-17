FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

RUN npx playwright install --with-deps || true

ENV CI=true

CMD ["npm", "run", "test:chromium"]
