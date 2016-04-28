angular.module('starter.controllers', [])

.controller('findController', function($scope, ItemFactory) {
//on page load, load areas and categories into dropdown
  ItemFactory.getAreas().then(function(areaData){
    $scope.areas = areaData.data;
    ItemFactory.getCategories().then(function(categoryData){
      $scope.categories = categoryData.data;
    });
  });

  $scope.findItem = function(itemName){
//if user does not enter a name, search by area and category
    if(angular.equals(itemName, undefined)){

    }
//else search item by name
    else{

    }
  };
})

.controller('publishController', function($scope, $http, ItemFactory, $timeout) {

//image preview
  $scope.thumbnail = {
    dataUrl: 'adsfas'
  };

  $scope.fileReaderSupported = window.FileReader !== null;
  $scope.photoChanged = function(files){
    if (files !== null) {
      var file = files[0];
      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function(){
              $scope.thumbnail.dataUrl = e.target.result;
            });
          };
        });
      }
    }
  };

//vars
  var areaId,
      categoryId,
      itemInfo;

//on page load, load areas and categories into dropdown
  ItemFactory.getAreas().then(function(areaData){
    $scope.areas = areaData.data;
    ItemFactory.getCategories().then(function(categoryData){
      $scope.categories = categoryData.data;
    });
  });

//publish item to sell
  $scope.publishItem = function(item) { 
    ItemFactory.getAreaId(item.area).then(function(res){
      areaId = res.data[0]._id;
      ItemFactory.getCategoryId(item.category).then(function(res){
        categoryId = res.data[0]._id;
        
        itemInfo = {
          name: item.name,
          description: item.description,
          area: areaId,
          tags: categoryId,
          price: item.price,
          email: item.email,
          telephone: item.telephone,
          address: item.address,
          publish: false
        };

        ItemFactory.createItem(itemInfo).then(function(res){
          var files = document.getElementById("files").files;
          var data = new FormData();
          data.append("photo", files[0]);
          var xhr = new XMLHttpRequest();
          xhr.open('PATCH', 'https://ionic-ebay-app.stamplayapp.com/api/cobject/v1/item/'+res._id, true);
          xhr.onload = function(e) {
            if(xhr.status >= 200 && xhr.status < 400) {
              console.log(JSON.parse(xhr.response));
            } 
            else {
              console.error(xhr.status + " (" + xhr.statusText + ")" + ": " + xhr.responseText);
            }
          };
          xhr.send(data);
        });
      });
    });
  };
})

.controller('accountController', function($scope, userFactory, $state) {
//on page load, check for user logged in
  userFactory.getUser().then(function(res){
    $scope.user = res;
  });
//navigate to login view
  $scope.goToLogin = function() {
    $state.go('tab.login', {});
  };
})

.controller('loginController', function($scope, userFactory, $state) {
})

.controller('signupController', function($scope, $state) {
  $scope.signup = function(user) {
    var userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };

    Stamplay.User.signup(userInfo).then(function(res){
      $state.go('tab.account');
    });
  };
});

  
