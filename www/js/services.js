angular.module('starter.services', [])

.factory('ItemFactory', ["$q", function($q) {

  return {
    getAreas: function() {
      var q = $q.defer();
      Stamplay.Object('area').get({ cobjectId : 'area'}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getCategories: function() {
      var q = $q.defer();
      Stamplay.Object('category').get({ cobjectId : 'category'}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getAllItems : function() {
      var q = $q.defer();
      Stamplay.Object('item').get({ cobjectId : 'item'}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getAreaId: function(itemArea) {
      var q = $q.defer();
      Stamplay.Object('area').get({ name : itemArea}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getCategoryId: function(itemCategory) {
      var q = $q.defer();
      Stamplay.Object('category').get({ name : itemCategory}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getItemQuery : function(query) {
      var q = $q.defer();      
      if(query.name === ''){
        Stamplay.Query("object", "item").equalTo('area',query.area).equalTo('tags', query.tags).exec().
        then(function(res) {
          q.resolve(res);
        });
      }
      else if(query.area === '' && query.tags === ''){
        Stamplay.Query("object", "item").equalTo('name', query.name).exec().
        then(function(res) {
          q.resolve(res);
        });
      }
      else{
        Stamplay.Query("object", "item").equalTo('name',query.name).equalTo('area',query.area).equalTo('tags', query.tags).exec().
        then(function(res) {
          q.resolve(res);
        });
      }
      return q.promise;
    },
    getItemInfo: function(id) {
      var q = $q.defer();
      Stamplay.Object('item').get({ _id : id}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getSellerEmail: function(id) {
      var q = $q.defer();
      Stamplay.User.get({ _id : id}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getAreaName: function(id) {
      var q = $q.defer();
      Stamplay.Object('area').get({ _id : id}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    getCategoryName: function(id) {
      var q = $q.defer();
      Stamplay.Object('category').get({ _id : id}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    createItem: function(itemInfo) {
      var q = $q.defer();
      Stamplay.Object('item').save(itemInfo).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    publishItem: function(id) {
      var q = $q.defer();
      Stamplay.Object('item').patch(id, {publish: true}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
  };
}])

.factory('IonicComponent',function($ionicModal, $ionicScrollDelegate, $ionicLoading, $ionicPopup){
  return {
    Modal: $ionicModal,
    ScrollDelegate: $ionicScrollDelegate,
    Loading: $ionicLoading,
    Popup: $ionicPopup
  };
})

.factory('userFactory', ["$q", function($q) {

  return {
    getUser: function() {
      var data;
      var q = $q.defer();
      Stamplay.User.currentUser().then(function(res){
        if(res.user.__v === 0){
          data = res;
        }
        else{
          data = "not logged in";
        }
        q.resolve(data);
      });
      return q.promise;
    },
    getItems: function() {
      var q = $q.defer();
      Stamplay.Object("item").findByCurrentUser(["owner"]).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    deleteTask : function(id) {
      var q = $q.defer();
      var objectID = id;
      Stamplay.Object('item').remove(objectID, function(res){
          q.resolve(res);
      });
      return q.promise;
    }
  };
}])

.factory('PopupTemplate', function(){
  return {
    popupEmailPublish : function(){
      return data = {
        title: 'Confirm Publish',
        template: 'Check your email inbox for a confirmation code to complete the publish',
        buttons: [{text: '<b>Ok</b>', type: 'button-energized'}]
      };
    },
    confirmItem : function($scope){
      return data = {
        template: '<input type="text" id="itemId" ng-model="modal.itemId">',
        title: 'Enter code',
        subTitle: 'Enter the code we sent you via email',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-energized',
            onTap: function(e) {
              var id = document.getElementById('itemId').value;
              return id;
            }
          }
        ]  
      };
    }};
});  
