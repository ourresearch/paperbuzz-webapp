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



        var url = "https://api.paperbuzz.org/v0/doi/" + $routeParams.doi

        console.log("calling this url: ", url)
        $scope.apiUrl = url
        $scope.apiResp = "loading"
        $scope.p = {}


        // @todo handle timeouts, which seem unfortunately frequent
        $http.get(url).success(function(resp){
            console.log("response from api yay", resp)
            $scope.apiResp = resp

            $scope.publicationYear = resp.metadata.issued['date-parts'][0][0]

            var events = []
            resp.altmetrics.sources.forEach(function(source){
                source.events.forEach(function(event){
                    var myEvent = event
                    myEvent.source_id = source.source_id

                    var ago = moment(myEvent.occurred_at).fromNow()
                    //ago = ago.replace(" hours", "hr")
                    //ago = ago.replace(" days", "day")
                    //ago = ago.replace(" months", "mo")
                    //ago = ago.replace(" years", "yr")
                    myEvent.occurred_ago = ago


                    events.push(myEvent)



                })
            })
            $scope.events = events

        }).error(function(resp){
            console.log("bad response from api", resp)
            $scope.apiResp = "error"
        })

        $scope.getAlerts = function(){
            alert("this feature coming later...")
            return false
        }

        $scope.selectSource = function(newSource){
            if ($scope.p.selectedSource){
                $scope.p.selectedSource = null
            }
            else {
                $scope.p.selectedSource = newSource
            }
        }

        $scope.extractTwitterName = function(userUrl){
            return userUrl.replace("http://www.twitter.com/", "")
        }
        $scope.extractSubreddit = function(url){
            var regex = /reddit\.com\/r\/([^/]+)/
            var result = regex.exec(url)
            return result[1] // first submatch
        }

        $scope.extractWikiPageName = function(wikiUrl){
            // wait on this for now because not that many wiki pages
        }



    })










