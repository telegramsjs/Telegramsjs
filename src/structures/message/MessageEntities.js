class MessageEntities {
  constructor(searchText, entities) {
    this.searchText = searchText || "";
    this.entities = entities || [];
  }

  get mention() {
    return this.searchEntity("mention");
  }

  get hashtag() {
    return this.searchEntity("hashtag");
  }

  get cashtag() {
    return this.searchEntity("cashtag");
  }

  get botCommand() {
    return this.searchEntity("bot_command");
  }

  get url() {
    return this.searchEntity("url");
  }

  get email() {
    return this.searchEntity("email");
  }

  get phoneNumber() {
    return this.searchEntity("phone_number");
  }

  get bold() {
    return this.searchEntity("bold");
  }

  get italic() {
    return this.searchEntity("italic");
  }

  get underline() {
    return this.searchEntity("underline");
  }

  get strikethrough() {
    return this.searchEntity("strikethrough");
  }

  get spoiler() {
    return this.searchEntity("spoiler");
  }

  get blockquote() {
    return this.searchEntity("blockquote");
  }

  get code() {
    return this.searchEntity("code");
  }

  searchEntity(searchType) {
    const entities = [];
    this.entities.forEach((entity, index) => {
      const { offset, length, type } = entity;
      if (type === searchType) {
        entities.push({
          index,
          offset,
          length,
          search: this.searchText.substring(offset, offset + length),
        });
      }
    });
    return entities;
  }

  *[Symbol.iterator]() {
    yield* Object.entries({
      [this.searchText]: this.entities,
    });
  }
}

module.exports = { MessageEntities };
