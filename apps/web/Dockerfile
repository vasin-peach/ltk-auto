# ---------------------------------------------------------------------------- #
#                                     Base                                     #
# ---------------------------------------------------------------------------- #
FROM node:18-alpine AS base

# Set require package
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add pnpm turbo

# ---------------------------------------------------------------------------- #
#                                    Pruner                                    #
# ---------------------------------------------------------------------------- #
FROM base as pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=web --docker

# ---------------------------------------------------------------------------- #
#                                    Builder                                   #
# ---------------------------------------------------------------------------- #
FROM base AS builder
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install the deps needed to build the target
RUN corepack enable
RUN pnpm i --filter=web...


# Copy source code of pruned subworkspace and build
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --scope=web...
ENV NODE_ENV production

# ---------------------------------------------------------------------------- #
#                                    Runner                                    #
# ---------------------------------------------------------------------------- #
FROM base as runner
WORKDIR /app
COPY --from=builder /app/apps/web/.next/standalone .
COPY --from=builder /app/apps/web/.next/static /app/apps/web/.next/static
COPY --from=builder /app/apps/web/.next/server/chunks /app/apps/web/.next/server/chunks
COPY --from=builder /app/apps/web/public /app/apps/web/public
RUN echo $(ls -1 /app/apps/web)
RUN echo $(ls -1 ./)
WORKDIR /app/apps/web
CMD [ "node", "server.js" ]