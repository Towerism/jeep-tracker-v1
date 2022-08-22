const axios = require("axios").default;

exports.sendTrackingEmail = async (ctx) => {
  const { von, lastName } = ctx.params;
  const trackingInfo = await ctx.helpers.getTrackingInfo(von, lastName);
  const { vin } = trackingInfo;
  const { buildSheetFound, buildSheetUrl, extracted } =
    await ctx.helpers.getBuildSheet(vin);
  await ctx.email.send({
    template: "jeep-tracking",
    locals: {
      ...trackingInfo,
      buildSheetFound,
      buildSheetFoundMsg: buildSheetFound ? "b.s. FOUND" : "b.s. NOT FOUND",
      buildSheetUrl,
    },
  });

  ctx.body = { success: true };
};
exports.sendTrackingEmail.path = "/tracking-email/:von/:lastName";
