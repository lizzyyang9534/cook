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
    CurrentRecipe.updateRecipe(recipe_data[current_recipe_id]);
    $scope.recipe = CurrentRecipe.getRecipe();

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

  $scope.deleteRecipe = function() {
    $http.post(serverIP + "/cook/api/recipe_delete.php", {
        "recipe_id": current_recipe_id
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        $state.go("app.home");
      })
  }
  ionicMaterialInk.displayEffect();
})

.controller('RecipeEditCtrl', function($scope, $ionicPopup, $http, $state, $timeout, $localstorage, $ionicHistory, ionicMaterialInk) {
  $timeout(function() {
    $scope.recipe_edit = recipe_data[current_recipe_id];

    $http.get(serverIP + "/cook/api/getCategory.php")
      .success(function(data, status, headers, config) {
        $scope.category_list = data;
      })

    if ($scope.recipe_edit.recipe_image != null) {
      $("div.recipe_edit_image").html("<img class=\"recipe_edit_image\" src=\"" + $scope.recipe_edit.recipe_image + "\">");
    }
  }, 100);

  $scope.checkIfLastRow = function() {
    var last_ingredient_edit_index = $scope.recipe_edit.recipe_ingredients.length - 1;
    var last_ingredient_edit_id = "ingredient_edit" + last_ingredient_edit_index;
    if (event.currentTarget.id == last_ingredient_edit_id) {
      $scope.recipe_edit.recipe_ingredients.push(["", "", ""]);
      //console.log("last");
    }
  }

  $scope.saveRecipe = function() {
    var ingredient_filter = $scope.recipe_edit.recipe_ingredients.filter(function(item) {
      return (item[1] !== "");
    });
    console.log($scope.recipe_edit);
    console.log(ingredient_filter);

    $http.post(serverIP + "/cook/api/recipe_edit.php", {
        "member_id": user_data.member_id,
        "recipe_id": $scope.recipe_edit.recipe_id,
        "recipe_title": $scope.recipe_edit.recipe_title,
        "recipe_category": $scope.recipe_edit.recipe_category,
        "recipe_content": $scope.recipe_edit.recipe_content,
        "recipe_image": $scope.recipe_edit.recipe_image,
        "recipe_ingredients": ingredient_filter
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        var new_recipe_data = recipe_data;
        new_recipe_data[current_recipe_id] = $scope.recipe_edit;
        new_recipe_data[current_recipe_id].recipe_ingredients = ingredient_filter;
        console.log(new_recipe_data);
        $localstorage.setObject('recipe_data', new_recipe_data);
        //$state.go("app.home");
      })
  }
  ionicMaterialInk.displayEffect();
})

.controller('RecipeAddCtrl', function($scope, $state, $http, $timeout, $localstorage, $ionicPopup, $ionicLoading, $cordovaFile, ionicMaterialInk) {
  $scope.recipe_add = {};
  $scope.recipe_add.recipe_ingredients = [{
    "name": "",
    "amount": ""
  }, {
    "name": "",
    "amount": ""
  }, {
    "name": "",
    "amount": ""
  }];
  $http.get(serverIP + "/cook/api/getCategory.php")
    .success(function(data, status, headers, config) {
      $scope.category_list = data;
      console.log(data);
    })

  $scope.submitRecipe = function() {
    var ingredient_filter = $scope.recipe_add.recipe_ingredients.filter(function(item) {
      return (item.name !== "");
    });
    console.log($scope.recipe_add);

    $http.post(serverIP + "/cook/api/recipe_add.php", {
        "member_id": user_data.member_id,
        "recipe_title": $scope.recipe_add.recipe_title,
        "recipe_category": $scope.recipe_add.recipe_category,
        "recipe_content": $scope.recipe_add.recipe_content,
        "recipe_image": $scope.recipe_add.recipe_image,
        "recipe_ingredients": ingredient_filter
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        $scope.recipe_add = null;
        $state.go("app.home");
      })
  }

  $scope.checkIfLastRow = function() {
    var last_ingredient_index = $scope.recipe_add.recipe_ingredients.length - 1;
    var last_ingredient_id = "ingredient" + last_ingredient_index;
    if (event.currentTarget.id == last_ingredient_id) {
      $scope.recipe_add.recipe_ingredients.push({
        "name": "",
        "amount": ""
      });
      //console.log("last");
    }
  }

  $scope.takePic = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
      encodingType: 0 // 0=JPG 1=PNG
    }
    navigator.camera.getPicture(onSuccess, onFail, options);
  }
  var onSuccess = function(FILE_URI) {
    console.log(FILE_URI);
    $scope.picData = FILE_URI;
    $scope.$apply();
  };
  var onFail = function(e) {
    console.log("On fail " + e);
  }
  $scope.send = function() {
    var myImg = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "post";
    options.chunkedMode = false;
    var params = {};
    params.user_token = localStorage.getItem('auth_token');
    params.user_email = localStorage.getItem('email');
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
  }
})

// Photo Upload Test

/*
<div role="main" class="ui-content">
<a id="camera" class="ui-btn">拍照</a>
<a id="upload" class="ui-btn">上傳</a>
<ul id="list" data-role="listview" data-count-theme="b" data-inset="true">
  <li>目前尚未上傳數量
    <span class="ui-li-count">0</span>
  </li>
</ul>
</div>

.controller("PhotoUploadCtrl", function($scope, $cordovaFile){
  $scope.upload = function(){
    var options = {
        fileKey: "",
        fileName: "",
        chunkedMode: ,
        mimeType: ""
    };
    $cordovaFile.uploadFile("http://140.123.175.102:8080/file/upload", "/anddroid_asset/www/img/ionic.png", options).then(function(result){
      console.log("success: " + JSON.stringify(result.response));
    }, function(error){
      console.log("error: " + error);
    });
  }
})
*/
