﻿const CONSTANTS = {};

CONSTANTS.ERROR_MESSAGE = {};

CONSTANTS.ERROR_MESSAGE.GRID_GET = "Request to get grid text failed:";

CONSTANTS.ENDPOINT = {};

CONSTANTS.ENDPOINT.GRID = "/api/grid";
CONSTANTS.ENDPOINT.PCA = "/api/pca.csv";
CONSTANTS.ENDPOINT.MDS = "/api/mds.csv";
CONSTANTS.ENDPOINT.TSNE = "/api/tsne.csv";

CONSTANTS.SIZE = {};
CONSTANTS.SIZE.MARGIN = { top: 30, right: 30, bottom: 60, left: 100 };
CONSTANTS.SIZE.WIDTH = 900 - CONSTANTS.SIZE.MARGIN.left - CONSTANTS.SIZE.MARGIN.right;
CONSTANTS.SIZE.HEIGHT = 500 - CONSTANTS.SIZE.MARGIN.top - CONSTANTS.SIZE.MARGIN.bottom;

export default CONSTANTS;