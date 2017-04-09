var execSync = require('child_process').execSync;
var bodyParser = require('body-parser');
var pjson = require('./package.json');
var express = require('express');
var crypto = require('crypto');
var fs = require('fs');
var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

var a_log = function(output) {
  console.log(new Date()+" "+output);
}

var local_filename = function(hash) {
  var dir = app.get('STORAGE_DIR') || "/tmp";
  return dir+"/"+hash+".c";
}

var compile = function(data, debug) {
  return "TODO";
};

app.post('/compile', function (req, res) {
  var data = req.body.input_code;
  var hash = crypto.createHash('md5').update(data).digest("hex");
  var path = local_filename(hash);

  if (fs.existsSync(path)) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) { // Fall back to no cache
	a_log(err);
	res.send(
	    {id: hash,
	      rules: compile(data, req.body.is_debug)});
	return ;
      }
      res.send({id: hash, rules: data});
      return ;
    });
  } else {
    var compilation_results = compile(data, req.body.is_debug)
      fs.writeFile(path, compilation_results, function(err) {
	if (err) {
	  a_log(err);
	}
      });
    res.send({id: hash, rules: compilation_results});
  }
});

app.get('/download/:hash', function (req, res) {
  var hash = req.params.hash;
  var path = local_filename(hash);

  if (!hash.match("[a-fA-F0-9]{32}") || !fs.existsSync(path)) {
      a_log("invalid  download  request, redirect to  help for "+hash);
      res.redirect('/help');
      return ;
  }
  a_log("download request for "+path);
  res.download(path);
});

app.get('/app_version', function(req, res){
  res.send(pjson.version);
});

app.get('/version', function(req, res){
  var kernel = execSync('uname -r');
  var clang = execSync("clang --version");
  res.send(kernel+"<br>"+clang);
});

app.get('*', function(req, res) {
      res.redirect('/');
});

app.listen(3000);
