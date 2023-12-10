ARG APP_ROOT_PATH="/usr/app"
ARG NODE_VERSION="17"
ARG PRODUCTION_ENV_FILE=".env"

##########################################################
# Create application_base image where we install packages
##########################################################
FROM node:$NODE_VERSION as application_base
ARG APP_ROOT_PATH

WORKDIR $APP_ROOT_PATH

COPY ../package.json ../pnpm-lock.yaml $APP_ROOT_PATH

RUN npm install -g pnpm
RUN pnpm install --silent

###################################################
# Starting from application_base image above
# Build the application for development environment
###################################################
FROM application_base as development

# We are not copying anything because we are using bind mount in docker-compose file

CMD ["pnpm", "start"]

######################################################
# Create reusable nginx (update it to meet your needs)
######################################################
FROM nginx:alpine as nginx_base

COPY ./docker/.nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*


####################################################
# Starting from application_base image above
# Create build_base where we copy all required files
####################################################
FROM application_base as build_base

COPY ../buildTools ./buildTools
COPY ../babel.config.js ./babel.config.js
COPY ../.eslintrc.js ./.eslintrc.js
COPY ../jsconfig.json ./jsconfig.json
COPY ../.prettierrc ./.prettierrc
COPY ../.prettierignore ./.prettierignore
COPY ../public ./public
COPY ../src ./src
# Remove test files
RUN find . -type f -iname \*.test* -delete

##################################################
# Starting from build_base image above
# Build the application for production environment
##################################################
# step1 => build react app
FROM build_base as production_build

COPY ../environments/$PRODUCTION_ENV_FILE ./environments/$PRODUCTION_ENV_FILE

RUN pnpm build

# step2 => copy react build from production_build into nginx
FROM nginx_base as production
ARG APP_ROOT_PATH

# Copy static assets from production_build stage
COPY --from=production_build $APP_ROOT_PATH/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
