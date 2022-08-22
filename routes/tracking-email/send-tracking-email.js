const { promises } = require("nodemailer/lib/xoauth2");

const axios = require("axios").default;

async function aggregateTrackingInfo(von, lastName) {
  const ctx = this;
  const trackingInfo = await ctx.helpers.getTrackingInfo(von, lastName);
  const { vin } = trackingInfo;

  const [buildResponse, stickerResponse] = await Promise.all([
    ctx.helpers.getBuildSheet(vin),
    ctx.helpers.getWindowSticker(vin),
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
}

exports.sendTrackingEmail = async (ctx) => {
  const { von, lastName } = ctx.params;
  const locals = await aggregateTrackingInfo.bind(ctx)(von, lastName);

  await ctx.email.send({ template: "jeep-tracking", locals });

  ctx.body = { success: true };
};
exports.sendTrackingEmail.path = "/tracking-email/:von/:lastName";
