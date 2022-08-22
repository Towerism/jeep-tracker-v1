exports.getWindowSticker = async function (vin) {
  const windowStickerUrl = `https://www.jeep.com/hostd/windowsticker/getWindowStickerPdf.do?vin=${vin}`;
  const content = await this.fetchPdfContent(windowStickerUrl);
  return {
    windowStickerFound: content.length > 1,
    windowStickerUrl,
  };
};
