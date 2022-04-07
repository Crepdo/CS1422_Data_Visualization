const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "3001";
CONSTANTS.ENDPOINT.GRID = "/grid";
CONSTANTS.ENDPOINT.PCA = "/pca.csv";
CONSTANTS.ENDPOINT.MDS = "/mds.csv";
CONSTANTS.ENDPOINT.TSNE = "/tsne.csv";


module.exports = CONSTANTS;
