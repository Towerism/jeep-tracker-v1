const { fetchPdfContent } = require("./fetch-pdf-content");

exports.getWindowSticker = async (vin) => {
  const windowStickerUrl = `https://www.jeep.com/hostd/windowsticker/getWindowStickerPdf.do?vin=${vin}`;
  const content = await fetchPdfContent(windowStickerUrl);
  return {
    windowStickerFound: content.length > 1,
    windowStickerUrl,
  };
};
