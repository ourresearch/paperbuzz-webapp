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
    "        This API will be replaced by a new version when we launch\n" +
    "        in late 2017.\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"toc\">\n" +
    "        <li><a href=\"#limits\">Limits and authentication</a></li>\n" +
    "        <li>\n" +
    "            <a href=\"#endpoints\">Endpoints</a>\n" +
    "            <ul>\n" +
    "                <li><a href=\"#get-base\">GET /v2</a></li>\n" +
    "                <li><a href=\"#get-doi\">GET /v2/:doi</a></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <a href=\"#response-objects\">Response objects</a>\n" +
    "            <ul>\n" +
    "                <li><a href=\"#api-status-object\">API Status object</a></li>\n" +
    "                <li><a href=\"#oa-location-object\">OA Location object</a></li>\n" +
    "                <li><a href=\"#doi-object\">DOI object</a></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"limits\">Limits and authentication</h2>\n" +
    "    <p>\n" +
    "        The REST API gives anyone free, programmatic access to all of oaDOI's data.\n" +
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
    "        <a href=\"https://groups.google.com/forum/#!forum/oadoi-users\">mailing list</a> in order\n" +
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
    "                    <a href=\"https://api.oadoi.org?email=test@example.com\">https://api.oadoi.org?email=test@example.com</a>\n" +
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
    "                    Gets OA status and bibliographic info for an given DOI-assigned resource.\n" +
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
    "                    <a href=\"https://api.oadoi.org/10.1038/nature12373?email=test@example.com\">https://api.oadoi.org/10.1038/nature12373?email=test@example.com</a>\n" +
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
    "\n" +
    "\n" +
    "\n" +
    "    <!-------------------------------------------------------------------------\n" +
    "\n" +
    "    RESPONSE OBJECTS\n" +
    "\n" +
    "    --------------------------------------------------------------------------->\n" +
    "\n" +
    "    <h2 class=\"anchor\"  id=\"response-objects\">Response objects</h2>\n" +
    "    <p>The API returns three different types of response objects. Really two, since more users won't ever need the API Status object, which just defines the root of the API. The OA Location object describes a place we found an OA copy of an article. There are one or more of these associated with DOI object, which describes a given DOI-assigned resource.</p>\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"api-status-object\">API Status object</h3>\n" +
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
    "                Example: <code>2.0.1</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <h3 class=\"anchor\" id=\"oa-location-object\">OA Location object</h3>\n" +
    "    <p>The OA Location object describes particular location where we found a given OA article. The same article is often available from multiple locations. There may be differences in format, version, and license from one location to another, even if it's the same article in all cases.</p>\n" +
    "    <table class=\"api-responses\">\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">evidence</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                How we found this OA location.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Used for debugging. Don’t depend on the exact contents of this for anything, because values are subject to change without warning. Example values:\n" +
    "\n" +
    "                </p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>oa journal (via journal title in doaj)</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            We found the name of the journal that publishes this article in the DOAJ database.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>oa repository (via pmcid lookup)</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            We found this article in an index of PubMed Central articles.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">host_type</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The type of host that serves this OA location.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    There are two possible values:\n" +
    "                </p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>publisher</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            means the this location is served by the article’s publisher (in practice, this means it is hosted on the same domain the DOI resolves to).\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>repository</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            means this location is served by an Open Access repository.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">license</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The license under which this copy is published.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>We return several types of licenses:</p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        Creative Commons licenses are uniformly abbreviated and lowercased. Example: <code>cc-by-nc</code>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        Publisher-specific licenses are normalized using this format: <code>acs-specific: authorchoice/editors choice usage agreement</code>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        When we have evidence that an OA license of <em>some</em> kind was used, but it’s not reported directly on the webpage at this location, this field returns <code>implied-oa</code>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">updated</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Time when the data for this location was last updated.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Returned as an <a href=\"https://xkcd.com/1179/\">ISO8601-formatted</a> timestamp. Example: <code>2017-08-17T23:43:27.753663</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">url</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The URL where you can find this OA copy.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    Although this URL points to fulltext of <em>some</em> kind, there is (for now) no format normalization...it could be PDF, HTML, or even Word or TeX.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">versions</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The content version accessible at this location.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    We use the <a href=\"https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings\">DRIVER Guidelines v2.0 VERSION standard</a> to define  versions of a given article; see those docs for complete definitions of terms. Here's the basic idea, though, for the three version types we support:\n" +
    "                </p>\n" +
    "                <ul>\n" +
    "                    <li><code>submittedVersion</code> is not yet peer-reviewed.</li>\n" +
    "                    <li><code>acceptedVersion</code> is peer-reviewed, but lacks publisher-specific formatting.</li>\n" +
    "                    <li><code>publishedVersion</code> is the version of record.</li>\n" +
    "                </ul>\n" +
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
    "    <h3 class=\"anchor\" id=\"doi-object\">DOI object</h3>\n" +
    "    <p>The DOI object describes a given DOI-assigned resource. It contains metadata about the resource itself, as well as information about its OA status.</p>\n" +
    "\n" +
    "    <table class=\"api-responses\">\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">best_oa_location</span>\n" +
    "                <span class=\"type\">Object|null</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The best <a href=\"#oa-location-object\">OA Location</a> object we could find for this DOI.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>\n" +
    "                    The \"best\" location is determined using an algorithm that prioritizes publisher-hosted content first (eg Hybrid or Gold), then prioritizes versions closer to the version of record (<code>PublishedVersion</code> over <code>AcceptedVersion</code>), then more authoritative repositories (PubMed Central over CiteSeerX).\n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    Returns <code>null</code> if we couldn't find any OA Locations.\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">data_standard</span>\n" +
    "                <span class=\"type\">Integer</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Indicates the data collection approaches used for this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                <p>Possible values</p>\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>1</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            First-generation hybrid detection. Uses only data from the Crossref API to determine hybrid status. Does a good job for Elsevier articles and a few other publishers, but most publishers are not checked for hybrid.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <span class=\"value\"><code>2</code></span>\n" +
    "                        <span class=\"notes\">\n" +
    "                            Second-generation hybrid detection. Uses additional sources, checks all publishers for hybrid. Gets about 10x as much hybrid. <code>data_standard==2</code> is the version used in the paper we wrote about oaDOI.\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
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
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">is_oa</span>\n" +
    "                <span class=\"type\">Boolean</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                <code>True</code> if there is an OA copy of this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Convenience attribute; returns <code>true</code> when <code>best_oa_location</code> is not <code>null</code>.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">journal_is_oa</span>\n" +
    "                <span class=\"type\">Boolean</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Is this resource published in a completely OA journal\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Useful for most definitions of Gold OA. Currently this is based entirely on inclusion in the <a\n" +
    "                    href=\"http://doaj.org\">DOAJ,</a> but eventually may use additional ways of identifying all-OA journals.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">journal_issns</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Any ISSNs assigned to the journal publishing this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Separate ISSNs are sometimes assigned to print and electronic versions of the same journal. If there are multiple ISSNs, they are separated by commas. Example: <code>1232-1203,1532-6203</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">journal_name</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The name of the journal publishing this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                The same journal may have multiple name strings (eg, \"J. Foo\", \"Journal of Foo\", \"JOURNAL OF FOO\", etc). These have not been fully normalized within our database, so use with care.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">oa_locations</span>\n" +
    "                <span class=\"type\">List</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                List of all the <a href=\"#oa-location-object\">OA Location</a> objects associated with this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                This list is unnecessary for the vast majority of use-cases, since you probably just want the <code>best_oa_location</code>. It's included primarily for research purposes.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">publisher</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The name of this resource's publisher.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Keep in mind that publisher name strings change over time, particularly as publishers are acquired or split up.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">title</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                The title of this resource.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                It's the title. Pretty straightforward.\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <tr>\n" +
    "            <td class=\"key\">\n" +
    "                <span class=\"name\">updated</span>\n" +
    "                <span class=\"type\">String</span>\n" +
    "            </td>\n" +
    "            <td class=\"contents\">\n" +
    "                Time when the data for this resource was last updated.\n" +
    "            </td>\n" +
    "            <td class=\"notes\">\n" +
    "                Returned as an <a href=\"https://xkcd.com/1179/\">ISO8601-formatted</a> timestamp. Example: <code>2017-08-17T23:43:27.753663</code>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "    </table>\n" +
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
    "            <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\n" +
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
    "            <h1>Buzzing this week</h1>\n" +
    "            <div class=\"issue\">\n" +
    "                <span class=\"year\">{{ issue.year }},</span>\n" +
    "                <span class=\"week\">week {{ issue.week }}</span>\n" +
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
    "                                Everything\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "\n" +
    "                        <md-menu-item ng-repeat=\"topic in topics\">\n" +
    "                            <md-button ng-click=\"setFilter('topic', topic)\" class=\"topic-option {{ makeUrlSafe(topic) }}\">\n" +
    "                                <i class=\"fa fa-circle\"></i>\n" +
    "                                {{ topic }}\n" +
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
    "                        <span class=\"active\" ng-show=\"userFilters.audience\">mostly non-academic</span>\n" +
    "                        <span class=\"active\" ng-show=\"!userFilters.audience\">everyone</span>\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-menu-content width=\"4\">\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('audience', null)\">\n" +
    "                                Everyone\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('audience', 'public')\">\n" +
    "                                mostly non-academic\n" +
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
    "                        <span class=\"active\" ng-show=\"userFilters.open\">free only</span>\n" +
    "                        <span class=\"active\" ng-show=\"!userFilters.open\">any</span>\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-menu-content width=\"4\">\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('open', null)\">\n" +
    "                                any\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "\n" +
    "                        <md-menu-item>\n" +
    "                            <md-button ng-click=\"setFilter('open', 'true')\">\n" +
    "                                free only\n" +
    "                            </md-button>\n" +
    "                        </md-menu-item>\n" +
    "                    </md-menu-content>\n" +
    "                </md-menu>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"main\">\n" +
    "\n" +
    "            <div class=\"results\">\n" +
    "                <div class=\"card {{ makeUrlSafe(paper.filters.topic) }}\" ng-repeat=\"paper in papers | orderBy: '-sort_score' | filter: paperFilter as filteredPapers\">\n" +
    "                    <div class=\"card-header\">\n" +
    "                        <span class=\"sort-score\">\n" +
    "                            {{ paper.sort_score }}\n" +
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
    "                            {{ paper.metadata.abstract | limitTo: 200 }}\n" +
    "                            <span class=\"dots\" ng-show=\"paper.metadata.abstract.length > 400\">&hellip;</span>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"card-footer\">\n" +
    "                        <div class=\"buttons\">\n" +
    "                            <md-button class=\"md-raised md-primary\"\n" +
    "                                       target=\"_blank\"\n" +
    "                                       href=\"{{ paper.open_access.best_open_location.url }}\"\n" +
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
    "                            <a href=\"http://doi.org/{{ paper.doi }}\">{{ paper.doi }}</a>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
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
    "                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\n" +
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
