let app = angular.module('xdp-playground', []);

let controller = app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
  $scope.input_code_changed = function(obj, $event) {
    let input_code = obj.input_code;

    var req = {
      method: 'POST',
      url: '/compile',
      headers: {
	'Content-Type': 'application/json'
      },
      data: {
        input_code: input_code,
        is_debug: false
      }
    }
    $http(req).then(function(res){
      console.log(res);
      $scope.compilation_results = res.data.results;
      $scope.rule_id = res.data.id;
    }, function(){
    });
  };

  $scope.versions = "xyz";
  $http({
    method: 'GET',
    url: '/version'
  }).then(function successCallback(response) {
    $scope.versions = response.data;
  }, function errorCallback(response) {
  });

  $scope.app_version = "xyz";
  $http({
    method: 'GET',
    url: '/app_version'
  }).then(function successCallback(response) {
    $scope.app_version = response.data;
  }, function errorCallback(response) {
  });

  $scope.number_of_rows = function(lines) {
    var min = 10;

    if (!lines) {
      return min;
    }
    var count = lines.split("\n").length;

    if (count < min)
      count = min;

    return Math.min(count, 35);
  };
}]);
