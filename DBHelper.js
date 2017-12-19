var mongodb = require("mongodb");
var mongodbClient = mongodb.MongoClient;
var CONN_LINK = "mongodb://127.0.0.1:27017/goodsmanager";

function connection(cb) {
	mongodbClient.connect(CONN_LINK, function(err, db) {
		if(err) {
			console.log(err);
			return;
		}
		cb(db);
	});
};
exports.insertOne = function(tab, data, cb) {
	connection(function(db) {
		db.collection(tab).insertOne(data, function(err, results) {
			cb(err, results);
		});
	});
};
exports.inserMany = function() {
	connection(function(db) {
		db.collection(tab).insertMany(data, function(err, results) {
			cb(err, results);
		});
	});
};
exports.findOne = function(tab, where, cb) {
	connection(function(db) {
		db.collection(tab).findOne(where, function(err, results) {
			cb(err, results)
		});
	});
};
exports.findOneById = function(tab, id, cb) {
	connection(function(db) {
		db.collection(tab).findOne({
			_id: mongodb.ObjectID(id)
		}, function(err, results) {
			cb(err, results)
		});
	});
};
exports.find = function(tab, data, cb) {
	if(data.where == undefined)
		data.where = {};
	if(data.sort == undefined)
		data.sort = {};
	if(data.limit == undefined)
		data.limit = 0;
	if(data.skip == undefined)
		data.skip = 0;
	connection(function(db) {
		db.collection(tab)
			.find(data.where)
			.sort(data.sort)
			.skip(data.skip)
			.limit(data.limit)
			.toArray(function(err, results) {
				cb(err, results);
			});
	});
};
exports.count = function(tab, where, cb) {
	connection(function(db) {
		db.collection(tab).count(where).then(function(count) {
			cb(count);
		});
	});
};
exports.deleteOneById = function(tab, id, cb) {
	connection(function(db) {
		db.collection(tab).deleteOne({
			"_id": mongodb.ObjectID(id)
		}, function(err, results) {
			cb(err, results);
		});
	});
};
exports.updateOneById = function(tab, id, type, cb) {
	connection(function(db) {
		db.collection(tab).updateOne({
			_id: mongodb.ObjectID(id)
		}, type, function(err, results) {
			cb(err, results);
		});
	});
};
exports.updateOne = function(tab, flag, type, cb) {
	connection(function(db) {
		db.collection(tab).updateOne(flag, type, function(err, results) {
			cb(err, results);
		});
	});
};