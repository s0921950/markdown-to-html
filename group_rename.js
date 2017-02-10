'use strict';

// Connection URL 
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/group';
var collectionName = 'objects';
var group_list = ['官方人員', '認證達人', '超級版主', '分區板主', '開發團隊', '官方資源組', '實習版主', 
	'合作開發組', '精品資源組', '註冊用戶', '註冊實名用戶', '禁止發言', '禁止IP', '禁止訪問'];

var MongoClient = require('mongodb').MongoClient;

// delete "value" : "註冊用戶 "
MongoClient.connect(url, function(err, db) {

	var contents, id;
	var collection = db.collection(collectionName);

	collection.remove({"_id" : ObjectId("56f3547ec7ac2e9a608793c2")}, function(err, result) {
        if (err) {
            console.log(err);
        }
        db.close();
    });
    
    collection.remove({"_id" : ObjectId("572819cbc7ac2e9a608796ef")}, function(err, result) {
        if (err) {
            console.log(err);
        }
        db.close();
    });
});


// group:註冊用戶 :members
group_list.forEach(function(group) {
	MongoClient.connect(url, function(err, db) {

		var contents, id;
		var collection = db.collection(collectionName);

		collection.find({"_key":"group:" + group + " :members"}).toArray(function(err, docs) {
			if (docs.length > 0){
				console.log("Found the " + group + " records");

				docs.forEach(function(element) {
		    		id = element._id;
					collection.updateOne({_id : id}, {$set: {_key : "group:" + group + ":members"}}, function(err, result) {
	        			console.log(err);
						db.close();
					});
				});
			} else {
				console.log("Found no records");
				db.close();
			}
		});
	});
})

// group:註冊用戶 :owners
group_list.forEach(function(group) {
	MongoClient.connect(url, function(err, db) {

		var contents, id;
		var collection = db.collection(collectionName);

		collection.find({"_key":"group:" + group + " :owners"}).toArray(function(err, docs) {
			if (docs.length > 0){
				console.log("Found the " + group + " records");

				docs.forEach(function(element) {
		    		id = element._id;
					collection.updateOne({_id : id}, {$set: {_key : "group:" + group + ":owners"}}, function(err, result) {
	        			console.log(err);
						db.close();
					});
				});
			} else {
				console.log("Found no records");
				db.close();
			}
		});
	});
})


// "group:註冊用戶 "
group_list.forEach(function(group) {
	MongoClient.connect(url, function(err, db) {

		var contents, id;
		var collection = db.collection(collectionName);

		collection.find({"_key":"group:" + group + " "}).toArray(function(err, docs) {
			if (docs.length > 0){
				console.log("Found the " + group + " records");

				docs.forEach(function(element) {
		    		id = element._id;
					collection.updateOne({_id : id}, {$set: {_key : "group:" + group, name: group, slug: group, userTitle: group}}, function(err, result) {
	        			console.log(err);
						db.close();
					});
				});
			} else {
				console.log("Found no records");
				db.close();
			}
		});
	});
})

// groups:visible:name
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");

	var contents, id;
	var collection = db.collection(collectionName);
	
	collection.find({"_key":"groups:visible:name"}).toArray(function(err, docs) {
		if (docs.length > 0){
			console.log("Found the groups:visible:name records");

			docs.forEach(function(element) {
	    		id = element._id;
	    		var value = element.value;
	    		group_list.forEach(function(group) {
		    		if(element.value.includes(group)){
		    			collection.updateOne({_id : id}, {$set: {value: group + ":" + group}}, function(err, result) {
		        			console.log(err);
						});
		    		}
		    	})
			});
			db.close();
		} else {
			console.log("Found no records");
			db.close();
		}
	});
});


//groups:visible:createtime
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");

	var contents, id;
	var collection = db.collection(collectionName);

	collection.find({"_key":"groups:visible:createtime"}).toArray(function(err, docs) {
		if (docs.length > 0){
			console.log("Found the groups:visible:createtime records");

			docs.forEach(function(element) {
	    		id = element._id;
	    		var value = element.value;
	    		group_list.forEach(function(group) {
		    		if(element.value.includes(group)){
		    			collection.updateOne({_id : id}, {$set: {value: group}}, function(err, result) {
		        			console.log(err);
						});
		    		}
		    	})
			});
			db.close();
		} else {
			console.log("Found no records");
			db.close();
		}
	});
});


//groups:createtime
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");

	var contents, id;
	var collection = db.collection(collectionName);

	collection.find({"_key":"groups:createtime"}).toArray(function(err, docs) {
		if (docs.length > 0){
			console.log("Found the groups:createtime records");

			docs.forEach(function(element) {
	    		id = element._id;
	    		var value = element.value;
	    		group_list.forEach(function(group) {
		    		if(element.value.includes(group)){
		    			collection.updateOne({_id : id}, {$set: {value: group}}, function(err, result) {
		        			console.log(err);
						});
		    		}
		    	})
			});
			db.close();
		} else {
			console.log("Found no records");
			db.close();
		}
	});
});

//groups:visible:memberCount
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");

	var contents, id;
	var collection = db.collection(collectionName);

	collection.find({"_key":"groups:visible:memberCount"}).toArray(function(err, docs) {
		if (docs.length > 0){
			console.log("Found the groups:visible:memberCount records");

			docs.forEach(function(element) {
	    		id = element._id;
	    		var value = element.value;
	    		group_list.forEach(function(group) {
		    		if(element.value.includes(group)){
		    			collection.updateOne({_id : id}, {$set: {value: group}}, function(err, result) {
		        			console.log(err);
						});
		    		}
		    	})
			});
			db.close();
		} else {
			console.log("Found no records");
			db.close();
		}
	});
});

// update group:註冊用戶 member count
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");

	var contents, id;
	var collection = db.collection(collectionName);
	collection.find({"_key":"group:註冊用戶:members"}).toArray(function(err, members) {
		collection.find({"_key":"group:註冊用戶"}).toArray(function(err, docs) {
			console.log("Found the group:註冊用戶 records");
			id = docs[0]._id;
			collection.updateOne({_id : id}, {$set: {memberCount: members.length}}, function(err, result) {
				console.log(err);
				db.close();
			});
		})
	})
});
