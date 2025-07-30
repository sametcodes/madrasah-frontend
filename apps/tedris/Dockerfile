FROM node:22-alpine

WORKDIR /app

# Copy root package files for workspace setup
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./

# Copy shared packages (workspace dependencies)
COPY shared/ ./shared/

# Copy tedris app files
COPY apps/tedris/package*.json ./apps/tedris/
COPY apps/tedris/tsconfig*.json ./apps/tedris/
COPY apps/tedris/next.config.js ./apps/tedris/
COPY apps/tedris/tailwind.config.js ./apps/tedris/
COPY apps/tedris/postcss.config.js ./apps/tedris/
COPY apps/tedris/components.json ./apps/tedris/

# Install all dependencies (including workspace dependencies)
RUN npm install

# Build shared packages first
RUN cd shared/ui && npm run build
RUN cd shared/utils && npm run build
RUN cd shared/types && npm run build
RUN cd shared/hooks && npm run build

# Copy tedris source code
COPY apps/tedris/app ./apps/tedris/app
COPY apps/tedris/components ./apps/tedris/components
COPY apps/tedris/lib ./apps/tedris/lib
COPY apps/tedris/next-auth.d.ts ./apps/tedris/
COPY apps/tedris/next-env.d.ts ./apps/tedris/

# Set working directory to the app
WORKDIR /app/apps/tedris

# Set build-time environment variables (NEXT_PUBLIC_ vars need to be available at build time)
ARG NEXT_PUBLIC_KEYCLOAK_ISSUER=https://auth-dev.lcvgo.com/realms/amel-tech-dev
ARG NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=tedris
ARG NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000

ENV NEXT_PUBLIC_KEYCLOAK_ISSUER=$NEXT_PUBLIC_KEYCLOAK_ISSUER
ENV NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=$NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
ENV NEXT_PUBLIC_NEXTAUTH_URL=$NEXT_PUBLIC_NEXTAUTH_URL

# Build the Next.js application
RUN npm run build

# Set runtime environment variables
ENV KEYCLOAK_CLIENT_ID=tedris
ENV KEYCLOAK_CLIENT_SECRET=""
ENV KEYCLOAK_ISSUER=https://auth-dev.lcvgo.com/realms/amel-tech-dev
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=NEXTAUTH_SECRET_PASSWORD

# Expose the port (Next.js default is 3000)
EXPOSE 3000

# Start the production server
CMD ["npm", "start"] 