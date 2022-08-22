const axios = require("axios").default;

exports.sendTrackingEmail = async (ctx) => {
  const { von, lastName } = ctx.params;
  const trackingInfo = await ctx.helpers.getTrackingInfo(von, lastName);
  const { vin } = trackingInfo;
  const { buildSheetFound, buildSheetUrl, extracted } =
    await ctx.helpers.getBuildSheet(vin);
  const { windowStickerFound, windowStickerUrl, content } =
    await ctx.helpers.getWindowSticker(vin);
  await ctx.email.send({
    template: "jeep-tracking",
    locals: {
      ...trackingInfo,
      buildSheetFound,
      buildSheetFoundMsg: buildSheetFound ? "b.s. FOUND" : "b.s. NOT found",
      buildSheetUrl,
      windowStickerFound,
      windowStickerFoundMsg: windowStickerFound
        ? "w.s. FOUND"
        : "b.s. NOT found",
      windowStickerUrl,
    },
  });

  ctx.body = { success: true, content };
};
exports.sendTrackingEmail.path = "/tracking-email/:von/:lastName";
