let app = angular.module('xdp-playground', []);

let controller = app.controller('MainController', ['$scope', '$http', '$sce',
  function ($scope, $http, $sce) {

  $scope.title = "XDP Playground";

  $http({
    method: 'GET',
    url: '/pages'
  }).then(function successCallback(response) {
    $scope.Challenges = response.data;
    $scope.LoadChallenge(Page.Current());
  }, function errorCallback(response) {
  });

  $scope.isNumber = function(n) {
    return !isNaN(n)
  };

$scope.LoadChallenge = function(task) {
  $scope.verdict = ""; // clear state.
  Page.Set(task);

  $scope.task_number = task;
  $http({
    method: 'GET',
    url: "pages/"+$scope.task_number+".html"
  }).then(function successCallback(response) {
    $scope.task_description = $sce.trustAsHtml(response.data);
  }, function errorCallback(response) {
    // TODO: handle this.
  });
};

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
        is_debug: false,
        task_number: $scope.task_number
      }
    };
    $http(req).then(function(res){
      // console.log(res.data);
      $scope.compilation_results = res.data.results;
      $scope.rule_id = res.data.id;

      if ($scope.compilation_results.indexOf("verdict=fail;") !== -1) {
          $scope.verdict = "fail";
          $scope.verdict_desc = $scope.compilation_results;
      } else if ($scope.compilation_results.indexOf("verdict=pass;") !== -1) {
          $scope.verdict = "pass";
          $scope.verdict_desc = "Congratulations on passing this challenge!";
      } else {
        $scope.verdict = "";
      }

    }, function(){
      // TODO: handle this properly
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
      // TODO: handle this properly
  });
}]);
