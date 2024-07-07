class Base {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client, writable: true });
  }

  _patch(data) {
    return data;
  }

  _clone() {
    return Object.assign(Object.create(this), this);
  }

  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }

  valueOf() {
    return this.id;
  }
}

module.exports = { Base };
