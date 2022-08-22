const { fetchPdfContent } = require("./fetch-pdf-content");

exports.getBuildSheet = async (vin) => {
  const buildSheetUrl = `https://www.jeep.com/webselfservice/BuildSheetServlet?vin=${vin}`;
  const content = await fetchPdfContent(buildSheetUrl);
  const found = content.find((c) => c.str === "Equipment Listing");
  return {
    buildSheetFound: !!found,
    buildSheetUrl,
  };
};
