angular.module('nikApp')
.controller('mainCtrl', ['$scope', function ($scope) {
  var length=2,pushIndex=0, playIndex=0;
  var videoQueue = [];
  //console.log("location.hostname", location);
  angular.element(document).ready(function ()  {
    $('#myVideo').bind('contextmenu',function() { 
      return false; 
    });
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
      //console.log("videoQueue", videoQueue);
    } else {
      playSrc = 'videos/default.mp4';
    }
    //console.log("videoQueue", videoQueue);
    //console.log("playSrc is", playSrc);
    videoPlayer = document.getElementById("myVideo");
    videoPlayer.removeAttribute("controls");
    videoPlayer.src = playSrc;
    videoPlayer.play();
  };

  var socket = io();
  socket.on('newFile', function(newPath) {
    videoPlayer = document.getElementById("myVideo");
    var playing = videoPlayer.currentSrc;
    if(playing == (location.href + 'videos/default.mp4')) {
      videoPlayer.removeAttribute("controls");
      videoPlayer.src = newPath.data;
      videoPlayer.play();
    } else {
      if(pushIndex >= length-1) {
        pushIndex = 0;
      } else {
        pushIndex++;
      }
      videoQueue[pushIndex] =  {
        status : "To be played",
        path : newPath.data
      };  
    }
    //console.log("videoQueue", videoQueue);
  });

}])