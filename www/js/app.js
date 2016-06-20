// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.loginController', 'starter.homeController', 'starter.recipeController', 'ionic-material', 'ngCordova'])

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
    },
    cache: false
  })

  .state('app.recipe', {
    url: '/recipe',
    views: {
      'main': {
        templateUrl: 'templates/recipe.html'
      }
    }
  })

  .state('app.recipe_add', {
    url: '/recipe_add',
    views: {
      'main': {
        templateUrl: 'templates/recipe_add.html'
      }
    }
  })

  .state('app.recipe_edit_test', {
    url: '/recipe_edit_test',
    views: {
      'main': {
        templateUrl: 'templates/recipe_edit_test.html'
      }
    }
  })

  .state('app.recipe_edit', {
    url: '/recipe_edit',
    abstract: true,
    views: {
      'main': {
        templateUrl: 'templates/recipe_edit.html'
      }
    }
  })

  .state('app.recipe_edit.info', {
    url: '/info',
    views: {
      'info-tab': {
        templateUrl: 'templates/recipe_edit_info.html'
      }
    }
  })

  .state('app.recipe_edit.ingredients', {
    url: '/ingredients',
    views: {
      'ingredients-tab': {
        templateUrl: 'templates/recipe_edit_ingredients.html'
      }
    }
  })

  .state('app.recipe_edit.steps', {
    url: '/steps',
    views: {
      'steps-tab': {
        templateUrl: 'templates/recipe_edit_steps.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.constant('API', {
  local: "http://localhost:8100",
  client: "http://140.123.175.102:8080"
})
