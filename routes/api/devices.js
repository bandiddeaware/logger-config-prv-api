var router = require('express').Router();
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Device = mongoose.model('Device');
var Province = mongoose.model("Province")
var Log = mongoose.model("Log")

router.post('/find/dmacode', function(req, res, next) {
  var qry = {}
  try {
    Device.find(qry).sort({"serial_no": 1}).then(function(result){
      if (result.length > 0){
        var result_ = []
        result.forEach((item, index) => {
          result_.push({
            "dmakhet": item.dmakhet,
            "dmaname": item.dmaname,
            "dmacode": item.dmacode,
          })
        })
        return res.json(result_)
      }else {
        return res.json(result);
      }
    }).catch(next);
  } catch (e) {
    res.json(e)
  }
});

router.post('/find/logs', function(req, res, next) {
  var qry = {
    dmacode: req.body.dmacode
  }
  try {
    Log.find(qry).sort({"time": -1}).then(function(result){
      return res.json(result);
    }).catch(next);
  } catch (e) {
    res.json(e)
  }
});

router.post('/find', function(req, res, next) {
  var qry = {}
  if (req.body.serial_no !== undefined){
    qry.serial_no = req.body.serial_no
  }
  if (req.body.wwcode !== undefined){
    qry.wwcode = req.body.wwcode
  }
  if (req.body.zone_id !== undefined){
    qry.zone_id = req.body.zone_id
  }
  if (req.body.dmacode !== undefined){
    qry.dmacode = req.body.dmacode
  }
  try {
    Device.find(qry).sort({"serial_no": 1}).then(function(result){
      return res.json(result);
    }).catch(next);
  } catch (e) {
    res.json(e)
  }
});

router.put("/save", function(req, res, next){
  var Devices = new Device();
  Devices.serial_no = req.body.serial_no
  Devices.wwcode = req.body.wwcode
  Devices.wwcode_desc = req.body.wwcode_desc
  Devices.zone_desc = req.body.zone_desc
  Devices.zone_id = req.body.zone_id
  Devices.device_config = req.body.device_config
  Devices.modbus_config = req.body.modbus_config

  Devices.dmacode = req.body.dmacode
  Devices.dmaname = req.body.dmaname
  Devices.dmakhet = req.body.dmakhet

  Devices.prv_config = []
  Devices.failure_mode = {
    "mode": "Pressure",
    "step_valve": "0",
    "time_loog_min": "0",
    "limit_valve_min": "0",
    "deadband_pressure": "0",
    "deadband_flow": "0"
  }
  Devices.manual = {
    valve: 0
  }
  Devices.save().then(function(result){
    return res.json({result: true, data: result})
  }).catch(next)
})

router.post("/province", function(req, res, next){
  Province.find({}).then(function(result){
    return res.json(result);
  }).catch(next)
})

router.delete("/", function(req, res, next){
  Device.remove({serial_no: req.body.serial_no,  serial_no: { $in: req.body.serial_no}}, function(err, response) {
    return res.json(response)
  });
})

