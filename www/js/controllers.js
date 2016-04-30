angular.module('starter.controllers', [])

.controller('findController', function($scope, ItemFactory, $state) {
//navigate to item-view state with object id
  $scope.goToItemView = function(areaId, tagsId, description, name, price, dt, photo) {
    ItemFactory.getAreaName(areaId).then(function(res){
      var area = res.data[0].name;
      ItemFactory.getCategoryName(tagsId).then(function(res){
        var tags = res.data[0].name;
        $state.go('item-view', {obj:[area, tags, description, name, price, dt, photo]});
      });
    });
  };

//on page load, load areas, categories, and items data
  ItemFactory.getAreas().then(function(areaData){
    $scope.areas = areaData.data;
    ItemFactory.getCategories().then(function(categoryData){
      $scope.categories = categoryData.data;
      ItemFactory.getAllItems().then(function(itemData){
        $scope.items = itemData.data;
      });
    });
  });

  $scope.findItem = function(itemName, item){
//show loading transition 
    $scope.visible = true;
    $scope.load = true;
    $scope.items = {};
// if user does not enter a name, search by area and category only
    if(angular.equals(itemName, undefined)){
      ItemFactory.getAreaId(item.selectedArea).then(function(res){
        var areaId = res.data[0]._id;
        ItemFactory.getCategoryId(item.selectedCategory).then(function(res){
          var categoryId = res.data[0]._id;
          var query = {
            name: '',
            area: areaId,
            tags: categoryId
          };
          ItemFactory.getItemQuery(query).then(function(res){
            $scope.items = res.data;
          });
        });
      });
    }
// if user does not select an area & category, search by name only
    else if(item === undefined) {
      var query = {
          name: itemName,
          area: '',
          tags: ''
      };
      ItemFactory.getItemQuery(query).then(function(res){
        $scope.items = res.data;
      });
    }
// if user selects all 3 search options, search by name, area, and category
    else{
      ItemFactory.getAreaId(item.selectedArea).then(function(res){
        var areaId = res.data[0]._id;
        ItemFactory.getCategoryId(item.selectedCategory).then(function(res){
          var categoryId = res.data[0]._id;
          var query = {
            name: itemName,
            area: areaId,
            tags: categoryId
          };
          ItemFactory.getItemQuery(query).then(function(res){
            $scope.items = res.data;
          });
        });
      });
    }
    $scope.load = false;
  };

})

.controller('itemController', function($scope, $stateParams, ItemFactory) {
//on page load, display item data
  $scope.area = $stateParams.obj[0];
  $scope.category = $stateParams.obj[1];
  $scope.description = $stateParams.obj[2];
  $scope.name = $stateParams.obj[3];
  $scope.price = $stateParams.obj[4];
  $scope.date = $stateParams.obj[5];
  $scope.image = $stateParams.obj[6];

  $scope.openModal = function() {
    $scope.modal.show();
  };

})

.controller('publishController', function($scope, $http, ItemFactory, $timeout) {
//image preview
  $scope.thumbnail = {
    dataUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjd44G5i7XMAhWIdR4KHbM1DJkQjRwIBw&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FWhite_flag&psig=AFQjCNEul4RFSNoxp12qdewfUDcXx3CDvQ&ust=1462061974125151'
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
              console.log('item published successfully');
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
//on page load, check for user logged in and get offers for logged users
  userFactory.getUser().then(function(res){
    if(res === 'not logged in'){
      $scope.notLogged = res;
    }
    else{
      $scope.user = res;
      userFactory.getItems().then(function(res){
        $scope.items = res.data;
      });
    }    
  });
    
//navigate to login view
  $scope.goToLogin = function() {
    $state.go('tab.login', {});
  };

  $scope.delete = function(id, index){
    $scope.items.splice(index, 1);
    userFactory.deleteTask(id).then(function(){
      console.log('item deleted');
    });
  };
})

.controller('loginController', function($scope) {
  $scope.login = function(user) {
    Stamplay.User.login(user).then(function(res){
      console.log('login successful');
    });
  };
})

.controller('signupController', function($scope) {
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

  
