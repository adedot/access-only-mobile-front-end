
//var uri = "https://apps.getaccessonly.com/";
// var uri = "http://localhost:5000/"

var uri = "http://access-only-back-end.herokuapp.com/";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $location) {
  // Form data for the login modal

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(loginData) {
    console.log('Doing login', loginData);

    $http.post(uri + "users/login",{
      access_code: loginData.access_code
    }).success(function(response){

        if(response.code == "OK"){
          sessionStorage.transaction_number = 0;
            $location.path( "/app/venues" );
          }
          else{
            alert(loginData.access_code + " is wrong");
          }
      }
    );

  };

})
.controller('VenuesCtrl', function($scope, $http) {

  $scope.venues = $http.get(uri +"venues").success(function(data) {
      $scope.venues = data;
      console.log($scope.venues);
    });


})
.controller('VenueCtrl', function($scope, $stateParams, $http) {

  
  sessionStorage.venueId = $stateParams["id"];


  $scope.venues = $http.get(uri + "venues/"+sessionStorage.venueId)
      .success(function(data) {
        $scope.venues = data;
        sessionStorage.venueName = data[0].name;
        console.log($scope.venues);
      });


})
.controller('ProductsCtrl', function($scope, $stateParams, $http, $q, $timeout) {

  if(sessionStorage.transaction_number == 0 || sessionStorage.transaction_number === 'undefined'){
         
          var d = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x' ? r : (r&0x7|0x8)).toString(16);
          });
          sessionStorage.transaction_number = uuid;
          
  }

  var venueId = $stateParams["id"];

  $scope.products = $http.get(uri + "venues/"+venueId+ "/products").success(function(data) {
        $scope.products = data;
        console.log($scope.products);
      });



  // On click set the amount
  $scope.submit = function(product) {

      sessionStorage.amount = product.price;

      var defer = $q.defer();


    // Post Cart item
    $http.post(uri + "cart/additem",
      {
        cartId:sessionStorage.transaction_number,
        quantity: 1,
        productId: product.id,
        price: product.price
         
      }).success(function(data){
        // $timeout(2000);
         $timeout(function(){
          
          defer.resolve(data);
          $scope.products = data;
          console.log($scope.products);
        }, 1000);

    });


  }; 

})
.controller('CartCtrl', function($scope, $http, $location,  $timeout) {

  var transactionId = sessionStorage.transaction_number;

  // Get the products for cart
  $scope.products = $http.get(uri + "orders/"+transactionId+ "/products")
  .success(function(data) {
        $scope.products = data;
        console.log($scope.products);
   
  });

  $scope.submit = function() {

    $location.path( "/app/checkout" );

  }

})
.controller('CheckoutCtrl', function($scope, $stateParams, $http, $location) {


  $scope.price = sessionStorage.amount;

  // Get Credit Card Information and create credit card charge
  $scope.submit = function(payload, user) {

    sessionStorage.name = payload.name;
    sessionStorage.email = user.email;
    sessionStorage.phone = user.phone;
    balanced.card.create(payload, handleResponse);
    

  };

  $scope.delete = function(){
    $http.delete(uri + "cart/remove", {

    }).success(function(){
      // 
      console("data deleted");
    });

  }

  function handleResponse(response) {
      if (response.status_code === 201) {
        var fundingInstrument = response.cards != null ? response.cards[0] : response.bank_accounts[0];
        // Call your backend
         $scope.data = $http.post(uri + "cart/checkout", {
          uri: fundingInstrument.href,
          amount: sessionStorage.amount, 
          cartId: sessionStorage.transaction_number,
          venueId: sessionStorage.venueId,
          venueName: sessionStorage.venueName,
          name: sessionStorage.name,
          email: sessionStorage.email, 
          phone: sessionStorage.phone
        }).success(function(data) {
            // Go to Receipt Page
            $location.path( "/app/receipt" );
            $scope.data = data;
         
        });


      } else {
        alert("Process has failed");
        // Failure page
      }
  };
 

})

.controller('ReceiptCtrl', function($scope, $http, $location){


    $scope.order_info = {
      venueName: sessionStorage.venueName,
      name: sessionStorage.name, 
      email: sessionStorage.email, 
      phone: sessionStorage.phone,
      amount:sessionStorage.amount
    };

    // On click set the amount
  $scope.submit = function(product) {

    sessionStorage.amount = 0;
    sessionStorage.transaction_number = 0;

    $location.path( "/app/venues" );
  };


})
