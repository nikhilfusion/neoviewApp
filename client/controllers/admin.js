'use strict';
angular.module('nikApp')
.controller('adminController', ['$scope', function ($scope) {
  $scope.cameras = [{
    "id" : 1,
    "name" : "camera1"
  },{
    "id" : 2,
    "name" : "camera2"
  },{
    "id" : 3,
    "name" : "camera3"
  }];
  $scope.middleboxes = [{
    "id" : 1,
    "name" : "box1"
  },{
    "id" : 2,
    "name" : "box2"
  },{
    "id" : 3,
    "name" : "box3"
  }];
}]);
