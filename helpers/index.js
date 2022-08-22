const { getTrackingInfo } = require("./get-tracking-info");
const { getBuildSheet } = require("./get-build-sheet");
const { getWindowSticker } = require("./get-window-sticker");

exports.installHelpers = (app) => {
  Object.assign(app.context, {
    helpers: {
      getTrackingInfo,
      getBuildSheet,
      getWindowSticker,
    },
  });
};
