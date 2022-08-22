const { getWindowSticker } = require("./get-window-sticker");

test("reports window sticker found", async () => {
  const { windowStickerFound } = await getWindowSticker("zaccjabb7hpe91526");

  expect(windowStickerFound).toBe(true);
});

test("reports window sticker NOT found", async () => {
  const { windowStickerFound } = await getWindowSticker("1234567890W500000");

  expect(windowStickerFound).toBe(false);
});
