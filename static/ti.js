var global  = {}


angular.module('app', [

    // external libs
    'ngRoute',
    'ngMessages',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ngProgress',

    // this is how it accesses the cached templates in ti.js
    'templates.app',

    // services
    'numFormat',

    // pages
    "landing",
    "citePage"

]);




angular.module('app').config(function ($routeProvider,
                                       $mdThemingProvider,
                                       $locationProvider) {
    $locationProvider.html5Mode(true);
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette("blue")



});


angular.module('app').run(function($route,
                                   $rootScope,
                                   $q,
                                   $timeout,
                                   $cookies,

                                   $http,
                                   $location) {


    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-23384030-7', 'auto');





    $rootScope.$on('$routeChangeStart', function(next, current){
    })
    $rootScope.$on('$routeChangeSuccess', function(next, current){
        window.scrollTo(0, 0)
        ga('send', 'pageview', { page: $location.url() });

    })



    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        console.log("$routeChangeError! here's some things to look at: ", event, current, previous, rejection)

        $location.url("page-not-found")
        window.scrollTo(0, 0)
    });
});



angular.module('app').controller('AppCtrl', function(
    ngProgressFactory,
    $rootScope,
    $scope,
    $route,
    $location,
    NumFormat,
    $http,
    $mdDialog,
    $sce){

    var progressBarInstance = ngProgressFactory.createInstance();

    $rootScope.progressbar = progressBarInstance
    $scope.progressbar = progressBarInstance
    $scope.numFormat = NumFormat
    $scope.moment = moment // this will break unless moment.js loads over network...

    $scope.global = {}

    $scope.pageTitle = function(){
        if (!$scope.global.title){
            $scope.global.title = "The most buzzworthy research"
        }
        return "Paperbuzz: " + $scope.global.title
    }



    $scope.$on('$mdMenuClose', function(ev, element) {
        $scope.global.menuOpen = false
    });

    $scope.$on('$mdMenuOpen', function(ev, element) {
        $scope.global.menuOpen = true
    });




    // looks like this is using outdated API
    //$rootScope.$on('$routeChangeSuccess', function(next, current){
    //    $scope.global.template = current.loadedTemplateUrl
    //        .replace("/", "-")
    //        .replace(".tpl.html", "")
    //    $scope.global.title = null
    //})

    $scope.trustHtml = function(str){
        return $sce.trustAsHtml(str)
    }

    var showAlert = function(msgText, titleText, okText){
        if (!okText){
            okText = "ok"
        }
          $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(titleText)
                    .textContent(msgText)
                    .ok(okText)
            );
    }
    $rootScope.showAlert = showAlert
})
















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










angular.module("numFormat", [])

    .factory("NumFormat", function($location){

        var commas = function(x) { // from stackoverflow
            if (!x) {
                return x
            }
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }


        var short = function(num, fixedAt){
            if (typeof num === "string"){
                return num  // not really a number
            }

            // from http://stackoverflow.com/a/14994860/226013
            if (num === null){
                return 0
            }
            if (num === 0){
                return 0
            }

            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            if (num >= 100000) { // no decimal if greater than 100thou
                return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'k';
            }

            if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
            }


            if (num < 1) {
                return Math.round(num * 100) / 100;  // to two decimals
            }

            return Math.ceil(num);
        }

        var round = function(num){
            return Math.round(num)
        }

        var doubleUrlEncode = function(str){
            return encodeURIComponent( encodeURIComponent(str) )
        }

        // from http://cwestblog.com/2012/09/28/javascript-number-getordinalfor/
        var ordinal = function(n) {
            n = Math.round(n)
            var s=["th","st","nd","rd"],
                v=n%100;
            return n+(s[(v-20)%10]||s[v]||s[0]);
        }

        var decimalToPerc = function(decimal, asOrdinal){
            var ret = Math.round(decimal * 100)
            if (asOrdinal){
                ret = ordinal(ret)
            }
            return ret
        }
        return {
            short: short,
            commas: commas,
            round: round,
            ordinal: ordinal,
            doubleUrlEncode: doubleUrlEncode,
            decimalToPerc: decimalToPerc

        }
    });
