angular.module('starter.recipeEditController', [])

.controller('RecipeEdit', function($scope, $ionicPopup, $http, $state, $localstorage, $ionicHistory, ionicMaterialInk) {
  
  ionicMaterialInk.displayEffect();
})

.controller('RecipeEditIngredients', function($scope, $ionicPopup, $http, $state, $ionicHistory, ionicMaterialInk) {
  console.log($state.$current);
})

.controller('RecipeEditSteps', function($scope, $ionicPopup, $http, $state, $ionicHistory, ionicMaterialInk) {
  console.log($state.$current);
})
