angular.module('templates.app', ['about.tpl.html', 'cite-page.tpl.html', 'landing.tpl.html', 'page-not-found.tpl.html']);

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

angular.module("cite-page.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cite-page.tpl.html",
    "<div class=\"page cite-page\">\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"loading\"\n" +
    "             ng-show=\"apiResp=='loading'\">\n" +
    "            <span class=\"label\">Finding metrics &hellip;</span>\n" +
    "            <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"citation animated fadeIn\" ng-show=\"apiResp.doi\">\n" +
    "            <h1>{{ apiResp.metadata.title }}</h1>\n" +
    "            <div class=\"metadata\">\n" +
    "                <div class=\"first-row\">\n" +
    "                    <span class=\"year\">{{ apiResp.open_access.year }}</span>\n" +
    "                    <span class=\"author\" ng-repeat=\"author in apiResp.metadata.author\">\n" +
    "                        {{ author.family }}</span>.\n" +
    "                    <span class=\"journal\">{{ apiResp.metadata[\"container-title\"] }}</span>\n" +
    "                    <a href=\"https://doi.org/{{ apiResp.doi }}\" class=\"linkout\">(view)</a>\n" +
    "                </div>\n" +
    "                <div class=\"second-row\">\n" +
    "                </div>\n" +
    "                <div class=\"third-row\" ng-show=\"apiResp.open_access.is_oa\">\n" +
    "\n" +
    "                    <!-- Green OA -->\n" +
    "                    <a href=\"{{ apiResp.open_access.best_oa_location.url }}\"  ng-show=\"apiResp.open_access.best_oa_location.host_type=='repository'\">\n" +
    "                        <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                        <span class=\"text\">\n" +
    "                            <span class=\"oa\">Open Access</span>\n" +
    "                            version available\n" +
    "                        </span>\n" +
    "                    </a>\n" +
    "\n" +
    "                    <!-- Gold/bronze OA -->\n" +
    "                    <a href=\"{{ apiResp.open_access.best_oa_location.url }}\" ng-show=\"apiResp.open_access.best_oa_location.host_type=='publisher'\">\n" +
    "                        <i class=\"fa fa-unlock-alt\"></i>\n" +
    "                        <span class=\"text\">\n" +
    "                            <span class=\"oa\">Open Access</span>\n" +
    "                            via the publisher\n" +
    "                        </span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"metrics\">\n" +
    "                <div class=\"sources\">\n" +
    "                    <div class=\"source\" ng-repeat=\"source in apiResp.altmetrics.sources\"\n" +
    "                            ng-click=\"p.selectedSource = source\">\n" +
    "                        <span class=\"name\">{{ source.source_id }}: </span>\n" +
    "                        <span class=\"count\">{{ source.events_count }}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"events\">\n" +
    "                    <h2>\n" +
    "                        <span class=\"val\">{{ filteredSources.length }}</span>\n" +
    "                        {{ selectedSource.source_id }} events\n" +
    "                        <span class=\"remove\" ng-click=\"selectedSource=null\">show all events</span>\n" +
    "                    </h2>\n" +
    "                    <div class=\"event\" ng-repeat=\"event in events | orderBy: '-occurred_at' | filter: {source_id: p.selectedSource.source_id} as filteredSources\">\n" +
    "                        <div class=\"first-row\">\n" +
    "                            <a href=\"{{ event.url }}\" class=\"link\">{{ event.url | limitTo: 50 }}...</a>\n" +
    "                        </div>\n" +
    "                        <div class=\"second-row\">\n" +
    "                            <span class=\"date\">{{ event.occurred_ago }}</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"item-footer\">\n" +
    "                <a href=\"{{ apiUrl }}\">\n" +
    "                    <i class=\"fa fa-cogs\"></i>\n" +
    "                    View in API\n" +
    "                </a>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing.tpl.html",
    "<div class=\"page landing\">\n" +
    "    <div class=\"top-screen\" layout=\"row\" layout-align=\"center center\">\n" +
    "        <div class=\"content\">\n" +
    "            <div class=\"tagline\">\n" +
    "                <h1>Open altmetrics for everyone.</h1>\n" +
    "                <p class=\"subtagline\">\n" +
    "                    Track online conversations about research papers, using a free and open-source nonprofit tool.\n" +
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
    "                                   class=\"md-fab md-mini md-primary go animated fadeInRightBig\">\n" +
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

angular.module("page-not-found.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page-not-found.tpl.html",
    "<div class=\"landing static-page\">\n" +
    "    <h1>Sorry, we couldn't find that page!</h1>\n" +
    "\n" +
    "</div>");
}]);
