'use strict';
angular.module('nikApp')
.controller('homeController', ['$scope', '$uibModal', function ($scope, $uibModal) {
    $scope.loginModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'client/views/login.html',
        controller: 'modalController'
      });
    };
    $scope.closeModal = function() {
      console.log("closeModal");
      modalInstance.close()
    };
}]);
