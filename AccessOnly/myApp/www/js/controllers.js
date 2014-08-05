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

    // set the session transaction number


  $scope.venues = $http.get("http://access-only-back-end.herokuapp.com/venues").success(function(data) {
      $scope.venues = data;
      console.log(scope.venues);
    });



  // On click set the amount
  $scope.submit = function() {

      sessionStorage.transaction_number = 8000;

  }; 

})

.controller('VenueCtrl', function($scope, $stateParams, $http) {

  var venuename=$stateParams["venueName"];

  $scope.products = $http.get("http://access-only-back-end.herokuapp.com/venues/products?venuename="+venuename.trim()).success(function(data) {
        $scope.products = data;
        console.log($scope.products);
      });

  // On click set the amount
  $scope.submit = function(product) {

    sessionStorage.amount = product.price;

  }; 

})

.controller('CheckoutCtrl', function($scope, $stateParams, $http, $location) {

  
 

  function handleResponse(response) {
    if (response.status_code === 201) {
      var fundingInstrument = response.cards != null ? response.cards[0] : response.bank_accounts[0];
      // Call your backend
       $scope.data = $http.post("http://access-only-back-end.herokuapp.com/cart/checkout", {
        uri: fundingInstrument.href,
        amount: sessionStorage.amount, 
        cartId: sessionStorage.transaction_number
      }).success(function(data) {
          // Go to Receipt Page
          $location.path( "/app/receipt" );
          $scope.data = data;
       
      });


    } else {
      console.log("Failed");
    }
  };

  // Get Credit Card Information and create credit card charge
  $scope.submit = function(payload) {

    balanced.card.create(payload, handleResponse);
  };
 

})

.controller('ReceiptCtrl', function($scope, $http){

  // // Get Order number from session
  // http.get("").success(){

  // }

    $scope.order = {amount:sessionStorage.amount};

    // On click set the amount
  $scope.submit = function(product) {

    sessionStorage.amount = 0;
    sessionStorage.transaction_number = 0;
  };


})

