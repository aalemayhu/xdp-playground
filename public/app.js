let Challenges = [0, "contribute", "references"]; // Please don't move this line.

let app = angular.module('xdp-playground', []);

var SetTaskNumber = function(t) {
  localStorage.setItem("task_number", t);
}

var GetTaskNumber = function(t) {
  var number = localStorage.getItem("task_number");
  // If the user is here for the "first" time show them the intro.
  if (!number) {
    return 'intro';
  }
  return number;
}

let controller = app.controller('MainController', ['$scope', '$http', '$sce',
  function ($scope, $http, $sce) {

  $scope.title = "XDP Playground";

  $scope.Challenges = Challenges;

  $scope.isNumber = angular.isNumber;

$scope.LoadChallenge = function(task) {
  SetTaskNumber(task);
  $scope.task_number = task;
  $http({
    method: 'GET',
    url: "tasks/"+$scope.task_number+".html"
  }).then(function successCallback(response) {
    $scope.task_description = $sce.trustAsHtml(response.data);
  }, function errorCallback(response) {
    // TODO: handle this.
  });
};

$scope.LoadChallenge(GetTaskNumber());

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
    }
    $http(req).then(function(res){
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
}]);
