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

var local_filename = function(name, suffix) {
  var dir = app.get('STORAGE_DIR') || "/tmp";
  return dir+"/"+name+suffix;
}

var compile_bpf = function(id, debug) {
  var obj_file = local_filename(id, ".o");
  var src_file = local_filename(id, ".c");
  var clang_cmd = "clang -O2 -Wall -target bpf -c " + src_file +" -o " + obj_file;
  // TODO: use the test framework recently submitted upstream.
  var ip_cmd = "ip link set dev etho xdp obj "+ obj_file +" sec xdp ";

  try {
    return execSync(clang_cmd)+" "+execSync(ip_cmd);
  } catch (e) {
    return e.message;
  }
};

// TODO: review the caching.
app.post('/compile', function (req, res) {
  var data = req.body.input_code;
  var hash = crypto.createHash('md5').update(data).digest("hex");
  var path = local_filename(hash, ".c");

  // TODO: review failure states
  if (!fs.existsSync(path)) {
      fs.writeFile(path, data, function(err) {
	if (err) {
	  a_log(err);
	}
      });
  }

  var results = compile_bpf(hash, req.body.is_debug);
  res.send({id: hash, results: results});
});

app.get('/app_version', function(req, res){
  res.send(pjson.version);
});

app.get('/version', function(req, res){
  var kernel = execSync('uname -r');
  var clang = execSync("clang --version");
  res.send(kernel+" and "+clang);
});

app.get('*', function(req, res) {
      res.redirect('/');
});

app.listen(8080);
