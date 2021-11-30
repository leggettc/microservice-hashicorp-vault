# First Build
FROM singularkey/node AS build
ARG NPM_TOKEN
WORKDIR /app
COPY . /app
RUN echo "${NPM_TOKEN}" > .npmrc
RUN npm whoami
RUN npm install
RUN rm -f .npmrc

# Second build
FROM singularkey/base-image as build2
WORKDIR /app
COPY --from=build /app /app
RUN npm run build

# Final build
FROM singularkey/base-image
WORKDIR /app
EXPOSE  3000
COPY --from=build2 /app/sk-app /app
CMD ["./sk-app"]
