module.exports=(app)=>{
    var index=require('../controllers/index.controller');
    app.get('/',index.render);
}
