'use strict';


var mongoose = require('mongoose'),
Device = mongoose.model('Device');


exports.device_exists = function(req, res) {
  Device.findOne({name: req.query.deviceName, _id: {$ne: req.params.deviceId}}, '_id', function(err, device) {
    if (err)
      res.send(err);
    res.json({'_id': (device != null ? device._id: 0), 'exists': (device != null)});
  });
};

exports.list_all_devices = function(req, res) {
  Device.find({}, function(err, device) {
    if (err)
      res.send(err);
    console.log('Length: '+device.length);  
    res.json(device);
  });
};

exports.create_a_device = function(req, res) {
    var new_device = new Device(req.body);
    new_device.save(function(err, device) {
      if (err)
        res.send(err);
      res.status(201);
      res.json(device);
    });
  };
  
  exports.read_a_device = function(req, res) {
    Device.findById(req.params.deviceId, function(err, device) {
      if (err)
        res.send(err);
      res.json(device);
    });
  };
  
  
  exports.update_a_device = function(req, res) {
    Device.findOneAndUpdate({_id: req.params.deviceId}, req.body, {new: true}, function(err, device) {
      if (err)
        res.send(err);
      res.json(device);
    });
  };
  
  
  exports.delete_a_device = function(req, res) {
  
  
    Device.remove({
      _id: req.params.deviceId
    }, function(err, device) {
      if (err){
        res.status(400);
        res.send(err);
      }else{
        res.status(204);
        res.json({ message: 'Device successfully deleted' });
      }        
    });
  };
  
  
  