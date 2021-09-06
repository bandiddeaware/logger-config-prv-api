var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
  user: String,
  name: String,
  position: String,
  access_level_id: String,
  access_level_desc: String,
  dmacode: String,
  dmaname: String,
  mode: String,
  prv_config: Array,
  failure_mode: Object,
  manual: Object,

  region_id: String,
  region_desc: String,
  zone_id: String,
  zone_desc: String,
  wwcode: String,
  wwcode_desc: String,

  time: Date,
});
mongoose.model('Log', LogSchema);