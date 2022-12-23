FROM node:14 as application_base

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "/usr/app/"]

RUN yarn install --silent

COPY . ./

#################################
# Starting from application_base image above
# Build the application for development environment
#################################
FROM application_base as development

# Remove unwanted directories
RUN rm -rf jest

# Remove unwnated files
RUN rm environments/.env

CMD ["yarn", "start"]

#################################
# Starting from application_base image above
# Build the application for production environment
#################################
# step1 => build react app
FROM application_base as build

RUN yarn build

# step2 => copy react build into nginx (update it to meet your needs)
FROM nginx:alpine as production

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from build stage
COPY --from=build /usr/app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
