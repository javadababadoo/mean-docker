'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DeviceSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the device'
  },
  type: {
    type: String,
    required: 'Enter the type of device'
  },
  desc: {
    type: String,
    required: 'Enter the description of the device'
  },
});

module.exports = mongoose.model('Device', DeviceSchema);