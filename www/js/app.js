// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.appController', 'starter.recipeEditController', 'ionic-material'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/header.html',
    controller: 'HeaderCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'main': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.recipe', {
    url: '/recipe',
    views: {
      'main': {
        templateUrl: 'templates/recipe.html'
      }
    }
  })

  .state('app.recipe_edit', {
      url: '/recipe_edit',
      views: {
        'main': {
          templateUrl: 'templates/recipe_edit.html'
        }
      }
    })

  .state('app.recipe_edit.info', {
    url: '/info',
    views: {
      'recipe': {
        templateUrl: 'templates/recipe_edit_info.html'
      }
    }
  })

  .state('app.recipe_edit.ingredients', {
    url: '/ingredients',
    views: {
      'recipe': {
        templateUrl: 'templates/recipe_edit_ingredients.html'
      }
    }
  })

  .state('app.recipe_edit.steps', {
    url: '/steps',
    views: {
      'recipe': {
        templateUrl: 'templates/recipe_edit_steps.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
