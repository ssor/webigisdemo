
/*
 * GET home page.
 */
Date.prototype.format = function(format)  
{  
        /* 
        * format="yyyy-MM-dd hh:mm:ss"; 
        */  
        var o = {  
        "M+" : this.getMonth() + 1,  
        "d+" : this.getDate(),  
        "h+" : this.getHours(),  
        "m+" : this.getMinutes(),  
        "s+" : this.getSeconds(),  
        "q+" : Math.floor((this.getMonth() + 3) / 3),  
        "S" : this.getMilliseconds()  
        }  
        if (/(y+)/.test(format))  
        {  
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
        - RegExp.$1.length));  
        }  
          
        for (var k in o)  
        {  
                if (new RegExp("(" + k + ")").test(format))  
        {  
                format = format.replace(RegExp.$1, RegExp.$1.length == 1  
                ? o[k]  
                : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
        }  
        return format;  
}  


var carIDList = ['京A-0001', '京A-0002', '京A-0003', '京A-0004', '京A-0005'];
var g_point = null;
var g_realtimePointList = new Array();

function SogouPoint(id, lat, lng, type, time){
	this.carID = id;
	this.x = lng;
	this.y = lat;
	this.status = 'success';
	this.type = type;
	this.time = time;
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
exports.webgis2 = function(req, res){
	res.render('webgis2', {});
};
exports.editpoint = function(req, res){
	res.render('editpoint');
};
exports.mobile = function(req, res){
	res.render('mobile', {title:'移动终端'});
};
//*********************************************************
//*********************************************************

exports.getgps = function(req, res){
	var or;
	if(g_point == null){
		or = {status:"failed"};
	}else{
		or = {status:"success", point:g_point};
	}
	var str = JSON.stringify(or);
	console.log('getpgs => ' + str);
	res.send(str);
};

exports.postgps = function(req, res){
	var rawBody = req.rawBody;
	console.log(rawBody);
	var gps = JSON.parse(rawBody);
	console.dir(gps);
	if(gps.type == 'sogou'){
		g_point = new SogouPoint(gps.carID, gps.Lat, gps.Lng, 'sogou');
	}
	else if(gps.type == "standard"){
		g_point = new SogouPoint(gps.carID, gps.Lat, gps.Lng, 'standard');
	}else if(gps.type == "end"){
		g_point = null;
	}
	console.log('postgps =>');
	console.dir(g_point);
	res.send();
	return;
};
exports.test = function(req, res){
	res.render('test');
};
