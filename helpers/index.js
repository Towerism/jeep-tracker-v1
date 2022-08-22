const { getTrackingInfo } = require("./get-tracking-info");
const { getBuildSheet } = require("./get-build-sheet");
const { getWindowSticker } = require("./get-window-sticker");
const { aggregateTrackingInfo } = require("./aggregate-tracking-info");
const { fetchPdfContent } = require("./fetch-pdf-content");

exports.installHelpers = (app) => {
  const helpers = {
    getTrackingInfo,
    getBuildSheet,
    getWindowSticker,
    aggregateTrackingInfo,
    fetchPdfContent,
  };

  app.context.helpers = helpers;
};
