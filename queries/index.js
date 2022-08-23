const axios = require("axios").default;
const { getCotsOrderStatus } = require("./get-cots-order-status");
const { fetchPdfContent } = require("./fetch-pdf-content");

exports.installQueries = (app) => {
  const queries = {
    getCotsOrderStatus,
    fetchPdfContent,
  };

  Object.keys(queries).forEach((queryName) => {
    queries[queryName] = queries[queryName].bind({
      http: axios,
      throw: app.context.throw.bind(app.context),
    });
  });

  app.context.queries = queries;
};
