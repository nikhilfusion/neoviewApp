'use strict';
angular.module('nikApp')
.controller('modalController', ['$scope', '$uibModalInstance', 'localStorageService', '$state', function ($scope, $uibModalInstance, localStorageService, $state) {
    $scope.closeModal = function() {
      console.log("closeModal");
      $uibModalInstance.close();
    };
    $scope.login = function(user) {
      console.log("user is", user);
      localStorageService.set('userInfo', user);
      $uibModalInstance.close();
      $state.go('admin');
    };
}]);
