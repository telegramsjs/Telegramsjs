class OrderInfo {
  constructor(data) {
    if ("name" in data) {
      this.name = data.name;
    }

    if ("phone_number" in data) {
      this.phoneNumber = data.phone_number;
    }

    if ("email" in data) {
      this.email = data.email;
    }

    if ("shipping_address" in data) {
      const shippingAddress = {};

      shippingAddress.countryCode = data.shipping_address?.country_code;
      shippingAddress.city = data.shipping_address?.city;
      shippingAddress.streetLine1 = data.shipping_address?.street_line1;
      shippingAddress.streetLine2 = data.shipping_address?.street_line2;
      shippingAddress.postCode = data.shipping_address?.post_code;

      this.shippingAddress = shippingAddress;
    }
  }
}

module.exports = OrderInfo;
