FROM httpd:2.2.34-alpine

WORKDIR /usr/src/device_management/

COPY . .

COPY dist/ /usr/local/apache2/htdocs/

EXPOSE 80
