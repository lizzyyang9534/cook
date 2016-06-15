angular.module('starter.recipeController', [])

.service('CurrentRecipe', function() {
  current_recipe = {};
  this.getRecipe = function() {
    return current_recipe;
  };
  this.updateRecipe = function(item) {
    current_recipe = item;
  };
})

.controller('RecipeCtrl', function($scope, $state, $http, $timeout, $localstorage, $ionicPopup, $ionicPopover, $ionicLoading, ionicMaterialInk, CurrentRecipe) {
  $scope.recipe = {};
  $scope.initialize = function() {
    //console.log(current_recipe_id);
    $scope.recipe = recipe_data[current_recipe_id];
    CurrentRecipe.updateRecipe(recipe_data[current_recipe_id]);
    console.log(CurrentRecipe.getRecipe());

    $http.get(serverIP + "/cook/api/getCategory.php")
      .success(function(data, status, headers, config) {
        $scope.category_list = data;
      })

    if ($scope.recipe.recipe_image != null) {
      $("div.recipe_edit_image").html("<img class=\"recipe_edit_image\" src=\"" + $scope.recipe.recipe_image + "\">");
    }

    $scope.ingredient_list = recipe_data[current_recipe_id].recipe_ingredients;
  }

  $scope.editRecipe = function(tabs) {
    $state.go("app.recipe_edit." + tabs);
  }

  $scope.saveRecipe = function() {
    console.log($scope.recipe);
  }
  ionicMaterialInk.displayEffect();
})

.controller('RecipeEditCtrl', function($scope, $ionicPopup, $http, $state, $timeout, $localstorage, $ionicHistory, ionicMaterialInk) {
  $timeout(function() {
    $scope.recipe = recipe_data[current_recipe_id];

    $http.get(serverIP + "/cook/api/getCategory.php")
      .success(function(data, status, headers, config) {
        $scope.category_list = data;
      })

    if ($scope.recipe.recipe_image != null) {
      $("div.recipe_edit_image").html("<img class=\"recipe_edit_image\" src=\"" + $scope.recipe.recipe_image + "\">");
    }

    $scope.ingredient_list = recipe_data[current_recipe_id].recipe_ingredients;
  }, 100);

  $scope.saveRecipe = function() {
    console.log($scope.recipe);
  }
  ionicMaterialInk.displayEffect();
})

.controller('RecipeAddCtrl', function($scope, $state, $http, $timeout, $localstorage, $ionicPopup, $ionicLoading, ionicMaterialInk) {
  $scope.recipe_add = {};
  $http.get(serverIP + "/cook/api/getCategory.php")
    .success(function(data, status, headers, config) {
      $scope.category_list = data;
      console.log(data);
    })

  $scope.submitRecipe = function() {
    console.log($scope.recipe_add);

    $http.post(serverIP + "/cook/api/recipe_add.php", {
        "member_id": user_data.member_id,
        "recipe_title": $scope.recipe_add.recipe_title,
        "recipe_category": $scope.recipe_add.recipe_category,
        "recipe_content": $scope.recipe_add.recipe_content,
        "recipe_image": $scope.recipe_add.recipe_image,
        "recipe_ingredients": $scope.recipe_add.recipe_ingredients
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        $state.go("app.home");
      })
  }
})
