const axios = require("axios").default;

exports.aggregateTrackingInfo = async function (von, lastName) {
  const trackingInfo = await this.getTrackingInfo(von, lastName);
  const { vin } = trackingInfo;

  const [buildResponse, stickerResponse] = await Promise.all([
    this.getBuildSheet(vin),
    this.getWindowSticker(vin),
  ]);
  const { buildSheetFound, buildSheetUrl } = buildResponse;
  const { windowStickerFound, windowStickerUrl } = stickerResponse;

  return {
    ...trackingInfo,
    buildSheetFound,
    buildSheetFoundMsg: buildSheetFound ? "b.s. 1" : "b.s. 0",
    buildSheetUrl,
    windowStickerFound,
    windowStickerFoundMsg: windowStickerFound ? "w.s. 1" : "w.s. 0",
    windowStickerUrl,
  };
};
