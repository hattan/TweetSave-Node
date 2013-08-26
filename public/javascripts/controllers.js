function TweetCtrl($scope,$http,Tweet){
    $scope.saveTweet = function (tweet) {
        var savedTweet = new Tweet();
        savedTweet.from_user_name = tweet.user.screen_name;
        savedTweet.text = tweet.text;
        savedTweet.from_user = tweet.user.name;
        savedTweet.profile_image_url = tweet.user.profile_image_url;
        savedTweet.$save(function () {
            $scope.message = "Tweet Saved!";
        });
    };
}

function SavedTweetCtrl($scope, Tweet) {
    $scope.savedTweets = Tweet.query();

    $scope.deleteTweet = function (tweet) {
        tweet.$delete(function () {
            $scope.message = "Tweet Deleted!";
            $scope.savedTweets = Tweet.query();
        });
    };
}