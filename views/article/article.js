var article = angular.module('kozmos.article', []);

home.controller('articleCtrl', ['$scope', '$routeParams', '$location', 'getArticle',
function($scope, $routeParams, $location, getArticle) {
    getArticle($routeParams.articleId).then(function(response) {
        $scope.article = response.data;

        $scope.left = "./views/article/left.png";
        $scope.right = "./views/article/right.png";


        var len = $scope.article.images.length;
        $scope.showID = 1;
        var vid = false;

        if($scope.article.video != null){
            $scope.showID = 0;
            vid = true;
        }
        
        $scope.moreThan1 = true;
        if(len == 1 || len == 0 && vid === true){
            $scope.moreThan1 = false;
        }
        

        $scope.next = function () {
            $scope.showID += 1;
            if($scope.showID > len && vid===true){
                $scope.showID = 0;
            }
            else if($scope.showID > len && vid===false){
                $scope.showID = 1;
            }
            else if($scope.showID == 0){
                $scope.showID = 1;
            }
        };

        $scope.prev = function () {
            $scope.showID -= 1;
            if($scope.showID < 0 && vid===true){
                $scope.showID = len;
            }
            else if($scope.showID < 1 && vid===false){
                $scope.showID = len;
            }
            else if($scope.showID == 0){
                $scope.showID = 1;
            }
        };

    }, function(response) {
        $location.path('/');
    });




}]);