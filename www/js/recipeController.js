angular.module('starter.recipeController', [])

.controller('RecipeCtrl', function($scope, $state, $http, $localstorage, $ionicPopup, $ionicPopover, ionicMaterialInk) {
  $scope.recipe = recipe_data[current_recipe_id];
  //console.log(recipe_data[current_recipe_id]);
})

.controller('RecipeEditCtrl', function($scope, $ionicPopup, $http, $state, $localstorage, $ionicHistory, ionicMaterialInk) {
  $scope.recipe = recipe_data[current_recipe_id];
  ionicMaterialInk.displayEffect();
})

.controller('RecipeEditInfoCtrl', function($scope, $http, $state, $localstorage, $ionicPopup, $ionicHistory, ionicMaterialInk) {
  console.log($scope.recipe.recipe_title);
  $http.get(serverIP + "/cook/api/getCategory.php")
    .success(function(data, status, headers, config) {
      $scope.category_list = data;
    })
})

.controller('RecipeEditIngredientsCtrl', function($scope, $ionicPopup, $http, $state, $ionicHistory, ionicMaterialInk) {
  console.log($state.$current);
})

.controller('RecipeEditStepsCtrl', function($scope, $ionicPopup, $http, $state, $ionicHistory, ionicMaterialInk) {
  console.log($state.$current);
})
