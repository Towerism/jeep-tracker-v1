exports.getBuildSheet = async function (vin) {
  const buildSheetUrl = `https://www.jeep.com/webselfservice/BuildSheetServlet?vin=${vin}`;
  const content = await this.queries.fetchPdfContent(buildSheetUrl);
  return {
    buildSheetFound: content.length > 5,
    buildSheetUrl,
  };
};
