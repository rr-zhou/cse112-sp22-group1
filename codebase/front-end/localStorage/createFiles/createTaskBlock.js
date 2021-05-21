import {makeid} from "./makeId.js";

export function createTaskBlockPouch (db, parent, text, complete, signifier, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			let id = makeid();
			let arrays = [];
			arrays.push(...doc.userObject.dailyLogs);
			arrays.push(...doc.userObject.monthlyLogs);
			arrays.push(...doc.userObject.futureLogs);
			arrays.push(...doc.userObject.trackers);
			arrays.push(...doc.userObject.collections);
			arrays.push(...doc.userObject.textBlocks);
			arrays.push(...doc.userObject.taskBlocks);
			arrays.push(...doc.userObject.eventtBlocks);
			arrays.push(...doc.userObject.signifiers);
			while(arrays.filter((element) => element.id == id).length > 0){
				id = makeid();
			}
			const taskBlockObject = {
				id: id,
				parent: parent,
				text: text,
				complete: complete,
				signifier: signifier
			};
		}
	});
	
	

	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_rev: doc._rev,
				_id: "0000"}, (res) => {
				doc.userObject.taskBlocks.push(taskBlockObject);
				console.log(res);
				callback(res);
			});
		}
	});
}