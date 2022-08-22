const axios = require("axios").default;

exports.sendTrackingEmail = async (ctx) => {
  const { von, lastName } = ctx.params;
  const trackingInfo = await ctx.helpers.getTrackingInfo(von, lastName);
  const { vin } = trackingInfo;
  const { buildSheetFound, buildSheetUrl } = await ctx.helpers.getBuildSheet(
    vin
  );
  const { windowStickerFound, windowStickerUrl } =
    await ctx.helpers.getWindowSticker(vin);
  await ctx.email.send({
    template: "jeep-tracking",
    locals: {
      ...trackingInfo,
      buildSheetFound,
      buildSheetFoundMsg: buildSheetFound ? "b.s. 1" : "b.s. 0",
      buildSheetUrl,
      windowStickerFound,
      windowStickerFoundMsg: windowStickerFound ? "w.s. 1" : "w.s. 0",
      windowStickerUrl,
    },
  });

  ctx.body = { success: true };
};
exports.sendTrackingEmail.path = "/tracking-email/:von/:lastName";
