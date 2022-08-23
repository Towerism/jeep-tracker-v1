exports.getCotsOrderStatus = async function (von, lastName) {
  try {
    const { data } = await this.http.get(
      `https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`
    );
    return data;
  } catch (err) {
    this.throw(
      404,
      "There was an error retrieving the order status. Please check the VON and last name."
    );
  }
};
