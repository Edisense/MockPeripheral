var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  SystemTemperatureCharacteristic = require('./SystemTemperatureCharacteristic');

function TemperatureService() {
  TemperatureService.super_.call(this, {
      uuid: '5151',
      characteristics: [
          new SystemTemperatureCharacteristic()
      ]
  });
}

util.inherits(TemperatureService, BlenoPrimaryService);

module.exports = TemperatureService;
