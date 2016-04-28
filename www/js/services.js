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
    createItem: function(itemInfo) {
      var q = $q.defer();
      Stamplay.Object('item').save(itemInfo).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
  };
}]);
