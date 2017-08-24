angular.module('citePage', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/details/:doi*', {
            templateUrl: "cite-page.tpl.html",
            controller: "CitePageCtrl"
        })
    })






    .controller("CitePageCtrl", function ($scope, $routeParams, $http) {



        var url = "https://doi-events.herokuapp.com/doi/" + $routeParams.doi

        console.log("calling this url: ", url)
        $scope.apiUrl = url
        $scope.apiResp = "loading"

        $http.get(url).success(function(resp){
            console.log("response from api yay", resp)
            $scope.apiResp = resp
        }).error(function(resp){
            console.log("bad response from api", resp)
            $scope.apiResp = "error"
        })

        $scope.changeStyle = function(){
            alert("this feature coming later...")
            return false
        }
        $scope.export = function(){
            alert("this feature coming later...")
            return false
        }

    })










