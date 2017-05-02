//var app = require('app.js');
var FastPriorityQueue = require("fastpriorityqueue");
module.exports = {
		scheduler : function (newmessage){
					var _id = getIndex(newmessage.targetUser);
					if (newmessage.priority == 1)
					{
							pushnew(db[_id],newmessage,newmessage.time);
					}
					else
					{
							var expectedtime = db[_id].MaxTime + 2000 ; //this interval is according to the way you want it to be
							message.time = expectedtime;
						  pushnew(db[_id],newmessage,expectedtime);

					}
					return db;
		},

		pushnew : function (user,message,time){
				user.messageList.add(message);					//user.messagelist is a fastpriorityqueue , add the new data to pqueue with priority being time
				if (message.priority == 2){
						user.MaxTime = time;								//if priority is 2 then update the maxtime of the user which gives an idea about when the next message will be displayed
				}
				return user;
		},

		/*
			adduser is called whenever an user signs up
			in this case just to initialize database/objectarray inorder to check api
		*/

		addUser : function (Username,db){
				var newmessagelist = new FastPriorityQueue(function(a,b){return a.time > b.time});
				var newObj = {username : Username , messageList : newmessagelist , MaxTime : 0, enabledNotification : true, messageNumbers : 0};
				db.push(newObj);

				/*

				//the code given below is the code if a mongodb database is used

				var MongoClient = require('mongodb').MongoClient, assert = require('assert');
				var url = 'mongodb://localhost:3000/cutshort';
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);
					console.log("Connected correctly to server");
					db.collection('inserts').insertOne(newObj)
				}

				*/
				return db;
		}
}
