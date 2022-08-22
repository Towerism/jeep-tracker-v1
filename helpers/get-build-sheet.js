const { fetchPdfContent } = require("./fetch-pdf-content");

exports.getBuildSheet = async (vin) => {
  const buildSheetUrl = `https://www.jeep.com/webselfservice/BuildSheetServlet?vin=${vin}`;
  const content = await fetchPdfContent(buildSheetUrl);
  console.log("contentLength", content.length);
  return {
    buildSheetFound: content.length > 5,
    buildSheetUrl,
  };
};