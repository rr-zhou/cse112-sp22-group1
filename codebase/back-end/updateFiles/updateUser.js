require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function updateUser(userObject, callback){
	schema.User.findOne({email: userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			user.email = userObject.email;
			user.pwd = userObject.pwd;
			user.dailyLogs = userObject.dailyLogs;
			user.monthlyLogs = userObject.monthlyLogs;
			user.futureLogs = userObject.futureLogs;
			user.collections = userObject.collections;
			user.trackers = userObject.trackers;
			user.textBlocks = userObject.textBlocks;
			user.taskBlocks = userObject.taskBlocks;
			user.eventBlocks = userObject.eventBlocks;
			user.signifiers = userObject.signifiers;

			user.save((err, userObject) => {
				if (err) {
					callback(err);
				} else {
					callback(userObject);
				}
			});
		}
	});
}

module.exports = {
	updateUser: updateUser
};
