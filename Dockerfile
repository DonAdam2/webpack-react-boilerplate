FROM node:14 as application_base

WORKDIR /usr/app

#################################
# Starting from application_base image above
# Build the application for development environment
#################################
FROM application_base as development

COPY . ./

# Remove unwanted directories
RUN rm -rf jest

# Remove unwnated files
RUN rm environments/.env

RUN yarn install --silent

CMD ["yarn", "start"]

#################################
# Starting from application_base image above
# Build the application for production environment (update it to meet your needs)
#################################
FROM application_base as production

COPY . ./

RUN yarn install --silent

RUN yarn build
