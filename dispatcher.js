var maxNumber =  10;

module.exports = {

		ifEnabled : function(User){
				return User.enabledNotification ;
		},

		dispatch : function(User){

				var date = new Date();
				if (date.getHours() == 23 && User.messageNumbers >= maxNumber){

						//schedule it for later

				}
				else {

						if (!User.messageList.isEmpty() && ifEnabled(User))
						{
								var message = User.messageList.poll();
								pushNotification(User,message,message.time);
								User.messageNumbers += 1;
						}
				}
		},

		pushNotification : function(User,message,time){

				//front end stuff to do here
				//show the notification to the user
				//
		}


}
