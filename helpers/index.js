const { getTrackingInfo } = require("./get-tracking-info");
const { getBuildSheet } = require("./get-build-sheet");
const { getWindowSticker } = require("./get-window-sticker");
const { aggregateTrackingInfo } = require("./aggregate-tracking-info");

exports.installHelpers = (app) => {
  const helpers = {
    getTrackingInfo,
    getBuildSheet,
    getWindowSticker,
    aggregateTrackingInfo,
  };

  Object.keys(helpers).forEach((h) => {
    helpers[h] = helpers[h].bind(helpers);
  });

  app.context.helpers = helpers;
};
