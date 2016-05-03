var article = angular.module('kozmos.article', []);

home.controller('articleCtrl', ['$scope', '$routeParams', '$location', 'getArticle',
function($scope, $routeParams, $location, getArticle) {
    getArticle($routeParams.articleId).then(function(response) {
        $scope.article = response.data;

        var len = $scope.article.images.length;
        $scope.showID = 1;
        var vid = false;

        if($scope.article.video != null){
            $scope.showID = 0;
            vid = true;
        }

        $scope.next = function () {
            console.log("next");
            $scope.showID += 1;
            if($scope.showID > len && vid===true){
                console.log("tuki");
                $scope.showID = 0;
            }
            else if($scope.showID > len && vid===false){
                $scope.showID = 1;
            }
            else if($scope.showID == 0){
                $scope.showID = 1;
            }
            console.log($scope.showID);
        };

    }, function(response) {
        $location.path('/');
    });




}]);