#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var _str = require('underscore.string');
var mkdirp = require('mkdirp');

var args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: create-post.sh \"Title of my new post\"");
  process.exit(1);
}
var title = args[0];
var postsDir = path.join(__dirname, "_posts");
var contentRootDir = path.join(__dirname, "content");

exec("date +%FT%T%z", function (error, dateTime, stderr) {
  dateTime = dateTime.trim();
  var date = dateTime.substr(0, 10);
  var year = date.substr(0, 4);
  var month = date.substr(5, 2);
  var day = date.substr(8,2);

  var slug = _str.slugify(title);
  var filename = date + "-" + slug + ".markdown";
  var file = path.join(postsDir, filename);
  if (fs.existsSync(file)) {
    console.log('ERROR: %s already exists', file);
    process.exit(1);
  } else {
    var blogContentDir = path.join(contentRootDir, year, [month, day, slug].join('-'));
    mkdirp(blogContentDir, function (err) {
      if (err) {
        console.log('ERROR creating ' + blogContentDir + ': ' + err);
        process.exit(1);
      } else {
        console.log('Successfully created new content directory: ' + blogContentDir);
      }
    });
    var content = [];
    content.push('---');
    content.push('layout: post');
    content.push('title: "'+title+'"');
    content.push('date: ' + dateTime);
    content.push('---');
    content.push('');
    content.push('TODO');
    fs.writeFile(file, content.join('\n'), function(err) {
      if (err) {
        console.log('ERROR: ' + err);
      } else {
        console.log('Successfully created new post: ' + file);
      }
    });
  }
});
