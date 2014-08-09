#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var _str = require('underscore.string');

var args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: create-post.sh \"Title of my new post\"");
  process.exit(1);
}
var title = args[0];
var postsDir = path.join(__dirname, "_posts");

exec("date +%FT%T%z", function (error, date, stderr) {
  date = date.trim();
  var day = date.substr(0, 10)
  var slug = _str.slugify(title);
  var filename = day + "-" + slug + ".markdown";
  var file = path.join(postsDir, filename);
  if (fs.existsSync(file)) {
    console.log('ERROR: %s already exists', file);
    process.exit(1);
  } else {
    var content = [];
    content.push('---');
    content.push('layout: post');
    content.push('title: "'+title+'"');
    content.push('date: ' + date);
    content.push('---')
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
