const express= require('express'),
bodyParser= require('body-parser'),
cors= require('cors'),
expressSession=require('express-session'),
connection= require('./server/config/db'),
webRoutes= require('./server/routes/webRoutes'),
apiRoutes=require('./server/routes/apiRoutes');

const app= express();        

//application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//cors
app.use(cors());

//session
app.use(expressSession({
    secret: 'mytoken',
    saveUninitialized: true,
    resave: true
}));
app.use(express.static(path.join(__dirname, './client')));
//routes
app.use('/api',apiRoutes);
app.use('/',webRoutes);

const port = process.env.PORT || 1300;
app.listen(port, function() {
console.log(`App listening on port ${port}!`);
});