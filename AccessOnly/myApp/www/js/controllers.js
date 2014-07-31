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

.controller('VenuesCtrl', function($scope) {

  // Get list of venues
  $scope.venues = [
    { name: 'Rose Bar', id: 1 },
    { name: 'Shadow Room', id: 2 },
    { name: 'Lux Lounge', id: 3 },
    { name: 'Bar 7', id: 4 },
    { name: 'Josephines', id: 5 },
    { name: 'Eden', id: 6 }
  ];
})

.controller('VenueCtrl', function($scope, $stateParams) {
})
