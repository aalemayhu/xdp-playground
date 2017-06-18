var execSync = require('child_process').execSync;
var bodyParser = require('body-parser');
var pjson = require('./package.json');
var express = require('express');
var crypto = require('crypto');
var marked = require('marked');
var fs = require('fs');
var app = express();


app.use(express.static('public'));
app.use(bodyParser.json());

var kernel_version = execSync("uname -r | tr -d '\n'");

var content_dir = "public/pages";

var a_log = function(output) {
  console.log(new Date()+" "+output);
};

var local_filename = function(name, suffix) {
  var dir = app.get('STORAGE_DIR') || "/";
  return dir+"tmp/"+name+suffix;
};

var verify_xdp_program = function(id, debug, test) {
    var xdp_program = local_filename(id, ".c");
    var test_dir = local_filename(id, "");
    var obj_file = test_dir+"/xdp.o";

    try {
        if (!execSync("mkdir -pv "+test_dir))
            return "Failed to create test directory at "+test_dir;

        if (!fs.existsSync(test_dir))
            return test_dir+" directory does not exist";

        if (!execSync("cp "+content_dir+"/"+test+"/* "+test_dir))
            return "Failed to copy content to test directory";

        var clang_cmd = "/usr/bin/clang -O2 -Wall -target bpf -c "+xdp_program+" -o "+obj_file;
        clang_cmd += " -I/lib/modules/"+kernel_version+"/build/tools/testing/selftests/bpf ";
        clang_cmd += " -Wcompare-distinct-pointer-types";
        // clang_cmd += " -I/srv/app/public/include";
        console.log(clang_cmd);

        if (!execSync(clang_cmd))
            return "Failed to compile XDP program; "+clang_cmd;

        if (!execSync("/usr/bin/make -s", {cwd: test_dir}))
            return "Failed to compile test runner";

        return execSync("/usr/bin/make -s run", {cwd: test_dir})+ " ";
    } catch (e) {
        return e.message;
    }
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
    var challenge = req.body.challenge;
    var data = req.body.input_code;
    var hash = crypto.createHash('md5').update(data).digest("hex");
    var path = local_filename(hash, ".c");
    var send_results = function (challenge, hash, res, req) {
        var c = verify_xdp_program(hash, req.body.is_debug, challenge);
        console.log("compilation: "+c);
        res.send({ id: hash, results: c });
    };

    /* We want to capture this because of the various UNIX specific errors that
     * could occur like EACCES or other JavaScript issues.
     */
    try {
        if (!fs.existsSync(path)) {
            fs.writeFile(path, data, function(err) {
                if (err) { res.send({id: hash, results: hash+": "+err.message});
                    return;
                }

                send_results(challenge, hash, res, req);
            });

            return;
        }

        send_results(challenge, hash, res, req);
    } catch(e) {
        res.send({ id: hash, results: hash+": "+e.message });
    }
});

app.get('/app_version', function(req, res){
  res.send(pjson.version);
});

app.get('/about', function(req, res){
  fs.readFile('README.md', 'utf8', function (err, data) {
    if (data) {
      res.send(marked(data));
    } else {
      a_log(err);
      res.redirect('/');
    }
  })
});

app.get('/version', function(req, res){
  var clang = execSync("clang --version");
  res.send(kernel_version+" and "+clang);
});

app.get('/pages', function(req, res){
  fs.readdir(content_dir, (err, files) => {
    var pages = [];

    for (i in files) {
      var f = files[i];

      if (f.startsWith("intro"))
          continue;

      if (f.endsWith("html"))
        pages.push(f.replace(/\.[^/.]+$/, ""));
    }

    res.send(pages);
  });
});

app.get('*', function(req, res) {
      res.redirect('/');
});

app.listen(8080);
