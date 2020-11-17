const db = require("../../config/mongoose")();

var modbusModel=db.model('modbus');

var render=(req,res)=>{
    modbusModel.find({},(err,data)=>{
	    if(!err)res.render('index',{tempData: data});
    });
}

module.exports={
    render
}


