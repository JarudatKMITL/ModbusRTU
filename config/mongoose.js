var mongoose=require('mongoose');

module.exports=()=>{
    mongoose.set('debug',true);
    var db=mongoose.connect('mongodb://localhost/modbus');
    require('../app/models/modbus.model');
    return db;
}
