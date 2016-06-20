angular.module('starter.loginController', [])

.controller('LoginCtrl',function($scope, $state, $http, $localstorage, $ionicPopup, $ionicModal, ionicMaterialInk, API){
  //api server ip
  if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
    serverIP = API.client;
  } else {
    serverIP = API.local;
  }

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/forgetPassword.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  $scope.closeRegister = function() {
    $scope.modal1.hide();
  };
  $scope.closeForgetPassword = function() {
    $scope.modal2.hide();
  };
  $scope.register = function() {
    $scope.modal1.show();
  };
  $scope.forgetPassword = function() {
    $scope.modal2.show();
  };

  $scope.loginData = {};

  $scope.doLogin = function(login_form) {
      // 通過驗證
      console.log(serverIP);
      if (login_form.$valid) {
        $http.post(serverIP + "/cook/api/login.php", {
            'email': $scope.loginData.username,
            'password': $scope.loginData.password
          })
          .success(function(data, status, headers, config) {
            console.log(data);
            $scope.user_data = data;

            if (data == "error") {
              $ionicPopup.alert({
                title: "無法登入",
                template: "帳號或密碼錯誤！"
              });
            } else {
              $localstorage.setObject('user_data', {
                member_id: $scope.user_data.member_id,
                email: $scope.user_data.email
              });

              $state.go("app.home");
            }
          });
      } else {
        // 未通過驗證
        $ionicPopup.alert({
          title: "請輸入帳號及密碼！"
        });
      }
    }


})

.controller('RegisterCtrl', function($scope, $ionicPopup, $http, ionicMaterialInk) {
  $scope.register_data = {};

  $scope.insertdata = function() {
    if ($scope.register_form.$valid) {
      // 通過驗證
      $http.post(serverIP + "/cook/api/register.php", {
          'email': $scope.register_data.email,
          'password': $scope.register_data.password
        })
        .success(function(data, status, headers, config) {
          //console.log(data);
          if (data == "email_exist") {
            $ionicPopup.alert({
              title: "註冊失敗",
              template: "此Email已註冊過！"
            });
          } else if (data == "register_successfully") {
            $scope.register_data = null;
            $scope.register_form.$setPristine();
            $ionicPopup.alert({
              title: "註冊成功！"
            });
            $scope.closeRegister();
          } else {
            $ionicPopup.alert({
              title: "發生錯誤！"
            });
          }
        });
    } else {
      // 未通過驗證
      $ionicPopup.alert({
        title: "請輸入完整資料！"
      });
    }
  }
  ionicMaterialInk.displayEffect();
})

.controller('ForgetPasswordCtrl', function($scope, $http, $ionicPopup, $ionicLoading, ionicMaterialInk) {
  $scope.forgetSubmit = function() {
    if ($scope.forget_form.$valid) {
      // Setup the loader
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      $http.post(serverIP + "/cook/api/forgetPassword.php", {
          'email': $scope.email
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          if (data == "none") {
            $ionicPopup.alert({
              title: "無此Email註冊之帳號"
            });
          } else if (data == "done") {
            $scope.email = null;
            $scope.addincident_form.$setPristine();
            $ionicPopup.alert({
              title: "成功",
              template: "已發送至您的信箱，請前往確認！"
            });
          } else {
            $ionicPopup.alert({
              title: "發生錯誤"
            });
          }
        });
    } else {
      $ionicPopup.alert({
        title: "請輸入Email！"
      });
    }
  }
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
