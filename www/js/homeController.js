angular.module('starter.homeController', [])

.controller('HeaderCtrl', function($scope, $state, $localstorage, $ionicPopup, $ionicPopover, ionicMaterialInk, API) {
  $scope.$state = $state;
  user_data = $localstorage.getObject('user_data');
  recipe_data = $localstorage.getObject('recipe_data');
  current_recipe_id = 0;

  if(user_data.member_id == null)
    $state.go("login");

  //api server ip
  if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
    serverIP = API.client;
  } else {
    serverIP = API.local;
  }

  $scope.myGoBack = function() {
    if ($state.includes('app.recipe')) {
      $state.go('app.home')
    } else {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Exit',
        template: "Are you sure you want to exit?<br/>Don't forget to save before exit!",
        cancelText: 'no',
        okText: 'yes'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $state.go('app.recipe');
          console.log('You are sure');
        } else
          console.log('You are not sure');
      });
    };
  }

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

  ionicMaterialInk.displayEffect();
})

.controller('HomeCtrl', function($scope, $state, $http, $localstorage, $ionicPopup, $ionicPopover, ionicMaterialInk) {
  $http.post(serverIP + "/cook/api/getRecipe.php", {
    'member_id': user_data.member_id
  })
    .success(function(data, status, headers, config) {
      $scope.recipe_list = data;
      recipe_data = data;
      $localstorage.setObject('recipe_data', data);
      //console.log(data);
    })

  $scope.getRecipeId = function(){
    current_recipe_id = $("#" + event.currentTarget.id + " span").text();
  }
  ionicMaterialInk.displayEffect();
})
