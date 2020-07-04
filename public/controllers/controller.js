var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/Movieslist').success(function(response) {
    console.log("I got the data I requested");
    $scope.Movieslist = response;
    console.log(response)
    $scope.movie =null;
  });
};

refresh();

$scope.addMovie = function() {
  console.log($scope.movie);
  $http.post('/Movieslist', $scope.movie).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/Movieslist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/Movieslist/' + id).success(function(response) {
    $scope.movie = response;
  });
};

$scope.update = function() {
  console.log($scope.movie._id);
  $http.put('/Movieslist/' + $scope.movie._id, $scope.movie).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.movie = "";
}

$scope.rating = 0;
$scope.ratings = [{
    current: 5,
    max: 10
}, {
    current: 3,
    max: 5
}];

$scope.getSelectedRating = function (rating) {
    console.log(rating);
}

$scope.setMinrate= function(){
   $scope.ratings = [{
    current: 1,
    max: 10
}, {
    current: 1,
    max: 5
}];
}

$scope.setMaxrate= function(){
   $scope.ratings = [{
    current: 10,
    max: 10
}, {
    current: 5,
    max: 5
}];
}

}]);﻿
myApp.directive('starRating', function () {
  return {
      restrict: 'A',
      template: '<ul class="rating">' +
          '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
          '\u2605' +
          '</li>' +
          '</ul>',
      scope: {
          ratingValue: '=',
          max: '=',
          onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

          var updateStars = function () {
              scope.stars = [];
              for (var i = 0; i < scope.max; i++) {
                  scope.stars.push({
                      filled: i < scope.ratingValue
                  });
              }
          };

          scope.toggle = function (index) {
              scope.ratingValue = index + 1;
              scope.onRatingSelected({
                  rating: index + 1
              });
          };

          scope.$watch('ratingValue', function (oldVal, newVal) {
              if (newVal) {
                  updateStars();
              }
          });
      }
  }
});