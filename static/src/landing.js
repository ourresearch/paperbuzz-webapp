angular.module('landing', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/landing/:landingPageName', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: "about.tpl.html"
        })
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: "search.tpl.html",
            controller: "SearchPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/api', {
            templateUrl: "api.tpl.html",
            controller: "StaticPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/hot/:topic?', {
            templateUrl: "hot.tpl.html",
            controller: "HotPageCtrl"
        })
    })






    .controller("HotPageCtrl", function ($scope,
                                         $routeParams,
                                         $mdDialog,
                                         $http,
                                             $location,
                                             $timeout) {


        loadHotPapers()
        var userFilters = getUserFilters()
        $scope.paperFilter = paperFilter
        $scope.userFilters = userFilters
        $scope.makeUrlSafe = makeUrlSafe
        $scope.setFilter = setFilter


        $scope.issue = {
            year: 2017,
            week: 38
        }

        $scope.subscribe = function(){
            alert("This feature coming soon. You'll get emails on new papers that fit your selected set of filters.")
        }




        function setFilter(newFilterName, newFilterVal){
            var currentFilters = getUserFilters()
            var myNewFilter = {}
            myNewFilter[newFilterName] = newFilterVal

            // make the new set of filters by overwriting
            var newFilters = Object.assign({}, currentFilters, myNewFilter)

            // make into strings like "topic=health"
            // do not write a param string if the value is null, like "topic=null"
            var paramStrings = objToPairs(newFilters).map(function(kv){
                if (kv[1]){
                    return kv[0] + "=" + makeUrlSafe(kv[1])
                }
            })

            // remove nulls from the array
            paramStrings = paramStrings.filter(Boolean)

            // finish making the array into a URL param string
            var allParams = paramStrings.join("&")
            if (allParams){
                allParams = "?" + allParams
            }

            console.log("all params", allParams)
            $location.url("hot" + allParams)

        }

        // return object as key-value pairs
        function objToPairs(obj){
            return Object.keys(obj).map(function(k){
                return [k, obj[k]]
            })
        }











        function getFromUrl(paramName){
            var ret = $routeParams[paramName]
            if (ret) {
                ret = cleanUrlParams(ret)
            }
            return ret
        }

        function getUserFilters(){
            var possibleFilters = ["audience", "open", "topic"]
            var ret = {}
            possibleFilters.forEach(function(filterName){
                var userVal = getFromUrl(filterName)
                if (userVal){
                    ret[filterName] = userVal
                }
            })
            console.log("got user filters:", ret)
            return ret
        }




        function paperFilter(paper){
            var userFilterNames = Object.keys(userFilters)

            // test each of the possible user filters
            // this will give us an array of all the passes/fails
            // of each filter the user has set.
            var filterMatches = userFilterNames.map(function(userFilterName){
                var userVal = userFilters[userFilterName]
                var paperVal = paper.filters[userFilterName]

                if (userVal == paperVal) {
                    return true
                }

                else {
                    return false
                }
            })



            // succeed if there are no False results
            return filterMatches.indexOf(false) == -1
        }




        function cleanUrlParams(s){
            var ret

            if (s){
                ret = s.replace(/-/g, " ")
                if (ret === "true") {
                    ret = true
                }
            }
            return ret
        }

        function makeUrlSafe(s){
            if (!s){
                return ""
            }

            if (s === true){
                return "true"
            }
            if (s){
                return s.replace(/\s/g, "-")
            }
        }


        function getTopics(){
            var ret = {}
            global.hotPapers.forEach(function(paper){
                ret[paper.filters.topic] = true
            })
            return Object.keys(ret)
        }




        // loads from cache if possible. if cache empty, loads
        // from server and fills cache.
        function loadHotPapers(){
            if (global.hotPapers){
                $scope.papers = global.hotPapers
                $scope.topics = getTopics()

            }
            else {
                $http.get("https://api.paperbuzz.org/v0/hot/2017/week-37")
                    .success(function(resp){
                        console.log("got response back from server", resp)
                        global.hotPapers = resp.list

                        // this time it will get the data from the cache.
                        loadHotPapers()
                    })

            }
        }



        var originatorEv;
        $scope.openMenu = function($mdOpenMenu, ev){
            originatorEv = ev;
            $mdOpenMenu(ev);
        }




    })


    .controller("LandingPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}
        $scope.global.pageName = "landing"

        console.log("i am the landing page ctrl")
        $scope.submit = function(){
            console.log("submit!", $scope.main.id)
            $location.path("/details/" + $scope.main.id)
        }

    })


    .controller("SearchPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}

        console.log("Search Page page ctrl")
        $scope.submit = function(){
            console.log("submit!", $scope.main.id)
            $location.path("/details/" + $scope.main.id)
        }

    })


    .controller("StaticPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}
        console.log("Static Page ctrl")

    })



    .config(function ($routeProvider) {
        $routeProvider.when('/page-not-found', {
            templateUrl: "page-not-found.tpl.html",
            controller: "PageNotFoundCtrl"
        })
    })

    .controller("PageNotFoundCtrl", function($scope){
        console.log("PageNotFound controller is running!")

    })









