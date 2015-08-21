var fs = require("fs");
var apiDocs2Tern = require("../apiDocs2Tern");

var filepath =  __dirname + '/../../protractor.js';
make_plugin(filepath);

function make_plugin(fpath) {
  var filename = __dirname+"/../apiDocs/toc.json";
  var api = JSON.parse(fs.readFileSync(filename, "utf8"));
  var generator = new apiDocs2Tern.Generator();
  var def = generator.process(api);

  var rbuff = fs.readFileSync(__dirname+"/template.js", "utf8");
  var wbuff = rbuff.replace(/'!def'/, function () {return JSON.stringify(def, null, ' ')});
  fs.writeFile(fpath, wbuff, "utf8", function (err) {
      if ( err ) {
          console.error("Failed write plugin : "+err);
          process.exit(1);
      }
      console.info("Finished make plugin : "+fpath);
  });
}