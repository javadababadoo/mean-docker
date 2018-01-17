FROM mongo

COPY devices.json /devices.json
CMD mongoimport --host database_service --db DeviceDB --collection devices --type json --file /devices.json