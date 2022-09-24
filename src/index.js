const express = require('express');
const  bodyParser = require('body-parser');
const route = require('./route/router.js');
const mongoose = require('mongoose')

const app = express();        


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb+srv://komalbansod_04:BdcyrSiZZa4v5y76@komal04.fvnel.mongodb.net/invetamDataBase?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});