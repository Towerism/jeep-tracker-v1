const axios = require("axios").default;
const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const options = {};

exports.getBuildSheet = async (vin) => {
  // test vins: https://www.jlwranglerforums.com/forum/threads/2023-build-sheets-are-being-detected-test-builds-showing-equipment-options-to-expect-in-2023-models.95500/
  const buildSheetUrl = `https://www.jeep.com/webselfservice/BuildSheetServlet?vin=${vin}`;
  const { data } = await axios.get(buildSheetUrl, {
    responseType: "arraybuffer",
  });
  const extracted = await pdfExtract.extractBuffer(Buffer.from(data, "binary"));
  const found = extracted?.pages[0]?.content?.find(
    (c) => c.str === "Equipment Listing"
  );
  return {
    buildSheetFound: !!found,
    buildSheetUrl,
  };
};
