angular.module('TwitterClient', ['ngSanitize', 'TwitterFilters','TweetService']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/tweets', { templateUrl: 'partials/index.html', controller: TweetCtrl }).
            when('/saved', { templateUrl: 'partials/savedTweets.html', controller: SavedTweetCtrl }).
            otherwise({ redirectTo: '/tweets' });
    }]);;