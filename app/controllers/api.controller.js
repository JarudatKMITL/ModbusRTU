const db = require("../../config/mongoose")();

var modbusModel=db.model('modbus');

var render=(req,res)=>{
    res.send("This is API page");
}

var modbus=(req,res)=>{
    modbusModel.find({},(err,data)=>{
        if(!err){
            let detail=new Array();
            let tmp={};
	        data.sort((a,b)=>{
		        return b.datetime-a.datetime;
	        });
            data.forEach((item,index)=>{
		        if(!item.temperature||!item.humidity||item.humidity>100||item.temperature>100)return;
                let dt=new Date(parseInt(item.datetime));
                detail.push({'dateTime':dt, 'temperature':item.temperature, 'humidity':item.humidity});
            });
            detail.forEach((item,index)=>{
                if(isNaN(item.dateTime.getUTCDate())||isNaN(item.dateTime.getUTCMonth())||isNaN(item.dateTime.getUTCFullYear())||!item.temperature||!item.humidity)return;
		        let obj=tmp[item.dateTime.getUTCDate()+'/'+(item.dateTime.getUTCMonth()+1)+'/'+item.dateTime.getUTCFullYear()]=tmp[item.dateTime.getUTCDate()+'/'+(item.dateTime.getUTCMonth()+1)+'/'+item.dateTime.getUTCFullYear()]||{count:0, totalTemperature:0, totalHumidity:0};
		        obj.count++;
		        obj.totalTemperature+=item.temperature;
		        obj.totalHumidity+=(item.humidity/5);
            });
	        let result=Object.entries(tmp).map(function(entry){
		        return {date: entry[0], temperature: entry[1].totalTemperature/entry[1].count, humidity: entry[1].totalHumidity/entry[1].count};
	        });
            res.json({detail:detail, average: result.slice(0,7)});
        }
    })
}

module.exports={
    render,
    modbus
}


