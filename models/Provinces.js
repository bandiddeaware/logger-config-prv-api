var mongoose = require('mongoose');

var DeviceSchema = new mongoose.Schema({
  province: Array
});
mongoose.model('Province', DeviceSchema);

