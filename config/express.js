var express=require('express');
var morgan=require('morgan');
var compression=require('compression');
var bodyParser=require('body-parser');

module.exports=()=>{
    var app=express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
	extended: true
    }));
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.set('views','./app/views');
    app.set('view engine', 'jade');
    require('../app/routes/index.route')(app);
    require('../app/routes/api.route')(app);
    return app;
}
