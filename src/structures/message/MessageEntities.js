// @ts-check
const { Base } = require("../Base");
const { User } = require("../misc/User");
const { Collection } = require("@telegram.ts/collection");

/**
 * Represents a search result for a specific message entity type.
 * @typedef {Object} SearchResult
 * @property {number} index - The index of the entity.
 * @property {number} offset - The starting offset of the entity.
 * @property {number} length - The length of the entity.
 * @property {string} search - The text that matches the entity.
 */

class MessageEntities extends Base {
  /** @type {Collection<number, import("@telegram.ts/types").MessageEntity>} */
  #entities;

  /**
   * Creates an instance of the MessageEntities class.
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {string} searchText - The text to search within.
   * @param {import("@telegram.ts/types").MessageEntity[]} entities - The array of message entities.
   */
  constructor(client, searchText, entities) {
    super(client);

    /**
     * The text to search within.
     */
    this.searchText = searchText;

    this.#entities = new Collection(
      entities.map((entity, index) => [index, entity]),
    );
  }

  /**
   * Retrieves all mention entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of mention entities.
   */
  get mention() {
    return this.searchEntity("mention");
  }

  /**
   * Retrieves all hashtag entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of hashtag entities.
   */
  get hashtag() {
    return this.searchEntity("hashtag");
  }

  /**
   * Retrieves all cashtag entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of cashtag entities.
   */
  get cashtag() {
    return this.searchEntity("cashtag");
  }

  /**
   * Retrieves all bot command entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of bot command entities.
   */
  get botCommand() {
    return this.searchEntity("bot_command");
  }

  /**
   * Retrieves all URL entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of URL entities.
   */
  get url() {
    return this.searchEntity("url");
  }

  /**
   * Retrieves all email entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of email entities.
   */
  get email() {
    return this.searchEntity("email");
  }

  /**
   * Retrieves all phone number entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of phone number entities.
   */
  get phoneNumber() {
    return this.searchEntity("phone_number");
  }

  /**
   * Retrieves all bold entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of bold entities.
   */
  get bold() {
    return this.searchEntity("bold");
  }

  /**
   * Retrieves all italic entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of italic entities.
   */
  get italic() {
    return this.searchEntity("italic");
  }

  /**
   * Retrieves all underline entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of underline entities.
   */
  get underline() {
    return this.searchEntity("underline");
  }

  /**
   * Retrieves all strikethrough entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of strikethrough entities.
   */
  get strikethrough() {
    return this.searchEntity("strikethrough");
  }

  /**
   * Retrieves all spoiler entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of spoiler entities.
   */
  get spoiler() {
    return this.searchEntity("spoiler");
  }

  /**
   * Retrieves all blockquote entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of blockquote entities.
   */
  get blockquote() {
    return this.searchEntity("blockquote");
  }

  /**
   * Retrieves all code entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult>} A collection of code entities.
   */
  get code() {
    return this.searchEntity("code");
  }

  /**
   * Retrieves all pre entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult & { language?: import("../../client/interfaces/Language").LanguageCode }>} A collection of pre entities.
   */
  get pre() {
    return this.searchEntity("pre");
  }

  /**
   * Retrieves all text link entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult & { url: string }>} A collection of text link entities.
   */
  get textLink() {
    return this.searchEntity("text_link").filter((entity) => "url" in entity);
  }

  /**
   * Retrieves all text mention entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult & { user: User }>} A collection of text mention entities.
   */
  get textMention() {
    return this.searchEntity("text_mention").filter(
      (entity) => "user" in entity,
    );
  }

  /**
   * Retrieves all custom emoji entities from the message.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult & { customEmojiId: string }>} A collection of custom emoji entities.
   */
  get customEmoji() {
    return this.searchEntity("custom_emoji").filter(
      (entity) => "customEmojiId" in entity,
    );
  }

  /**
   * Searches for a specific type of entity in the message.
   * @param {"mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "blockquote" | "code" | "pre" | "text_link" | "text_mention" | "custom_emoji"} searchType - The type of entity to search for.
   * @returns {import("@telegram.ts/collection").ReadonlyCollection<number, SearchResult & ({ language?: import("../../client/interfaces/Language").LanguageCode } | { url: string } | { user: User } | { customEmojiId: string })>} A collection of found entities.
   */
  searchEntity(searchType) {
    const results = new Collection();

    this.#entities.forEach((entity, index) => {
      const { offset, length, type } = entity;
      if (type === searchType) {
        results.set(index, {
          index,
          offset,
          length,
          ...("language" in entity && { language: entity.language }),
          ...("url" in entity && { url: entity.url }),
          ...("user" in entity && { user: new User(this.client, entity.user) }),
          ...("custom_emoji_id" in entity && {
            customEmojiId: entity.custom_emoji_id,
          }),
          search: this.searchText.substring(offset, offset + length),
        });
      }
    });

    return results;
  }

  /**
   * Enables iteration over the message entities.
   * @returns {Generator<(SearchResult & ({ type: "mention" | "hashtag" | "cashtag" | "botCommand" | "url" | "email" |
      "phoneNumber" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "blockquote" | "code" | { type: "pre", language?: import("../../client/interfaces/Language").LanguageCode } | { type: "text_link", url: string } | { type: "text_mention", user: User } | { type: "customEmoji", customEmojiId: string }}))>} An iterator over the message entities.
   */
  *[Symbol.iterator]() {
    /** @type {(keyof MessageEntities)[]} */
    const entityTypes = [
      "mention",
      "hashtag",
      "cashtag",
      "botCommand",
      "url",
      "email",
      "phoneNumber",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "spoiler",
      "blockquote",
      "code",
      "pre",
      "textLink",
      "textMention",
      "customEmoji",
    ];

    const allEntities = new Collection();

    for (const type of entityTypes) {
      const typeEntities = this[type];
      if (typeEntities instanceof Collection) {
        typeEntities.forEach((entity, key) => {
          allEntities.set(key, { ...entity, type });
        });
      }
    }

    const sorted = allEntities.sort((a, b) => a.index - b.index).values();

    for (const entity of sorted) {
      yield entity;
    }
  }
}

module.exports = { MessageEntities };
