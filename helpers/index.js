const { getTrackingInfo } = require("./get-tracking-info");

exports.installHelpers = (app) => {
  Object.assign(app.context, {
    helpers: {
      getTrackingInfo,
    },
  });
};
