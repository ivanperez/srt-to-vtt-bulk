/**
 * Created by junghyun on 2016. 10. 9..
 */

var srt_to_vtt = require('srt-to-vtt');
var fs = require('fs');
var path = require('path');

module.exports = function (directoryPath){

    //collect srt files
    fs.readdir(directoryPath, function(err, fileNames){
        var srtFileNames = fileNames.filter(function(fileName){
            return fileName.endsWith('.srt');
        });

        // console.log(srtFileNames);


        //a vtt file has the same name with the corresponding srt file
        var vttFileNames = srtFileNames.map(function(srtFileName){
            var lastIndex = srtFileName.lastIndexOf('.');
            return srtFileName.slice(0,lastIndex) + '.vtt';
        });

        // console.log(vttFileNames);

        //for each srt, convert the srt file to vtt file
        for (var i=0;i<srtFileNames.length;i++){
            var srtFileName = srtFileNames[i];
            var vttFileName = vttFileNames[i];
            var srtFilePath = path.join(directoryPath, srtFileName);
            var vttFilePath = path.join(directoryPath, vttFileName);
            var input = fs.createReadStream(srtFilePath);
            var output = fs.createWriteStream(vttFilePath);
            input.pipe(srt_to_vtt()).pipe(output);
        }
    });
};