var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var modbusSchema=new Schema({
    temperature: Number,
    humidity: Number,
    datetime: String
});

mongoose.model('modbus',modbusSchema);