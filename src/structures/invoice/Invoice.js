class Invoice {
  constructor(data) {
    this.title = data.title;

    this.description = data.description;

    this.startParameter = data.start_parameter;

    this.currency = data.currency;

    this.totalAmount = data.total_amount;
  }
}

module.exports = { Invoice };
