var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

var guestList = require('./data/guestList');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

app.get('/', function (req, res) {
	console.log('requested')
  res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

app.get('/api/guest', function(req, res){

});

app.get('/api/guestList', function(req, res){
	res.send(guestList);
});

app.post('/api/guest', function(req, res){
	var newGuest = req.body;
	newGuest._id = guestList.length;
	guestList.push(newGuest);
	res.json({status: 'ok'});
});

app.delete('/api/guest/:id', function(req, res){
	guestList = _.reject(guestList, function(model){ return model._id == req.params.id; })
	console.log(guestList)
	res.json({status: 'ok'});
});

app.listen(8090, function(){
	console.log('connected to express', 8090)
});