router.post("/update", function(req, res, next){

  var update_json = {}

  if (req.body.manual !== undefined){
    update_json.manual = req.body.manual
  }
  if (req.body.device_config !== undefined){
    update_json.device_config = req.body.device_config
  }
  if (req.body.modbus_config !== undefined){
    update_json.modbus_config = req.body.modbus_config
  }
  if (req.body.prv_config !== undefined){
    update_json.prv_config = req.body.prv_config
  }
  if (req.body.failure_mode !== undefined){
    update_json.failure_mode = req.body.failure_mode
  }
  if (req.body.mode === undefined){
     // for replace logger
    if (req.body.wwcode !== undefined){
      update_json.wwcode = req.body.wwcode
    }
    if (req.body.zone_id !== undefined){
      update_json.zone_id = req.body.zone_id
    }
    if (req.body.dmacode !== undefined){
      update_json.dmacode = req.body.dmacode
    }
    if (req.body.dmaname !== undefined){
      update_json.dmaname = req.body.dmaname
    }
    if (req.body.dmakhet !== undefined){
      update_json.dmakhet = req.body.dmakhet
    } 
  }

  Device.findOneAndUpdate({serial_no: req.body.serial_no}, update_json, {new: false}, (err, doc) => {
    if (err) {
        return res.json({ret:"fail"});
    }
    if (req.body.manual !== undefined || req.body.prv_config !== undefined || req.body.failure_mode !== undefined){
      var logs = new Log();
      if (req.body.user !== undefined){
        logs.user = req.body.user
      }
      if (req.body.name !== undefined){
        logs.name = req.body.name
      }
      if (req.body.position !== undefined){
        logs.position = req.body.position
      }
      if (req.body.access_level_id !== undefined){
        logs.access_level_id = req.body.access_level_id
      }
      if (req.body.access_level_desc !== undefined){
        logs.access_level_desc = req.body.access_level_desc
      }
      if (req.body.mode !== undefined){
        logs.mode = req.body.mode
      }
      if (req.body.region_id !== undefined){
        logs.region_id = req.body.region_id
      }
      if (req.body.region_desc !== undefined){
        logs.region_desc = req.body.region_desc
      }
      if (req.body.zone_desc !== undefined){
        logs.zone_desc = req.body.zone_desc
      }
      if (req.body.wwcode_desc !== undefined){
        logs.wwcode_desc = req.body.wwcode_desc
      }
      if (req.body.wwcode !== undefined){
        logs.wwcode = req.body.wwcode
      }
      if (req.body.zone_id !== undefined){
        logs.zone_id = req.body.zone_id
      }
      if (req.body.dmacode !== undefined){
        logs.dmacode = req.body.dmacode
      }
      if (req.body.dmaname !== undefined){
        logs.dmaname = req.body.dmaname
      }
      if (req.body.dmakhet !== undefined){
        logs.dmakhet = req.body.dmakhet
      }
      if (req.body.manual !== undefined){
        logs.manual = req.body.manual
      }
      if (req.body.prv_config !== undefined){
        logs.prv_config = req.body.prv_config
      }
      if (req.body.failure_mode !== undefined){
        logs.failure_mode = req.body.failure_mode
      }
      logs.time = new Date()
      logs.save().then(function(){
        return res.json({ret:"OK"})
      }).catch(next)
    } else {
      return res.json({ret:"OK"})
    }
  });
})

// for test user

router.post("/login/user", function(req, res, next) {
  var out = {}
  if (req.body.username === 'user1'){ // country   access_level 1
    out.token = 'user1'
    out.data = {
      "user": "arm-dw",
      "name": "บริษัท เดียร์แวร์",
      "position": "dev",
      "access_level_id": "1",
      "access_level_desc": "ประเทศ",
      "region_id": "4",
      "region_desc": "ภาค 4",
      "zone_id": "03",
      "zone_desc": "กปภ.เขต 3",
      "wwcode": "5542016",
      "wwcode_desc": "สาขาสมุทรสาคร",
      "is_admin": "1",
      "is_control": "1",
      "is_config": "1",
      "date_time": "2021-02-23 19:45:04"
    }
  }
  if (req.body.username === 'user2'){ // zone       access_level 10
    out.token = 'user2'
    out.data = {
      "user": "arm-dw",
      "name": "บริษัท เดียร์แวร์",
      "position": "dev",
      "access_level_id": "10",
      "access_level_desc": "เขต",
      "region_id": "4",
      "region_desc": "ภาค 4",
      "zone_id": "03",
      "zone_desc": "กปภ.เขต 3",
      "wwcode": "5542016",
      "wwcode_desc": "สาขาสมุทรสาคร",
      "is_admin": "0",
      "is_control": "1",
      "is_config": "1",
      "date_time": "2021-02-23 19:45:04"
    }
  }
  if (req.body.username === 'user3'){ // branch     access_level 15
    out.token = 'user3'
    out.data = {
      "user": "arm-dw",
      "name": "บริษัท เดียร์แวร์",
      "position": "dev",
      "access_level_id": "15",
      "access_level_desc": "สาขา",
      "region_id": "4",
      "region_desc": "ภาค 4",
      "zone_id": "03",
      "zone_desc": "กปภ.เขต 3",
      "wwcode": "5542016",
      "wwcode_desc": "สาขาสมุทรสาคร",
      "is_admin": "0",
      "is_control": "1",
      "is_config": "1",
      "date_time": "2021-02-23 19:45:04"
    }
  }
  res.json(out)

})

// ################################ PRV config ################################

module.exports = router;