const OrderInfo = require("./OrderInfo");

class SuccessfulPayment {
  constructor(data) {
    this.currency = data.currency;

    this.totalAmount = data.total_amount;

    this.payload = data.invoice_payload;

    if ("shipping_option_id" in data) {
      this.shippingId = data.shipping_option_id;
    }

    if ("order_info" in data) {
      this.orderInfo = new OrderInfo(data.order_info);
    }

    this.telegramPaymentId = data.telegram_payment_charge_id;

    this.providedPaymentId = data.provider_payment_charge_id;
  }
}

module.exports = SuccessfulPayment;
