var express = require('express');
var ejs = require('ejs');
var bodyparser = require('body-parser');
var data = [{username:"sambit",notifications:[],priority:[]}];
var top = 0;
var app = express();
app.set('view engine','ejs');
var urlencodedParser = bodyparser.urlencoded({ extended: false });
app.get('/',function(req,res){
    res.render("notifications.ejs",{notifications : data[0].notifications,top:top});
});

function update (){
	if (top < data[0].notifications.length)
	{
		top = top + 1;
	}
}

setInterval(update,5000)

app.get('/postNew',function (req,res) {
		res.render("pushNotification.ejs");
});

function getUserIndex(username){
	for(var i=0; i< data.length;i++)
	{
		if (data[i].username == username)
			return i;
	}
	return -1;
}

app.post('/pushNotification',urlencodedParser,function(req,res){
		console.log(req.body);
		var index  = getUserIndex(req.body.targetUser);
		console.log(index);
		if(index > -1)
		{
			data[index].notifications.push(req.body.message);
			console.log(data[index].notifications);
			data[index].priority.push(req.body.priority.toString());
			if(req.body.priority == 1)
			{
				var temp = data[top];
				data[top] = data[data.length-1];
				data[data.length-1] = temp;
			}
		}

		res.render("pushNotification.ejs");
});

app.listen(3000);
