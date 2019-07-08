/**
 * Created by Ivan Perez on 2019
 */

var vtt_to_srt = require("./vtt-to-srt");
var fs = require("fs");
var path = require("path");
var recursive = require("recursive-readdir");

module.exports = function(directoryPath) {
  console.log("Searching srt files in", directoryPath);
  //collect srt files
  recursive(directoryPath, function(err, fileNames) {
    var srtFileNames = fileNames.filter(function(fileName) {
      return fileName.endsWith(".vtt");
    });

    console.log("There are", srtFileNames.length, "vtt files.");

    //a vtt file has the same name with the corresponding srt file
    var vttFileNames = srtFileNames.map(function(srtFileName) {
      var lastIndex = srtFileName.lastIndexOf(".");
      return srtFileName.slice(0, lastIndex) + ".srt";
    });

    console.log("Converting vtt to srt...");

    //for each srt, convert the srt file to vtt file
    for (var i = 0; i < srtFileNames.length; i++) {
      var srtFileName = srtFileNames[i];
      var vttFileName = vttFileNames[i];
      var input = fs.createReadStream(srtFileName);
      var output = fs.createWriteStream(vttFileName);
      console.log(vttFileName);
      input.pipe(vtt_to_srt()).pipe(output);
    }
    console.log("Done");
  });
};
