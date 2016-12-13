angular.module('nikApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'LocalStorageModule'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'client/views/main.html',
            controller: 'homeController'
        })
        .state('admin', {
            templateUrl: 'client/views/admin/dashboard.html',
            controller: 'homeController',
            resolve: {
                'task' : function(localStorageService, $location) {
                    var userInfo = localStorageService.get('userInfo');
                    // if(!userInfo.userId) {
                    //   $location.url('/')
                    // }
                }
            }
        })
        .state('admin.dashboard', {
          url : '/admin',
          templateUrl: 'client/views/admin/adminDashboard.html',
          controller: 'adminController'
        })
        .state('admin.addUser', {
            url : '/addUser',
            templateUrl: 'client/views/admin/addUser.html',
            controller: 'adminController'
        })
        .state('admin.addCamera', {
            url : '/addCamera',
            templateUrl: 'client/views/admin/addCamera.html',
            controller: 'adminController'
        })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
    localStorageServiceProvider.setPrefix('neoview');
}]);
