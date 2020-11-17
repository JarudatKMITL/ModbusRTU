module.exports=(app)=>{
    var api=require('../controllers/api.controller');
    app.get('/api',api.render).get('/api/modbus',api.modbus);
}
