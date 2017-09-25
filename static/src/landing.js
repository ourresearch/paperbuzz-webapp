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
        $scope.issue = {
            year: 2017,
            week: 38
        }

        $scope.u = {
            //topic: "sword"
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
            var ret = []
            possibleFilters.forEach(function(filterName){
                var urlVal = getFromUrl(filterName)
                if (urlVal && urlVal != "all"){
                    ret.push({
                        name: filterName,
                        value: urlVal
                    })
                }
            })
            console.log("got user filters:", ret)
            return ret
        }




        function paperFilter(paper){

            // test each of the possible user filters
            // this will give us an array of all the passes/fails
            // of each filter the user has set.
            var matches = userFilters.map(function(userFilter){
                if (paper.filters[userFilter.name] == userFilter.value) {
                    return true
                }
                return false
            })

            // succeed if there are no False results
            return matches.indexOf(false) == -1
        }




        function selectPapers(topic, audience, is_oa){

            // find the first papers facet that matches
            // all the supplied filters.

            console.log("selecting papers", topic)

            // uses the global hotnessData variable initialized in app.js,
            // and filled from an API call upon app boot.
            var selectedGroup = global.hotPapers.list.find(function(group){


                // test to see if this group is a match for the
                // set of filters we've been given.
                var matches = [
                    group.filter_discipline == topic,
                    group.filter_audience == audience,
                    group.filter_open == is_oa
                ]

                // all of the filter conditions matched.
                // returning true means that we'll end up using the
                // papers in this group.
                return matches.indexOf(false) < 0; // no false, all true.

            })
            if (!selectedGroup){
                return null
            }
            else {
                return selectedGroup.results
            }
        }


        function cleanUrlParams(s){
            if (s){
                return s.replace(/-/g, " ")
            }
        }

        function makeUrlSafe(s){
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
            console.log("open menu")
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









