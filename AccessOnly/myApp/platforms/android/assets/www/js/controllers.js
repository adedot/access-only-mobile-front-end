angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('VenuesCtrl', function($scope, $http) {

    $scope.venues = $http.get("http://access-only-back-end.herokuapp.com/venues").success(function(data) {
        $scope.venues = data;
        console.log(scope.venues);
      });

})

.controller('VenueCtrl', function($scope, $stateParams, $http) {

  var venuename=$stateParams["venueName"];

  $scope.products = $http.get("http://access-only-back-end.herokuapp.com/venues/products?venuename="+venuename).success(function(data) {
        $scope.products = data;
        console.log(scope.products);
      });

})

.controller('CheckoutCtrl', function($scope, $stateParams, $http) {

  // var venuename=$stateParams["venueName"];

  // $scope.products = $http.get("http://http://localhost:5000/venues/products?venuename="+venuename).success(function(data) {
  //       $scope.products = data;
  //       console.log(scope.products);
  //     });

})

