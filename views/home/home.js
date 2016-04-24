var home = angular.module('kozmos.home', []);

home.controller('homeCtrl', ['$scope', 'getArticles', 'getArticle', '$sce', function($scope, getArticles, getArticle, $sce) {
    getArticles().success(function(articles) {
        $scope.tu0 = [];
        $scope.tu1 = [];
        for (var key in articles.tu0) {
            getArticle(articles.tu0[key]).success(function(data) {
                $scope.tu0.push(data);
            });
                    }
        for (var key in articles.tu1) {
            getArticle(articles.tu1[key]).success(function(data) {
                $scope.tu1.push(data);
            });
        }
    });
}]);