const { getBuildSheet } = require("./get-build-sheet");

test("reports build sheet found", async () => {
  // test vins: https://www.jlwranglerforums.com/forum/threads/2023-build-sheets-are-being-detected-test-builds-showing-equipment-options-to-expect-in-2023-models.95500/
  const promises = [
    "1C4HJXDM2PW500044",
    "1C4HJXFN5PW500061",
    "1C4HJXEMXPW500081",
    "1C4JJXSJ4PW500007",
    "1C4JJXP60PW500025",
    "1C4HJXENXPW500039",
  ].map(async (vin) => {
    const { buildSheetFound } = await getBuildSheet(vin);

    expect(buildSheetFound).toBe(true);
  });

  await Promise.all(promises);
});

test("reports build sheet NOT found", async () => {
  const { buildSheetFound } = await getBuildSheet("1234567890W500000");

  expect(buildSheetFound).toBe(false);
});
