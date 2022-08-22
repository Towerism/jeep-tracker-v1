const { getTrackingInfo } = require("./get-tracking-info");
const { getBuildSheet } = require("./get-build-sheet");

exports.installHelpers = (app) => {
  Object.assign(app.context, {
    helpers: {
      getTrackingInfo,
      getBuildSheet,
    },
  });
};
