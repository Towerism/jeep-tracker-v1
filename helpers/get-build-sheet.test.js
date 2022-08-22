const { getBuildSheet } = require("./get-build-sheet");

test("reports build sheet found", async () => {
  // test vins: https://www.jlwranglerforums.com/forum/threads/2023-build-sheets-are-being-detected-test-builds-showing-equipment-options-to-expect-in-2023-models.95500/
  const { buildSheetFound } = await getBuildSheet("1C4HJXENXPW500039");

  expect(buildSheetFound).toBe(true);
});

test("reports build sheet NOT found", async () => {
  const { buildSheetFound } = await getBuildSheet("1234567890W500000");

  expect(buildSheetFound).toBe(false);
});
