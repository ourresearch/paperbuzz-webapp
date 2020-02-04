import os
import sys
from flask import render_template
from app import app


#support CORS
@app.after_request
def add_crossdomain_header(resp):
    resp.headers['Access-Control-Allow-Origin'] = "*"
    resp.headers['Access-Control-Allow-Methods'] = "POST, GET, OPTIONS, PUT, DELETE, PATCH"
    resp.headers['Access-Control-Allow-Headers'] = "origin, content-type, accept, x-requested-with"

    # without this jason's heroku local buffers forever
    sys.stdout.flush()

    return resp


@app.route("/<path:page>")
@app.route("/")
def index_endpoint(path="index", page=""):
    return render_template(
        'index.html'
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5010))
    app.run(host='0.0.0.0', port=port, threaded=True)
