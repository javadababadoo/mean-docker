'use strict';
module.exports = function(app) {
  var deviceList = require('../controllers/deviceListController');

  app.route('/device')
    .get(deviceList.list_all_devices)
    .post(deviceList.create_a_device);


  app.route('/device/:deviceId')
    .get(deviceList.read_a_device)
    .put(deviceList.update_a_device)
    .delete(deviceList.delete_a_device);
};