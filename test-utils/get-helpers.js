const { installQueries } = require("../queries");
const { installHelpers } = require("../helpers");

exports.getHelpers = function () {
  const app = { context: { throw: () => {} } };
  installQueries(app);
  installHelpers(app);

  return app.context.helpers;
};
