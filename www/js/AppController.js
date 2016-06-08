angular.module('starter.appController', [])

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

.controller('HeaderCtrl', function($scope, $state, $ionicPopup, $ionicPopover, ionicMaterialInk) {
  $scope.$state = $state;

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

.controller('HomeCtrl', function($scope, $state, $ionicPopup, $ionicPopover, ionicMaterialInk) {
  ionicMaterialInk.displayEffect();
})

.directive('pwCheck', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      $(elem).add(firstPassword).on('keyup', function() {
        scope.$apply(function() {
          //alert(elem.val());
          var v = elem.val() === $(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  };
})

.directive('pwAccountCheck', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var Password = '#' + attrs.pwAccountCheck;
      $(elem).add(Password).on('keyup', function() {
        scope.$apply(function() {
          //alert(elem.val());
          var v = elem.val() !== $(Password).val();
          ctrl.$setValidity('pwsame', v);
        });
      });
    }
  };
})
