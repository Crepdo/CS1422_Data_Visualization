import http
import os

import flask
import arts_1422_2.sample_data

PORT = os.environ.get("PORT", 3001)
ENDPOINT_GRID = "/api/grid"
ENDPOINT_DATA = "/api/data"

app = flask.Flask(__name__, static_folder="../build")

# Grid Page Endpoint
@app.route(ENDPOINT_GRID)
def get_grid():
    return flask.jsonify(arts_1422_2.sample_data.sample_orders)

@app.route(ENDPOINT_DATA)
def get_chart_data():
    return flask.jsonify({"hi": "Yifan"})

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    file_to_serve = "index.html"
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        file_to_serve = path
    return flask.send_from_directory(app.static_folder, file_to_serve)


# Error Handler
@app.errorhandler(http.HTTPStatus.NOT_FOUND.value)
def page_not_found():
    json_response = flask.jsonify({"error": "Page not found"})
    return flask.make_response(json_response, http.HTTPStatus.NOT_FOUND)


if __name__ == "__main__":
    app.run(port=PORT)
