// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.cart', {
      url: "/cart",
      views: {
        'menuContent' :{
          templateUrl: "templates/cart.html",
          controller: 'CartCtrl'
        }
      }
    })
     .state('app.checkout', {
      url: "/checkout",
      views: {
        'menuContent' :{
          templateUrl: "templates/checkout.html",
          controller: 'CheckoutCtrl'
        }
      }
    })
    .state('app.receipt', {
      url: "/receipt",
      views: {
        'menuContent' :{
          templateUrl: "templates/receipt.html",
          controller: 'ReceiptCtrl'
        }
      }
    })
    .state('app.venues', {
      url: "/venues",
      views: {
        'menuContent' :{
          templateUrl: "templates/venues.html",
          controller: 'VenuesCtrl'
        }
      }
    })
    .state('app.products', {
      url: "/venues/products/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/venueproducts.html",
          controller: 'ProductsCtrl'
        }
      }
    })
    .state('app.single', {
      url: "/venues/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/venue.html",
          controller: 'VenueCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

