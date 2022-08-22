exports.getTracking = async (ctx) => {
  const { von, lastName } = ctx.params;
  ctx.body = await ctx.helpers.aggregateTrackingInfo(von, lastName);
};
exports.getTracking.path = "/tracking/:von/:lastName";
