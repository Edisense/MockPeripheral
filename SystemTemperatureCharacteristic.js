// Adapted from https://github.com/sandeepmistry/bleno/blob/master/examples/battery-service/battery-level-characteristic.js

var util = require('util'),
  os = require('os'),
  bleno = require('bleno'),
  smc = require('smc'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var SystemTemperatureCharacteristic = function() {
  SystemTemperatureCharacteristic.super_.call(this, {
      uuid: '2A19',
      properties: ['read'],
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'System CPU temperature in degrees Celsius'
        }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
        })
      ]
  });
};

util.inherits(SystemTemperatureCharacteristic, Characteristic);

SystemTemperatureCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (os.platform() === 'darwin') {
    var temp = smc.temperature()
    console.log(temp)
    callback(this.RESULT_SUCCESS, new Buffer([temp]));
  } else {
    callback(this.RESULT_FAILURE);
  }
};

module.exports = SystemTemperatureCharacteristic;
