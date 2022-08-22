const { fetchPdfContent } = require("./fetch-pdf-content");

exports.getBuildSheet = async function (vin) {
  const buildSheetUrl = `https://www.jeep.com/webselfservice/BuildSheetServlet?vin=${vin}`;
  const content = await fetchPdfContent(buildSheetUrl);
  return {
    buildSheetFound: content.length > 5,
    buildSheetUrl,
  };
};
