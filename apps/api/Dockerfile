# ---------------------------------------------------------------------------- #
#                                    Builder                                   #
# ---------------------------------------------------------------------------- #
FROM node:alpine AS builder

# Set require package
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add pnpm turbo

# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=api --docker

# ---------------------------------------------------------------------------- #
#                                   Installer                                  #
# ---------------------------------------------------------------------------- #
# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer

# Set require package
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add pnpm

# Set working directory
WORKDIR /app

# Install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=api...

# Set NODE_ENV environment variable
ENV NODE_ENV production



# ---------------------------------------------------------------------------- #
#                                    Runner                                    #
# ---------------------------------------------------------------------------- #
WORKDIR /app/apps/api
CMD [ "node", "dist/main" ]