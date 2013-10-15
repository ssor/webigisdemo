
/*
 * GET home page.
 */

var carIDList = ['京A-0001', '京A-0002', '京A-0003', '京A-0004', '京A-0005'];
var g_point = null;
var g_realtimePointList = new Array();

function SogouPoint(id, lat, lng, type){
	this.carID = id;
	this.x = lng;
	this.y = lat;
	this.status = 'success';
	this.type = type;
}
function getRealtimePoint(id){

}


exports.index = function(req, res){
  res.render('index', { title: 'Bootstrap Learning' });
};
exports.signin = function(req, res){
	res.render('signin', {title: '登录'});
};
exports.theme = function(req, res){
	res.render('theme', {});
};
exports.webgis = function(req, res){
	res.render('webgis', {});
};

//*********************************************************
exports.distributeCarID = function(req, res){
	res.send();
	return;
}

//*********************************************************

exports.getgps = function(req, res){
	if(g_point == null){
		res.json({"status":"failed"});
	}else{
		res.json(g_point);
	}
};

exports.postgps = function(req, res){
	var body = req.body;
	var id = body.carID;
	var Lat = body.Lat;
	var Lng = body.Lng;
	g_point = new SogouPoint(id, Lat, Lng, 'standard');
	console.log(g_point);
	res.json({"status":"success"});
	return;
};
exports.postSogouGps = function(req, res){
	var body = req.body;
	var id = body.carID;
	var sogouLat = body.Lat;
	var sogouLng = body.Lng;
	g_point = new SogouPoint(id, sogouLat, sogouLng, 'sogou');
	console.log(g_point);
	res.json({"status":"success"});
	return;
};
exports.postRawGPS = function(req, res){
	var rawBody = req.rawBody;
	console.log(rawBody);
	var gps = JSON.parse(rawBody);
	console.log(gps);
	if(gps.type == 'sogou'){
		g_point = new SogouPoint(gps.carID, gps.Lat, gps.Lng, 'sogou');
	}
	else if(gps.type == "standard"){
		g_point = new SogouPoint(gps.carID, gps.Lat, gps.Lng, 'standard');
	}else if(gps.type == "end"){
		g_point = null;
	}
	return;
};
exports.test = function(req, res){
	res.render('test');
};
exports.editpoint = function(req, res){
	res.render('editpoint');
};
exports.exportPoints = function(req, res){
	// var filename = 'a.txt';
	// res.set('Content-Type', 'text/plain');
	// res.set('Content-Disposition: attachment; filename="'+ filename +'"');
	console.log(req.body.type);
	console.log(req.body.data);

	var json = {status:'success', content:"some things!"};
	res.json(json);
	return;
}