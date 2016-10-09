/**
 * Created by junghyun on 2016. 10. 9..
 */
var srt_to_vtt_bulk = require('../');

//read a directory
var directoryPath = process.argv[2];
srt_to_vtt_bulk(directoryPath);