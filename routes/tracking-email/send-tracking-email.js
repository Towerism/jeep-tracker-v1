const axios = require("axios").default;

exports.sendTrackingEmail = async (ctx) => {
  const { von, lastName } = ctx.params;
  const locals = await ctx.helpers.getTrackingInfo(von, lastName);
  await ctx.email.send({
    template: "jeep-tracking",
    locals,
  });

  ctx.body = { success: true };
};
exports.sendTrackingEmail.path = "/tracking-email/:von/:lastName";