angular.module('templates.app', ['about.tpl.html', 'api.tpl.html', 'cite-page.tpl.html', 'footer.tpl.html', 'hot.tpl.html', 'landing.tpl.html', 'page-not-found.tpl.html', 'search.tpl.html']);

angular.module("about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about.tpl.html",
    "<div class=\"page about\" layout=\"row\" layout-align=\"center center\">\n" +
    "    <div class=\"content\">\n" +
    "        <h2>About</h2>\n" +
    "        <div class=\"text\">\n" +
    "            <p>\n" +
    "                CiteAs is a way to\n" +
    "                help get the correct citation for diverse research products,\n" +
    "                from software and datasets to preprints and articles.\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                It's part of a larger grant, funded by the Alfred P. Sloan Foundation,\n" +
    "                to help scholars who share reusable\n" +
    "                research software get credit for their work.\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                CiteAs is a collaboration between\n" +
    "                <a href=\"http://james.howison.name/\">James Howison</a> at the\n" +
    "                University of Texas-Austin, and\n" +
    "                <a href=\"http://impactstory.org/about\">Impactstory.</a>\n" +
    "            </p>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("api.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("api.tpl.html",
    "<div class=\"page api\">\n" +
    "    <h1>API Version 0</h1>\n" +
    "    <div class=\"version-good\">\n" +
    "        <i class=\"fa fa-flask\"></i>\n" +
    "        <strong>Early version:</strong> Be prepared for breaking changes when\n" +
    "        we officially launch in 2017.\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"toc\">\n" +
    "        <li><a href=\"#limits\">Limits and authentication</a></li>\n" +
    "        <li>\n" +
    "            <a href=\"#endpoints\">Endpoints</a>\n" +
    "            <ul>\n" +
    "                <li><a href=\"#get-base\">GET /v0</a></li>\n" +
    "                <li><a href=\"#get-doi\">GET /v0/:doi</a></li>\n" +
    "                <li><a href=\"#get-hotpapers\">GET /v0/hot/:year/:week</a></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <a href=\"#response-objects\">Response objects</a>\n" +
    "            <ul>\n" +
    "                <li><a href=\"#api-status-object\">ApiStatus object</a></li>\n" +
    "                <li><a href=\"#doi-object\">DOI object</a></li>\n" +
    "                <li><a href=\"#altmetricssource-object\">AltmetricsSource object</a></li>\n" +
    "                <li><a href=\"#event-object\">Event object</a></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"limits\">Limits and authentication</h2>\n" +
    "    <p>\n" +
    "        The REST API gives anyone free, programmatic access to all of our data.\n" +
    "        There's no rate limit, but if you need more than 100k calls/day you\n" +
    "        may want to download the datasets instead.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Requests must include your email, so that we can\n" +
    "        get in touch if something breaks, and so we can report usage to our funders.\n" +
    "        Add the email as a parameter at the end of the URL, like this:\n" +
    "        <code>?email=YOUR_EMAIL</code>.\n" +
    "    </p>\n" +
    "\n" +
    "    <p>\n" +
    "        If you're using the API, we recommend you subscribe to the\n" +
    "        <a href=\"https://groups.google.com/forum/#!forum/paperbuzz-users\">mailing list</a> in order\n" +
    "        to stay up-to-date when there are changes or new features.\n" +
    "    </p>\n" +
    "\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"endpoints\">Endpoints</h2>\n" +
    "\n" +
    "\n" +
    "    <div class=\"endpoint\" id=\"get-base\">\n" +
    "        <code class=\"endpoint\">GET /</code>\n" +
    "\n" +
    "        <table class=\"endpoint\">\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Description\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    Gets an API status object that describes this API.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Returns\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"#api-status-object\">API Status object</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Example\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"https://api.paperbuzz.org/v0/?email=test@example.com\">https://api.paperbuzz.org/v0/?email=test@example.com</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"endpoint\" id=\"get-doi\">\n" +
    "        <code class=\"endpoint\">GET /:doi</code>\n" +
    "        <table class=\"endpoint\">\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Description\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    Gets attention metrics, metadata, and open access status for a given DOI.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Accepts\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    A valid DOI.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Returns\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"#doi-object\">DOI object</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Example\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"https://api.paperbuzz.org/v0/doi/10.1038/nature12373?email=test@example.com\">https://api.paperbuzz.org/v0/doi/10.1038/nature12373?email=test@example.com</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!--\n" +
    "    <div class=\"endpoint\" id=\"get-hotpapers\">\n" +
    "        <code class=\"endpoint\">GET /v0/hot/:year/:week</code>\n" +
    "        <table class=\"endpoint\">\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Description\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    Gets a list of the papers with the most online attention in a given week.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Accepts\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    A valid DOI.\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Returns\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"#hotpaper-object\">HotPaper object</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"k\">\n" +
    "                    Example\n" +
    "                </td>\n" +
    "                <td class=\"v\">\n" +
    "                    <a href=\"http://api.paperbuzz.org/v0/hot/2017/week-37\">http://api.paperbuzz.org/v0/hot/2017/week-37</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "    -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!-------------------------------------------------------------------------\n" +
    "\n" +
    "    RESPONSE OBJECTS\n" +
    "\n" +
    "    --------------------------------------------------------------------------->\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"response-objects\">2. Response objects</h2>\n" +
    "\n" +
    "    <p>We're currently writing documentation for these objects.</p>\n" +
    "    <!--\n" +
    "    <p>The API returns three different types of response objects. Really two, since more users won't ever need the API Status object, which just defines the root of the API. The OA Location object describes a place we found an OA copy of an article. There are one or more of these associated with DOI object, which describes a given DOI-assigned resource.</p>\n" +
    "    -->\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"api-status-object\">2.1 API Status object</h3>\n" +
    "    <table class=\"api-responses\">\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">documentation_url</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Where you can find documentation for this version.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">msg</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Relevant messages.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">version</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Version string.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Example: <code>0.0.1</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"doi-object\">2.2 DOI object</h3>\n" +
    "    <p>This is the main response object for the API, used for reporting the altmetrics\n" +
    "        and other information about a given DOI.\n" +
    "    </p>\n" +
    "<table class=\"api-responses\">\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">altmetrics_sources</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of AltmetricsSource objects.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Empty list if there are no online impact events for this article.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">crossref_event_data_url</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                URL you can use to query the Crossref Event Data API for this article.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>This is the query we used to obtain all the altmetrics data in a given\n" +
    "                    response. So this URL  can be used as part of a provenance chain for the data.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">doi</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The DOI of this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                This is always lowercase.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">metadata</span>\n" +
    "                <span class=\"type\">Object</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                DOI metadata as reported by the Crossref  API.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Includes title, authors, and so on. The response format is the same as\n" +
    "                what the Crossref API returns, so see the\n" +
    "                <a href=\"https://github.com/CrossRef/rest-api-doc\">Crossref API docs</a>\n" +
    "                for details.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">open_access</span>\n" +
    "                <span class=\"type\">Object</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Open Access information as reported by the\n" +
    "                <a href=\"https://oadoi.org\">oaDOI</a>\n" +
    "                API.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Reports any locations where the article can legally be read\n" +
    "                free of charge. The response format is the same what the oaDOI API\n" +
    "                returns, so see the\n" +
    "                <a href=\"https://oadoi.org/api/v2\">oaDOI API docs</a>\n" +
    "                for more details.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"altmetricssource-object\">2.3 AltmetricsSource object</h3>\n" +
    "    <p>\n" +
    "        Reports information about events on a DOI from a certain altmetrics\n" +
    "        <em>source,</em> like Twitter or Reddit.\n" +
    "    </p>\n" +
    "<table class=\"api-responses\">\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">events</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of Event objects.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">events_count</span>\n" +
    "                <span class=\"type\">Integer</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The number of Event objects.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Convenience property, same as <code>events.length</code>\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">events_count_by_day</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of objects describing event counts binned by day.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Each day is represented by its own object, which has two properties:\n" +
    "                <code>count</code> and <code>date</code> (represented as an\n" +
    "                <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO8601 timestamp)</a>.\n" +
    "                Days with zero events are not included.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">source_id</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Name of this source.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                We use the  names defined by the\n" +
    "                <a href=\"https://www.eventdata.crossref.org/guide/sources/how-agents-work/\">\n" +
    "                    Crossref Event Data schema.\n" +
    "                </a>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("cite-page.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cite-page.tpl.html",
    "<div class=\"page cite-page\">\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"loading\"\n" +
    "             ng-show=\"apiResp=='loading'\">\n" +
    "            <span class=\"label\">Finding metrics &hellip;</span>\n" +
    "            <md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"citation animated fadeIn\" ng-show=\"apiResp.doi\">\n" +
    "            <h1>{{ apiResp.metadata.title }}</h1>\n" +
    "            <div class=\"metadata\">\n" +
    "                <div class=\"first-row\">\n" +
    "                    <span class=\"year\">{{ publicationYear }}</span>\n" +
    "                    <span class=\"author\" ng-repeat=\"author in apiResp.metadata.author\">\n" +
    "                        {{ author.family }}</span>.\n" +
    "                    <span class=\"journal\">{{ apiResp.metadata[\"container-title\"] }}</span>\n" +
    "                    <a href=\"https://doi.org/{{ apiResp.doi }}\" class=\"linkout\">(view)</a>\n" +
    "                </div>\n" +
    "                <div class=\"second-row\">\n" +
    "                    <md-button class=\"md-raised\"\n" +
    "                               href=\"{{ apiResp.open_access.best_oa_location.url }}\"\n" +
    "                               ng-show=\"apiResp.open_access.is_oa\"\n" +
    "                               target=\"_blank\">\n" +
    "                        <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                        Read paper\n" +
    "                    </md-button>\n" +
    "                    <md-button class=\"md-raised\" href=\"\" ng-click=\"getAlerts()\">\n" +
    "                        <i class=\"fa fa-envelope-o\"></i>\n" +
    "                        Get alerts\n" +
    "                    </md-button>\n" +
    "                    <md-button class=\"md-raised\" href=\"{{ apiUrl }}\" target=\"_blank\">\n" +
    "                        <i class=\"fa fa-cogs\"></i>\n" +
    "                        View in API\n" +
    "                    </md-button>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"old-article warning\" ng-show=\"publicationYear < 2017\">\n" +
    "                    <i class=\"fa fa-exclamation-triangle\"></i>\n" +
    "                    <span class=\"explanation\">\n" +
    "                        Paperbuzz data is currently less complete for articles published\n" +
    "                        before 2017.\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"metrics\">\n" +
    "                <div class=\"sources\">\n" +
    "                    <h3>Filter by source</h3>\n" +
    "                    <div class=\"source selected-{{ p.selectedSource && p.selectedSource == source }}\" ng-repeat=\"source in apiResp.altmetrics.sources\"\n" +
    "                            ng-click=\"selectSource(source)\">\n" +
    "                        <span class=\"name\">{{ source.source_id }}: </span>\n" +
    "                        <span class=\"count\">{{ source.events_count }}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"events\">\n" +
    "                    <h2>\n" +
    "                        <span class=\"val\">{{ filteredSources.length }}</span> events\n" +
    "                    </h2>\n" +
    "                    <div class=\"filter-info\">\n" +
    "                        <div class=\"state no-filter\" ng-show=\"!p.selectedSource\">\n" +
    "                            <span class=\"current\">\n" +
    "                                Showing all events.\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"state filter\" ng-show=\"p.selectedSource\">\n" +
    "                            <span class=\"current\">\n" +
    "                                Showing only <span class=\"source\">{{ p.selectedSource.source_id }}</span> events.\n" +
    "                            </span>\n" +
    "                            <span class=\"remove\" ng-click=\"p.selectedSource=null\">\n" +
    "\n" +
    "                                (remove filter)\n" +
    "                            </span>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"event\" ng-repeat=\"event in events | orderBy: '-occurred_at' | filter: {source_id: p.selectedSource.source_id} as filteredSources\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                        <div class=\"first-row unpaywall\" ng-if=\"event.source_id=='unpaywall_views'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-eye\"></i></span>\n" +
    "                            <span class=\"verb\">Viewed</span>\n" +
    "                            by a\n" +
    "                            <span class=\"uni\" ng-show=\"event.is_college_location\">university</span>\n" +
    "                            <span class=\"non-uni\" ng-show=\"!event.is_college_location\">non-university</span>\n" +
    "                            Unpaywall user in\n" +
    "                            <span class=\"country\">{{ event.country }}</span>.\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"first-row twitter\" ng-if=\"event.source_id=='twitter'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-twitter\"></i></span>\n" +
    "                            <span class=\"verb\">Mentioned</span> in\n" +
    "                            <a class=\"verb\" href=\"{{ event.url }}\" target=\"_blank\">a tweet</a>\n" +
    "                            by\n" +
    "                            <a href=\"{{ event.author }}\" target=\"_blank\">@{{ extractTwitterName(event.author) }}.</a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"first-row web\" ng-if=\"event.source_id=='web'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-table\"></i></span>\n" +
    "                            <span class=\"verb\">Mentioned</span> on\n" +
    "                            <a class=\"verb\" href=\"{{ event.url }}\" target=\"_blank\">a webpage.</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"first-row datacite\" ng-if=\"event.source_id=='datacite'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-spreadsheet\"></i></span>\n" +
    "                            <span class=\"verb\">Associated</span> with\n" +
    "                            <a class=\"verb\" href=\"{{ event.url }}\" target=\"_blank\">a DataCite resource.</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"first-row wikipedia\" ng-if=\"event.source_id=='wikipedia'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-wikipedia-w\"></i></span>\n" +
    "                            <span class=\"verb\">Cited</span> in\n" +
    "                            <a class=\"verb\" href=\"{{ event.url }}\" target=\"_blank\">a Wikipedia page.</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"first-row wordpressdotcom\" ng-if=\"event.source_id=='wordpressdotcom'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-wordpress\"></i></span>\n" +
    "                            <span class=\"verb\">Mentioned</span> in\n" +
    "                            <a class=\"verb\" href=\"{{ event.url }}\" target=\"_blank\">a Wordpress.com blog post.</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"first-row reddit\" ng-if=\"event.source_id=='reddit'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-reddit\"></i></span>\n" +
    "                            <span class=\"verb\">Mentioned</span> in\n" +
    "                            <a href=\"{{ event.url }}\">a Reddit post</a>\n" +
    "                            on the subreddit\n" +
    "                            <a href=\"https://www.reddit.com/r/{{ extractSubreddit(event.url) }}\">\"{{ extractSubreddit(event.url) }}.\"</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"first-row reddit-links\" ng-if=\"event.source_id=='reddit-links'\">\n" +
    "                            <span class=\"icon\"><i class=\"fa fa-reddit\"></i></span>\n" +
    "                            <span class=\"verb\">Mentioned</span> in\n" +
    "                            <a href=\"{{ event.url }}\">a Reddit link</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                        <div class=\"second-row\">\n" +
    "                            <span class=\"date\">{{ event.occurred_ago }}</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer.tpl.html",
    "<div class=\"by\">\n" +
    "\n" +
    "    <div class=\"creators\">\n" +
    "        Built with <i class=\"fa fa-heart-o\"></i> by\n" +
    "        <a href=\"http://impactstory.org/about\">Impactstory.</a>\n" +
    "    </div>\n" +
    "    <div class=\"funders\">\n" +
    "        Made possible by a grant from the\n" +
    "        <a href=\"https://pkp.sfu.ca/\">Public Knowledge Project.</a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"spacer\"></div>\n" +
    "<div class=\"links\">\n" +
    "    <a href=\"mailto:team@impactstory.org\">\n" +
    "        <i class=\"fa fa-envelope-o\"></i>\n" +
    "        <span class=\"text\">email</span>\n" +
    "    </a>\n" +
    "    <a href=\"http://twitter.com/paperbuzz_org\">\n" +
    "        <i class=\"fa fa-twitter\"></i>\n" +
    "        <span class=\"text\">twitter</span>\n" +
    "    </a>\n" +
    "    <a href=\"https://github.com/Impactstory/paperbuzz-webapp\">\n" +
    "        <i class=\"fa fa-github\"></i>\n" +
    "        <span class=\"text\">github</span>\n" +
    "    </a>\n" +
    "</div>");
}]);

