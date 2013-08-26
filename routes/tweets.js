var mongo = require('mongodb'),
    BSON = mongo.BSONPure,
    Server = mongo.Server,
    server = new Server('localhost', 27017, {auto_reconnect: true}),
    Db = mongo.Db,
    dbName = "tweetdb",
    collection = "tweets",
    db = new Db(dbName, server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to " + dbName + " database");
        db.collection(collection, {strict:true}, function(err, collection) {});
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving tweet: ' + id);
    db.collection(collection, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection(collection, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add= function(req, res) {
    var tweet = req.body;
    console.log('Adding tweet: ' + JSON.stringify(tweet));
    db.collection(collection, function(err, collection) {
        collection.insert(tweet, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var tweet = req.body;
    console.log('Updating tweet: ' + id);
    console.log(JSON.stringify(tweet));
    db.collection(collection, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, tweet, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating tweet: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(tweet);
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting tweet: ' + id);
    db.collection(collection, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

