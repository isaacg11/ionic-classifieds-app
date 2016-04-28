angular.module('starter.services', [])

.factory('ItemFactory', ["$q", function($q) {

  var areas;

  return {
    getAreas: function() {
      var q = $q.defer();
      Stamplay.Object('area').get({ cobjectId : 'area'}).then(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
  };
}]);
