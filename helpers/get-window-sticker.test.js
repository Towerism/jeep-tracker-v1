const { getHelpers } = require("../test-utils/get-helpers");

let helpers;
beforeEach(() => {
  helpers = getHelpers();
});

test("reports window sticker found", async () => {
  const { windowStickerFound } = await helpers.getWindowSticker(
    "zaccjabb7hpe91526"
  );

  expect(windowStickerFound).toBe(true);
});

test("reports window sticker NOT found", async () => {
  const { windowStickerFound } = await helpers.getWindowSticker(
    "1234567890W500000"
  );

  expect(windowStickerFound).toBe(false);
});
