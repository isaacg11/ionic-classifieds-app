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
  };
}]);
