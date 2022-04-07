const CONSTANTS = require("../constants");
const express = require("express");
const sampleData = require("../sampleData");
const fs = require('fs')
var path = require('path');

const router = express.Router();
// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.PCA, (req, res) => {
  appRoot = path.resolve(__dirname);
  fs.readFile(appRoot + '/../precompute/pca.csv', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.attachment('pca.csv').send(data)
  })
});

router.get(CONSTANTS.ENDPOINT.MDS, (req, res) => {
  appRoot = path.resolve(__dirname);
  fs.readFile(appRoot + '/../precompute/mds.csv', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.attachment('mds.csv').send(data)
  })
});

router.get(CONSTANTS.ENDPOINT.TSNE, (req, res) => {
  appRoot = path.resolve(__dirname);
  fs.readFile(appRoot + '/../precompute/tsne.csv', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.attachment('tsne.csv').send(data)
  })
});

router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  res.json(sampleData.textAssets);
});

module.exports = router;
