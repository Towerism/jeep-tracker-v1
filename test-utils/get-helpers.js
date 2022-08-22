const { installHelpers } = require("../helpers");

exports.getHelpers = function () {
  const app = { context: {} };
  installHelpers(app);

  return app.context.helpers;
};
