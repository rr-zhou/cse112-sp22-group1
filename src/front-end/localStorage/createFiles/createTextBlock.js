import * as localStorage from "../userOperations.js";
import {makeid} from "./makeId.js";

let textBlockObject = {};

/**
 * Creates and stores a new event created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new textBlock.
 * @param {String} subParent The id of the child within the parent's content list.
 * @param {Number} index The index of where the textBlock should be stored in its parent.
 * @param {String} content The task description to be inserted if kind was a task (optional)
 * @param {Number} tablevel The tablevel of the textBlock.
 * @param {String} kind The kind of textBlock (task, event, or paragraph)
 * @param {String} objectReference The id of the task or event linked to the textBlock.
 * @param {String} signifier The signifier used by the textBlock.
 * @param {Date} date The date of the event if the textBlock kind was an event (opional).
 * @callback (err,textBlock) Eihter sends the newly created textBlock or an error if there is one to the callback.
 */
export function createTextBlockPouch (db, parent, subParent, index, content, tabLevel, kind, objectReference, signifier, date, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			let id = makeid();
			let arrays = [];
			Array.prototype.push.apply(arrays, doc.dailyLogs);
			Array.prototype.push.apply(arrays, doc.monthlyLogs);
			Array.prototype.push.apply(arrays, doc.futureLogs);
			Array.prototype.push.apply(arrays, doc.collections);
			Array.prototype.push.apply(arrays, doc.trackers);
			Array.prototype.push.apply(arrays, doc.textBlocks);
			Array.prototype.push.apply(arrays, doc.tasks);
			Array.prototype.push.apply(arrays, doc.events);
			Array.prototype.push.apply(arrays, doc.signifiers);
			Array.prototype.push.apply(arrays, doc.imageBlocks);
			Array.prototype.push.apply(arrays, doc.audioBlocks);

			while (arrays.filter((element) => element.id === id).length > 0) {
				id = makeid();
			}
			textBlockObject = {
				id: id,
				objectType: "textBlock",
				tabLevel: tabLevel,
				parent: parent,
				kind: kind,
				objectReference: objectReference,
				text: content,
				signifier: signifier
			};

			if (kind === "task" || kind === "event") {
				if (kind === "task") {
					// Index == null for now just for testing
					localStorage.createTask(id, content, 0, null, false, (error, task) => {
						if (error) {
							console.log(error);
							callback(error, null);
						} else {
							textBlockObject.objectReference = task.id;
							localStorage.readUser((error2, user) => {
								if (error2) {
									callback(error2, null);
								} else {
									let userArr = [];
									Array.prototype.push.apply(userArr, user.dailyLogs);
									Array.prototype.push.apply(userArr, user.monthlyLogs);
									Array.prototype.push.apply(userArr, user.trackers);
									Array.prototype.push.apply(userArr, user.collections);

									let parentArr = userArr.filter((object) => object.id === parent);

									if (parent === null) {
										if (index === null) {
											user.index.contents.push(id);
										} else {
											user.index.contents.splice(index, 0, id);
										}
									} else if (index === null) {
										if (subParent === null) {
											parentArr[0].content.push(id);
										} else if (parentArr[0].objectType === "monthlyLog") {
											let newContents = parentArr[0].days.filter((day) => day.id === subParent);
											newContents.content.push(id);
										} else if (parentArr[0].objectType === "futureLog") {
											let newContents = parentArr[0].months.filter((month) => month.id === subParent);
											newContents.content.push(id);
										}
									} else if (subParent === null) {
											parentArr[0].content.splice(index, 0, id);
										} else if (parentArr[0].objectType === "monthlyLog") {
											let newContents = parentArr[0].days.filter((day) => day.id === subParent);
											newContents.content.splice(index, 0, id);
										} else if (parentArr[0].objectType === "futureLog") {
											let newContents = parentArr[0].months.filter((month) => month.id === subParent);
											newContents.content.splice(index, 0, id);
										}

									user.textBlocks.push(textBlockObject);

									return db.put({_id: "0000",
										_rev: user._rev,
										email: user.email,
										pwd: user.pwd,
										theme: user.theme,
										index: user.index,
										dailyLogs: user.dailyLogs,
										monthlyLogs: user.monthlyLogs,
										futureLogs: user.futureLogs,
										collections: user.collections,
										trackers: user.trackers,
										imageBlocks: user.imageBlocks,
										audioBlocks: user.audioBlocks,
										textBlocks: user.textBlocks,
										tasks: user.tasks,
										events: user.events,
										signifiers: user.signifiers}).then((res) => {
										console.log(res);
									}).
catch((error3) => {
										console.log(error3);
										callback(error3, null);
									});
								}
							});
						}
					})
				} else if (kind === "event") {
					// Index == null for now just for testing
					localStorage.createEvent(content, id, date, null, true, (error, event) => {
						if (error) {
							callback(error, null);
						} else {
							textBlockObject.objectReference = event.id;
							localStorage.readUser((err2, user) => {
								if (err2) {
									callback(err2, null);
								} else {
									let userArr = [];
									Array.prototype.push.apply(userArr, user.dailyLogs);
									Array.prototype.push.apply(userArr, user.monthlyLogs);
									Array.prototype.push.apply(userArr, user.trackers);
									Array.prototype.push.apply(userArr, user.collections);

									let parentArr = userArr.filter((object) => object.id === parent);

									if (parent === null) {
										if (index === null) {
											user.index.contents.push(id);
										} else {
											user.index.contents.splice(index, 0, id);
										}
									} else if (index === null) {
										if (subParent === null) {
											parentArr[0].content.push(id);
										} else if (parentArr[0].objectType === "monthlyLog") {
											let newContents = parentArr[0].days.filter((day) => day.id === subParent);
											newContents.content.push(id);
										} else if (parentArr[0].objectType === "futureLog") {
											let newContents = parentArr[0].months.filter((month) => month.id === subParent);
											newContents.content.push(id);
										}
									} else if (subParent === null) {
											parentArr[0].content.splice(index, 0, id);
										} else if (parentArr[0].objectType === "monthlyLog") {
											let newContents = parentArr[0].days.filter((day) => day.id === subParent);
											newContents.content.splice(index, 0, id);
										} else if (parentArr[0].objectType === "futureLog") {
											let newContents = parentArr[0].months.filter((month) => month.id === subParent);
											newContents.content.splice(index, 0, id);
										}

									user.textBlocks.push(textBlockObject);

									return db.put({_id: "0000",
										_rev: user._rev,
										email: user.email,
										pwd: user.pwd,
										theme: user.theme,
										index: user.index,
										dailyLogs: user.dailyLogs,
										monthlyLogs: user.monthlyLogs,
										futureLogs: user.futureLogs,
										collections: user.collections,
										trackers: user.trackers,
										imageBlocks: user.imageBlocks,
										audioBlocks: user.audioBlocks,
										textBlocks: user.textBlocks,
										tasks: user.tasks,
										events: user.events,
										signifiers: user.signifiers}).then((res) => {
										console.log(res);
									}).
catch((error2) => {
										console.log(error2);
										callback(error2, null);
									});
								}
							});
						}
					})
				}
			} else {
				let userArr = [];
				Array.prototype.push.apply(userArr, doc.dailyLogs);
				Array.prototype.push.apply(userArr, doc.monthlyLogs);
				Array.prototype.push.apply(userArr, doc.trackers);
				Array.prototype.push.apply(userArr, doc.collections);

				let parentArr = userArr.filter((object) => object.id === parent);

				if (parent === null) {
					if (index === null) {
						doc.index.contents.push(id);
					} else {
						doc.index.contents.splice(index, 0, id);
					}
				} else if (index === null) {
					if (subParent === null) {
						parentArr[0].content.push(id);
					} else if (parentArr[0].objectType === "monthlyLog") {
						let newContents = parentArr[0].days.filter((day) => day.id === subParent);
						newContents.content.push(id);
					} else if (parentArr[0].objectType === "futureLog") {
						let newContents = parentArr[0].months.filter((month) => month.id === subParent);
						newContents.content.push(id);
					}
				} else if (subParent === null) {
						parentArr[0].content.splice(index, 0, id);
					} else if (parentArr[0].objectType === "monthlyLog") {
						let newContents = parentArr[0].days.filter((day) => day.id === subParent);
						newContents.content.splice(index, 0, id);
					} else if (parentArr[0].objectType === "futureLog") {
						let newContents = parentArr[0].months.filter((month) => month.id === subParent);
						newContents.content.splice(index, 0, id);
					}

				doc.textBlocks.push(textBlockObject);

				return db.put({_id: "0000",
					_rev: doc._rev,
					email: doc.email,
					pwd: doc.pwd,
					theme: doc.theme,
					index: doc.index,
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs,
					futureLogs: doc.futureLogs,
					collections: doc.collections,
					trackers: doc.trackers,
					imageBlocks: doc.imageBlocks,
					audioBlocks: doc.audioBlocks,
					textBlocks: doc.textBlocks,
					tasks: doc.tasks,
					events: doc.events,
					signifiers: doc.signifiers}).then((res) => {
					console.log(res);
				}).
catch((error) => {
					callback(error, null);
				});
			}
		}
	}).then((res) => {
		if (res.ok) {
			console.log(textBlockObject);
			callback(null, textBlockObject);
		}
	});
}
