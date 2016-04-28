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

.controller('publishController', function($scope, $http, ItemFactory) {

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
          console.log(data);
          var xhr = new XMLHttpRequest();
          xhr.open('PATCH', 'https://ionic-ebay-app.stamplayapp.com/api/cobject/v1/item/'+res._id, true);
          xhr.onload = function(e) {
            if(xhr.status >= 200 && xhr.status < 400) {
            console.log(JSON.parse(xhr.response));
            } else {
            console.error(xhr.status + " (" + xhr.statusText + ")" + ": " + xhr.responseText);
            }
          };
          xhr.send(data);
        });
      });
    });
    

    
  };

});

  
