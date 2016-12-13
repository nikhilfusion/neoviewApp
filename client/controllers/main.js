angular.module('nikApp')
.controller('mainController', ['$scope', function ($scope) {
    var length=2,pushIndex=0, playIndex=0;
    var videoQueue = [],camera;
    var socket = io();
    socket.on('cameraConnect', function(cam) {
        camera = cam;
    });
    angular.element(document).ready(function ()  {
        // $('#myVideo').bind('contextmenu',function() {
        // return false;
        // });
        $('#myVideo').bind('ended', function(){
        nextVideo();
        });
    });

    function nextVideo() {
        if(videoQueue.length > 0 && videoQueue[playIndex] && videoQueue[playIndex].path) {
          videoQueue[playIndex].status = 'played';
          if(playIndex >= length-1) {
              playIndex = 0;
          } else {
              playIndex++;
          }
          var playSrc;
          if(videoQueue[playIndex].status === 'To be played') {
              playSrc = videoQueue[playIndex].path
          } else {
              playSrc = 'videos/default.mp4';
          }
        } else {
          playSrc = 'videos/default.mp4';
        }
        videoPlayer = document.getElementById("myVideo");
        videoPlayer.removeAttribute("controls");
        videoPlayer.src = playSrc;
        videoPlayer.play();
    };

    socket.on('newFile', function(newPath) {
        //console.log("newpath", newPath);
        videoPlayer = document.getElementById("myVideo");
        var playing = videoPlayer.currentSrc;
        if(playing == (location.href + 'videos/default.mp4')) {
        videoPlayer.removeAttribute("controls");
        videoPlayer.src = newPath;
        videoPlayer.play();
        } else {
        if(pushIndex >= length-1) {
            pushIndex = 0;
        } else {
            pushIndex++;
        }
        videoQueue[pushIndex] =  {
            status : "To be played",
            path : newPath
        };
        }
        //console.log("videoQueue", videoQueue);
    });

}])
