/**
 * Created by Ivan Perez on 2019
 */

var vtt_to_srt = require('vtt-to-srt');
var fs = require('fs');
var path = require('path');

module.exports = function (directoryPath){
    console.log('Searching srt files in', directoryPath);
    //collect srt files
    fs.readdir(directoryPath, function(err, fileNames){
        var srtFileNames = fileNames.filter(function(fileName){
            return fileName.endsWith('.vtt');
        });

        console.log("There are", srtFileNames.length, "vtt files.");


        //a vtt file has the same name with the corresponding srt file
        var vttFileNames = srtFileNames.map(function(srtFileName){
            var lastIndex = srtFileName.lastIndexOf('.');
            return srtFileName.slice(0,lastIndex) + '.srt';
        });

        console.log("Converting vtt to srt...");

        //for each srt, convert the srt file to vtt file
        for (var i=0;i<srtFileNames.length;i++){
            var srtFileName = srtFileNames[i];
            var vttFileName = vttFileNames[i];
            var srtFilePath = path.join(directoryPath, srtFileName);
            var vttFilePath = path.join(directoryPath, vttFileName);
            var input = fs.createReadStream(srtFilePath);
            var output = fs.createWriteStream(vttFilePath);
            input.pipe(vtt_to_srt()).pipe(output);
        }
        console.log('Done');
    });
};
