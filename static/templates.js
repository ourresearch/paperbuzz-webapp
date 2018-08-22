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
    "\n" +
    "    <div class=\"decimal-ol toc\">\n" +
    "        <ol>\n" +
    "            <li><a href=\"#limits\">Limits and authentication</a></li>\n" +
    "            <li>\n" +
    "                <a href=\"#endpoints\">Endpoints</a>\n" +
    "                <ol>\n" +
    "                    <li>GET /v0</li>\n" +
    "                    <li>GET /v0/:doi</li>\n" +
    "                </ol>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"#response-objects\">Response objects</a>\n" +
    "                <ol>\n" +
    "                    <li><a href=\"#api-status-object\">ApiStatus object</a></li>\n" +
    "                    <li><a href=\"#doi-object\">DOI object</a></li>\n" +
    "                    <li><a href=\"#altmetricssource-object\">AltmetricsSource object</a></li>\n" +
    "                    <li><a href=\"#event-object\">Event object</a></li>\n" +
    "                </ol>\n" +
    "            </li>\n" +
    "        </ol>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"limits\">1. Limits and authentication</h2>\n" +
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
    "    <h2 class=\"anchor\"  id=\"endpoints\">2. Endpoints</h2>\n" +
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
    "                    Gets attention metrics, metadata, and open access status\n" +
    "                    for a given DOI-assigned resource.\n" +
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
    "    <h2 class=\"anchor\"  id=\"response-objects\">3. Response objects</h2>\n" +
    "\n" +
    "    <p>\n" +
    "        These are the JSON objects returned by the API.\n" +
    "    </p>\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"api-status-object\">3.1 API Status object</h3>\n" +
    "    <p>Describes status of this API.</p>\n" +
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
    "    <h3 class=\"anchor\" id=\"doi-object\">3.2 DOI object</h3>\n" +
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
    "\n" +
    "<h3 class=\"anchor\" id=\"altmetricssource-object\">3.3 AltmetricsSource object</h3>\n" +
    "    <p>\n" +
    "        Describes online mentions of a DOI from certain altmetrics\n" +
    "        source (for example, Twitter or Reddit are both sources).\n" +
    "    </p>\n" +
    "    <table class=\"api-responses\">\n" +
    "\n" +
    "        <tbody><tr>\n" +
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
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">first_event_date</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "               Date of the first event found.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Represented as an\n" +
    "                <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO8601 timestamp</a>.\n" +
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
    "                <span class=\"name\">events_count_by_month</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of objects describing event counts binned by month.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Each day is represented by its own object, which has two properties:\n" +
    "                <code>count</code> and <code>date</code> (represented as an\n" +
    "                <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO8601 timestamp)</a>.\n" +
    "                Months with zero events are not included.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">events_count_by_year</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of objects describing event counts binned by year.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Each day is represented by its own object, which has two properties:\n" +
    "                <code>count</code> and <code>date</code> (represented as an\n" +
    "                <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO8601 timestamp)</a>.\n" +
    "                Years with zero events are not included.\n" +
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
    "                    Crossref Event Data schema</a>. Also represented in the <code>source</code> object, but maintained here for backwards compability.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">source</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Source details.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                The source object has three properties:<br/>\n" +
    "                <code>source_id</code> is the name of the source as defined by the <a href=\"https://www.eventdata.crossref.org/guide/sources/how-agents-work/\">\n" +
    "                    Crossref Event Data schema.\n" +
    "                </a>.<br/>\n" +
    "                <code>display_name</code> is a properly formatted source name for display to end users in a client application or GUI.<br/>\n" +
    "                <code>icon_url</code> returns an image link to the source logo or watermark icon.\n" +
    "\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"event-object\">3.4 Event object</h3>\n" +
    "    <p>\n" +
    "        Describes a time when someone interacted with DOI-assigned resource\n" +
    "        by mentioning it or linking to it online. For example, a tweet is an Event; so is a Reddit post.\n" +
    "        This Event object is a simplified version\n" +
    "        of the <a href=\"https://www.eventdata.crossref.org/guide/data/events/\">Event object</a>\n" +
    "        served by the Crossref Event Data API.\n" +
    "    </p>\n" +
    "    <table class=\"api-responses\">\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">author</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Name of author.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Where possible, this string is a URL. For Twitter, for example,\n" +
    "                    it's a URL pointing to the author's Twitter profile.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">occurred_at</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Time the event occured.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Represented as an\n" +
    "                <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO8601 timestamp</a>.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">url</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Location of the event.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                For example, if this Event is a tweet,\n" +
    "                this URL  would resolve\n" +
    "                to the tweet itself. This is the end of the provenance chain for altmetrics counts,\n" +
    "                since users can see and read the invocation of a given DOI, here at this URL.\n" +
    "            </td>\n" +
    "        </tr>\n" +
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
    "                    <div class=\"source selected-{{ p.selectedSource && p.selectedSource == source }}\" ng-repeat=\"source in apiResp.altmetrics_sources\"\n" +
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
    "                <h1>See who's talking about your research.</h1>\n" +
    "                <p class=\"subtagline\">\n" +
    "                    Paperbuzz is a free and open way to track the online buzz around\n" +
    "                    scholarly articles.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"cta\">\n" +
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
