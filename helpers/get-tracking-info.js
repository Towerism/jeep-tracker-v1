const axios = require("axios").default;

exports.getTrackingInfo = async function (von, lastName) {
  const { data } = await axios.get(
    `https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`
  );
  const { orderstatus, vinDetails } = data;
  const yStatuses = orderstatus.filter(
    (status) => status.currentStatus === status.display
  );
  const { statusCode, statusDesc, statusUpdateDate } = yStatuses.pop();
  const { brandName, modelYear, modelName, image, vin } = vinDetails;
  return {
    statusCode,
    statusDesc,
    statusUpdateDate,
    brandName,
    modelYear,
    modelName,
    vehicle: `${modelYear} ${modelName}`,
    image: `${image}&width=714&height=300&bkgnd=transparent&resp=png`,
    vin,
    von,
  };
};
