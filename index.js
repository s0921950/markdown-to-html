'use strict';

var Remarkable = require('remarkable');

// Connection URL 
var url = 'mongodb://10.134.98.13:27017/1';
var collectionName = 'objects_copy';

var md = new Remarkable();
var md = new Remarkable({
	html:         true,        // Enable HTML tags in source
	xhtmlOut:     true,        // Use '/' to close single tags (<br />)
	breaks:       true,        // Convert '\n' in paragraphs into <br>
	langPrefix:   'language-',  // CSS language prefix for fenced blocks
	linkify:      false,        // Autoconvert URL-like text to links

	// Enable some language-neutral replacement + quotes beautification
	typographer:  false,

	// Double + single quotes replacement pairs, when typographer enabled,
	// and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
	quotes: '“”‘’',

	// Highlighter function. Should return escaped HTML,
	// or '' if the source string is not changed
	highlight: function (/*str, lang*/) { return ''; }
});

var MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {

	console.log("Connected correctly to server");

	var contents, id, htmlContent;
	var collection = db.collection(collectionName);

	collection.find({ $and: [{ "content": { $exists: true } }, { "pid" : { $exists: true }}]}).toArray(function(err, docs) {
		console.log("Found the following records");

		docs.forEach(function(element) {
    		id = element._key;
    		htmlContent = md.render(element.content);
    		console.log(htmlContent);
			collection.updateOne({ _key : id }, { $set: { content : htmlContent } }, function(err, result) {
				console.log("Updated");
				db.close();
			});
		});

	});

});