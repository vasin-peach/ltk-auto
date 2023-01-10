# ---------------------------------------------------------------------------- #
#                                     Base                                     #
# ---------------------------------------------------------------------------- #
FROM node:16-alpine AS base

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
RUN turbo prune --scope=api --docker

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
RUN pnpm i --filter=api...


# Copy source code of pruned subworkspace and build
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --scope=api...
ENV NODE_ENV production

# ---------------------------------------------------------------------------- #
#                                    Runner                                    #
# ---------------------------------------------------------------------------- #
FROM base as runner
COPY --from=builder /app/apps/api/dist app
WORKDIR /app
CMD [ "node", "main.js" ]