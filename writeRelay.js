var modbusRTU=require('./config/modbus');
var i=0,st=1;

setInterval(()=>{
    //modbusRTU.setID(1);
    modbusRTU.writeCoil(i,st);
    if(++i==4){
        i=0;
        st=!st;
    }
},1000);