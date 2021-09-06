var mongoose = require('mongoose');

var DeviceSchema = new mongoose.Schema({
  // serial_no: String,
  serial_no: { type: String, unique: true, index: true },
  device_config: Array,
  modbus_config: Array,
  zone_id: String,
  zond_desc: String,
  wwcode: String,
  wwcode_desc: String,
  prv_config: Array,
  failure_mode: Object,
  manual: Object,
  dmacode: String,
  dmaname: String,
  note: String,
  dmakhet: String,
});
mongoose.model('Device', DeviceSchema);