angular.module("hot.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hot.tpl.html",
    "<div class=\"page hot\">\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"header\">\n" +
    "            <h1>\n" +
    "                Buzzing this week\n" +
    "            </h1>\n" +
    "\n" +
    "            <div class=\"issue\">\n" +
    "                <span class=\"week\">Week {{ issue.week }},</span>\n" +
    "                <span class=\"year\">{{ issue.year }}</span>\n" +
    "            </div>\n" +
    "            <div class=\"controls\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <!--\n" +
    "\n" +
    "                <div layout=\"row\" layout-align=\"space-between center\">\n" +
    "                    <span>What is your favorite weapon?</span>\n" +
    "                    <md-select ng-model=\"u.topic\" placeholder=\"Filter by topic\" class=\"md-no-underline\">\n" +
    "                        <md-option value=\"{{ topic }}\" ng-repeat=\"topic in topics\">topic</md-option>\n" +
    "                    </md-select>\n" +
    "                </div>\n" +
    "                -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <!-- Topic filter -->\n" +
    "                <md-menu class=\"topic-menu\">\n" +
    "                    <md-button class=\"other-topics\" ng-click=\"openMenu($mdOpenMenu, $event)\">\n" +
    "                        Topic:\n" +
    "                        <span class=\"active topic-option {{ makeUrlSafe(userFilters.topic) }}\" ng-show=\"userFilters.topic\">{{ userFilters.topic }}</span>\n" +
    "                        <span class=\"active topic-option\" ng-show=\"!userFilters.topic\">everything</span>\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-menu-content width=\"4\">\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('topic', null)\">\n" +
    "                                <div class=\"option\">\n" +
    "                                    <i class=\"fa fa-circle-o\"></i>\n" +
    "                                    Everything\n" +
    "                                </div>\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "\n" +
    "                        <md-menu-item ng-repeat=\"topic in topics\">\n" +
    "                            <md-button ng-click=\"setFilter('topic', topic)\" class=\"topic-option {{ makeUrlSafe(topic) }}\">\n" +
    "                                <div class=\"option\">\n" +
    "                                    <i class=\"fa fa-circle\"></i>\n" +
    "                                    {{ topic }}\n" +
    "                                </div>\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "                    </md-menu-content>\n" +
    "                </md-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <!-- Audience filter -->\n" +
    "                <md-menu>\n" +
    "                    <md-button class=\"other-topics\" ng-click=\"openMenu($mdOpenMenu, $event)\">\n" +
    "                        Audience:\n" +
    "                        <span class=\"active\" ng-show=\"userFilters.audience\">\n" +
    "                            <i class=\"fa fa-home\"></i>\n" +
    "                            mostly non-academic\n" +
    "                        </span>\n" +
    "                        <span class=\"active\" ng-show=\"!userFilters.audience\">everyone</span>\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-menu-content width=\"4\">\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('audience', null)\">\n" +
    "                                <div class=\"option\">\n" +
    "                                    <i class=\"fa fa-circle-o\"></i>\n" +
    "                                    everyone\n" +
    "                                </div>\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('audience', 'public')\">\n" +
    "                                <div class=\"option\">\n" +
    "                                    <i class=\"fa fa-home\"></i>\n" +
    "                                    mostly non-academic\n" +
    "                                </div>\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "                    </md-menu-content>\n" +
    "                </md-menu>\n" +
    "\n" +
    "\n" +
    "                <!-- Audience filter -->\n" +
    "                <md-menu>\n" +
    "                    <md-button class=\"other-topics\" ng-click=\"openMenu($mdOpenMenu, $event)\">\n" +
    "                        Availability:\n" +
    "                        <span class=\"active\" ng-show=\"userFilters.open\">\n" +
    "                            <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                            Open Access only\n" +
    "                        </span>\n" +
    "                        <span class=\"active\" ng-show=\"!userFilters.open\">any</span>\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-menu-content width=\"4\">\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('open', null)\">\n" +
    "                                <div class=\"option\">\n" +
    "                                    <i class=\"fa fa-circle-o\"></i>\n" +
    "                                    any\n" +
    "                                </div>\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('open', 'true')\">\n" +
    "                                <div class=\"option\">\n" +
    "                                    <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                                    Open Access only\n" +
    "                                </div>\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "                    </md-menu-content>\n" +
    "                </md-menu>\n" +
    "\n" +
    "                <div class=\"spacer\"></div>\n" +
    "\n" +
    "\n" +
    "                <md-button class=\"subscribe-button md-primary\" ng-click=\"subscribe()\">\n" +
    "                        <i class=\"fa fa-envelope-o\"></i>\n" +
    "                        Subscribe\n" +
    "                </md-button>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"main\">\n" +
    "\n" +
    "            <div class=\"loading\"\n" +
    "                 ng-show=\"!papers\">\n" +
    "                <span class=\"label\">Loading &hellip;</span>\n" +
    "                <md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"results\" ng-show=\"papers\">\n" +
    "                <div class=\"card {{ makeUrlSafe(paper.filters.topic) }}\" ng-repeat=\"paper in papers | orderBy: '-sort_score' | filter: paperFilter as filteredPapers\">\n" +
    "                    <div class=\"card-header\">\n" +
    "                        <span class=\"sort-score\">\n" +
    "                            <img src=\"static/img/paperbuzz-icon-sm.png\" alt=\"\">\n" +
    "                            <span class=\"num\">\n" +
    "                                {{ paper.sort_score }}\n" +
    "                            </span>\n" +
    "                        </span>\n" +
    "                        <span class=\"filters-by-name\">\n" +
    "                            <span class=\"topic filter {{ makeUrlSafe(paper.filters.topic) }}\">\n" +
    "                                {{ paper.filters.topic }}\n" +
    "                            </span>\n" +
    "                            <span class=\"open filter\" ng-show=\"paper.filters.open\">\n" +
    "                                <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                            </span>\n" +
    "                            <span class=\"academic filter\" ng-show=\"paper.filters.audience=='academic'\">\n" +
    "                                <i class=\"fa fa-university\"></i>\n" +
    "                            </span>\n" +
    "                            <span class=\"public filter\" ng-show=\"paper.filters.audience=='public'\">\n" +
    "                                <i class=\"fa fa-home\"></i>\n" +
    "                            </span>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"card-content\">\n" +
    "                        <div class=\"photo\">\n" +
    "                            <img src=\"{{ paper.photo }}\" alt=\"\">\n" +
    "                        </div>\n" +
    "                        <div class=\"first-row\">\n" +
    "                            <span class=\"title\">{{ paper.metadata.title }}</span>\n" +
    "                        </div>\n" +
    "                        <div class=\"second-row\">\n" +
    "                            <span class=\"author\" ng-repeat=\"author in paper.metadata.journal_authors | limitTo: 8\">\n" +
    "                                <span class=\"has-orcid-false\" ng-show=\"!author.ORCID\">\n" +
    "                                    {{ author.family }}<span class=\"comma\" ng-show=\"!$last\">,</span>\n" +
    "                                </span>\n" +
    "                                <a class=\"has-orcid-true\" href=\"{{ author.ORCID }}\" ng-show=\"author.ORCID\">\n" +
    "                                    {{ author.family }}<span class=\"comma\" ng-show=\"!$last\">,</span>\n" +
    "                                </a>\n" +
    "                            </span>\n" +
    "                            <span class=\"author et-al\" ng-show=\"paper.metadata.journal_authors.length > 8\">\n" +
    "                                <span class=\"has-orcid-false\">\n" +
    "                                     et al.\n" +
    "                                </span>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                        <div class=\"third-row\">\n" +
    "                            <span class=\"journal\">\n" +
    "                                {{ paper.metadata.journal_name }}\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                        <div class=\"abstract\">\n" +
    "                            {{ paper.metadata.abstract | limitTo: 250 }}\n" +
    "                            <span class=\"dots\" ng-show=\"paper.metadata.abstract.length > 400\">&hellip;</span>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"card-footer\">\n" +
    "                        <div class=\"buttons\">\n" +
    "                            <md-button class=\"md-raised md-primary\"\n" +
    "                                       target=\"_blank\"\n" +
    "                                       href=\"{{ paper.open_access.best_oa_location.url }}\"\n" +
    "                                       ng-show=\"paper.filters.open\">\n" +
    "                                <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                                Read\n" +
    "                            </md-button>\n" +
    "                            <md-button class=\"md-raised\"\n" +
    "                                       target=\"_blank\"\n" +
    "                                       href=\"http://doi.org/{{ paper.doi }}\"\n" +
    "                                       ng-show=\"!paper.filters.open\">\n" +
    "                                <i class=\"fa fa-lock\"></i>\n" +
    "                                View\n" +
    "                            </md-button>\n" +
    "                            <md-button class=\"md-raised\" href=\"https://twitter.com/intent/tweet?url=https://doi.org/{{ paper.doi }}&text={{ paper.metadata.title }}\">\n" +
    "                                <i class=\"fa fa-twitter\"></i>\n" +
    "                                Share\n" +
    "                            </md-button>\n" +
    "                        </div>\n" +
    "                        <div class=\"bottom-row\">\n" +
    "                            <span class=\"score-details\">\n" +
    "                                <a href=\"details/{{ paper.doi }}\" class=\"\">\n" +
    "                                    <img src=\"static/img/paperbuzz-icon-sm.png\" alt=\"\">\n" +
    "                                    score details\n" +
    "                                </a>\n" +
    "                            </span>\n" +
    "                            <div class=\"spacer\"></div>\n" +
    "                            <a href=\"http://doi.org/{{ paper.doi }}\">{{ paper.doi }}</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing.tpl.html",
    "<div class=\"page landing\">\n" +
    "    <div class=\"top-screen\" layout=\"row\" layout-align=\"center center\">\n" +
    "        <div class=\"content\">\n" +
    "            <div class=\"tagline\">\n" +
    "                <h1>Read the research people are talking about</h1>\n" +
    "                <p class=\"subtagline\">\n" +
    "                    Paperbuzz is a free and open way to track the online buzz around\n" +
    "                    scholarly articles.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"cta\">\n" +
    "                <a class=\"main-button\" href=\"/hot\">\n" +
    "                    See this week's top papers\n" +
    "                </a>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("page-not-found.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page-not-found.tpl.html",
    "<div class=\"landing static-page\">\n" +
    "    <h1>Sorry, we couldn't find that page!</h1>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search.tpl.html",
    "<div class=\"page search\">\n" +
    "    <div class=\"top-screen\">\n" +
    "        <div class=\"content\">\n" +
    "            <div class=\"tagline\">\n" +
    "                <h1>Find a specific article</h1>\n" +
    "                <p class=\"subtagline\">\n" +
    "                    Paste a DOI to track its online buzz. (Currently results are\n" +
    "                    incomplete for articles published before 2017).\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"user-input\">\n" +
    "                <div class=\"input-row\">\n" +
    "                    <md-input-container md-no-float\n" +
    "                                        class=\"md-block example-selected-{{ main.exampleSelected }}\"\n" +
    "                                        flex-gt-sm=\"\">\n" +
    "                        <label>Paste a DOI here</label>\n" +
    "                        <input ng-model=\"main.id\">\n" +
    "\n" +
    "                        <md-button ng-show=\"main.id\"\n" +
    "                                   ng-click=\"submit()\"\n" +
    "                                   ng-class=\"{fadeOut: !main.id}\"\n" +
    "                                   class=\" md-primary md-raised go animated fadeInRightBig\">\n" +
    "                            Find this article\n" +
    "                            <i class=\"fa fa-arrow-right\"></i>\n" +
    "                        </md-button>\n" +
    "\n" +
    "                        <!--\n" +
    "                        <md-button class=\"md-raised md-primary submit\" type=\"submit\">\n" +
    "                            Get the citation\n" +
    "                        </md-button>\n" +
    "                        -->\n" +
    "                    </md-input-container>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
