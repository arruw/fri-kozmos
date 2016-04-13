var kozmos = angular.module('kozmos', ['ngRoute', 'kozmos.home', 'kozmos.article', 'kozmos.about']);

kozmos.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
           templateUrl: './views/home/home.html',
           controller: 'homeCtrl' 
        }).
        when('/article/:articleId', {
           templateUrl: './views/article/article.html',
           controller: 'articleCtrl' 
        }).
        when('/about', {
           templateUrl: './views/about/about.html',
           controller: 'aboutCtrl' 
        }).
        otherwise({
           redirectTo: '/' 
        });
}]);

kozmos.factory('appSettings', [function() {
    return {
        // "baseUrl": "http://localhost"  
        "baseUrl": "http://matjazmav.github.io/Kozmos"  
    };
}]);

kozmos.factory('getArticles', ['$http', 'appSettings', function($http, appSettings) {
    return function() {
        return $http({
            method: 'GET',
            url: appSettings.baseUrl + '/app_data/articles.json?' + new Date().getTime()
        });
    };
}]);

kozmos.factory('getArticle', ['$http', 'appSettings', function($http, appSettings) {
    return function(articleId) {
        return $http({
            method: 'GET',
            url: appSettings.baseUrl + '/app_data/articles/' + articleId + '/article.json?' + new Date().getTime()
        });
    };
}]);

kozmos.filter('toTrustedHtml', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

kozmos.filter('toTrustedResourceUrl', ['$sce', function($sce){
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

kozmos.filter('toYouTubeOrigin', [function(){
    return function(url) {
        if(!url) return null;
        return url.replace('watch?v=', 'v/');
    };
}]);

kozmos.filter('ellipsis', [function() {
    return function(text, length) {
        if (!text) return '';
        length = parseInt(length, 10);
        if (!length) return text;
        if (text.length <= length) return text;
        text = text.substr(0, length);
        return text + ' ...';
    };
}]);

kozmos.directive('articleTile', [function () {
    return {
        templateUrl: './directives/articleTile.html',
    }
}]);