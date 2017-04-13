var execFileSync = require('child_process').execFileSync;
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
};

var a_cmd = function(cmd) {
  a_log("CMD "+cmd);
  execSync(cmd);
};

var local_filename = function(name, suffix) {
  var dir = app.get('STORAGE_DIR') || "/";
  return dir+"tmp/"+name+suffix;
}

var verify_xdp_program = function(id, debug, test) {
  var xdp_program = local_filename(id, ".c");
  var test_dir = local_filename(id, "");
  var obj_file = test_dir+"/"+test+".o";
  var output = "";

  a_cmd("mkdir -pv "+test_dir);
  try {
    if (!fs.existsSync(test_dir)) {
      throw "Test directory does not exist";
    }
    // TODO: check the copy command.
    a_cmd("cp public/tasks/"+test+"/* "+test_dir);
    try {
      var clang_cmd = execFileSync('/usr/bin/clang',
        ["-O2", "-Wall", "-target", "bpf", "-c", xdp_program, "-o", obj_file], {
          cwd: process.cwd(),
          env: process.env,
          stdio: 'pipe',
          encoding: 'utf-8'
        });
      if (clang_cmd)
        output += clang_cmd.output;
      // TODO: use the test framework recently submitted upstream to run the test.
      // Comment above can be deleted when the below works.
      a_cmd("make -C "+test_dir);
      output += execFileSync(test_dir+"/test_run");
    } catch (e) {
      return e.message;
    }
  } catch (e) {
    a_log(e);
    return generic_err_msg(id)
  }

  return output;
};

var generic_err_msg = function(hash) {
  return "There was a error saving your program for compilation, "+
    "please report this on Github with the program and id "+hash;
};

/**
 * /compile - Take the user input and create a hash from it. Use the hash to
 * store a temporarily C file that can be used by clang for compilation. If
 * writing the file fails user should get a error message. If file already
 * exists it gets logged. Then hash is passed til verify_xdp_program and the
 * results is returned to the client.
 */
// TODO: add a user specific has to avoid collision based on two users writing the same program.
app.post('/compile', function (req, res) {
  var task_number = req.body.task_number;
  var data = req.body.input_code;
  var hash = crypto.createHash('md5').update(data).digest("hex");
  var path = local_filename(hash, ".c");

  /* We want to capture this because of the various UNIX specific errors that
   * could occur like EACCES or other JavaScript issues.
   */
  try {
    if (!fs.existsSync(path)) {
      fs.writeFile(path, data, function(err) {
        if (err) {
          a_log("writeFile "+err);
	  res.send({id: hash, results: generic_err_msg(hash)});
        } else {
          a_log("writeFile "+path);
	  res.send( {
	    id: hash, 
	    results: verify_xdp_program(hash, req.body.is_debug, task_number)
	  });
        }
      });
    } else {
      a_log("No errors so far so we can compile "+hash+" using cache -> "+path);
      res.send({
	id: hash, 
	results: verify_xdp_program(hash, req.body.is_debug, task_number)
      });
    }
  } catch(e) {
    a_log(e);
    res.send({
      id: hash,
      results: generic_err_msg(hash)
    });
  }
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
