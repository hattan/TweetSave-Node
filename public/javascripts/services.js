angular.module("TweetService", ["ngResource"]).factory("Tweet", function ($resource) {
    return $resource(
        "/tweet/:Id",
        { Id: "@_id" },
        { "update": { method: "PUT" } }
    );
});
