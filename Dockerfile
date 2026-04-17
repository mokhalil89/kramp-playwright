FROM mcr.microsoft.com/playwright:focal

# Working directory
WORKDIR /app

# Install dependencies first (cache)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the repo
COPY . .

# Ensure Playwright browsers/deps are available (the base image usually includes them)
RUN npx playwright install --with-deps || true

# Mark CI for libraries that check it
ENV CI=true

# Default command runs the Chromium tests (override at runtime if needed)
CMD ["npm", "run", "test:chromium"]
