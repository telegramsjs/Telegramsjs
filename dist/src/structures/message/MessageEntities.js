"use strict";
/**
 * Represents a search result for a specific message entity type.
 * @typedef {Object} SearchResult
 * @property {number} index - The index of the entity.
 * @property {number} offset - The starting offset of the entity.
 * @property {number} length - The length of the entity.
 * @property {string} search - The text that matches the entity.
 */
class MessageEntities {
    /**
     * Creates an instance of the MessageEntities class.
     * @param {string} searchText - The text to search within.
     * @param {import("@telegram.ts/types").MessageEntity[]} entities - The array of message entities.
     */
    constructor(searchText, entities) {
        this.searchText = searchText || "";
        this.entities = entities || [];
    }
    /**
     * Retrieves all mention entities from the message.
     * @returns {SearchResult[]} An array of objects representing mention entities.
     */
    get mention() {
        return this.searchEntity("mention");
    }
    /**
     * Retrieves all hashtag entities from the message.
     * @returns {SearchResult[]} An array of objects representing hashtag entities.
     */
    get hashtag() {
        return this.searchEntity("hashtag");
    }
    /**
     * Retrieves all cashtag entities from the message.
     * @returns {SearchResult[]} An array of objects representing cashtag entities.
     */
    get cashtag() {
        return this.searchEntity("cashtag");
    }
    /**
     * Retrieves all bot command entities from the message.
     * @returns {SearchResult[]} An array of objects representing bot command entities.
     */
    get botCommand() {
        return this.searchEntity("bot_command");
    }
    /**
     * Retrieves all URL entities from the message.
     * @returns {SearchResult[]} An array of objects representing URL entities.
     */
    get url() {
        return this.searchEntity("url");
    }
    /**
     * Retrieves all email entities from the message.
     * @returns {SearchResult[]} An array of objects representing email entities.
     */
    get email() {
        return this.searchEntity("email");
    }
    /**
     * Retrieves all phone number entities from the message.
     * @returns {SearchResult[]} An array of objects representing phone number entities.
     */
    get phoneNumber() {
        return this.searchEntity("phone_number");
    }
    /**
     * Retrieves all bold entities from the message.
     * @returns {SearchResult[]} An array of objects representing bold entities.
     */
    get bold() {
        return this.searchEntity("bold");
    }
    /**
     * Retrieves all italic entities from the message.
     * @returns {SearchResult[]} An array of objects representing italic entities.
     */
    get italic() {
        return this.searchEntity("italic");
    }
    /**
     * Retrieves all underline entities from the message.
     * @returns {SearchResult[]} An array of objects representing underline entities.
     */
    get underline() {
        return this.searchEntity("underline");
    }
    /**
     * Retrieves all strikethrough entities from the message.
     * @returns {SearchResult[]} An array of objects representing strikethrough entities.
     */
    get strikethrough() {
        return this.searchEntity("strikethrough");
    }
    /**
     * Retrieves all spoiler entities from the message.
     * @returns {SearchResult[]} An array of objects representing spoiler entities.
     */
    get spoiler() {
        return this.searchEntity("spoiler");
    }
    /**
     * Retrieves all blockquote entities from the message.
     * @returns {SearchResult[]} An array of objects representing blockquote entities.
     */
    get blockquote() {
        return this.searchEntity("blockquote");
    }
    /**
     * Retrieves all code entities from the message.
     * @returns {SearchResult[]} An array of objects representing code entities.
     */
    get code() {
        return this.searchEntity("code");
    }
    /**
     * Searches for a specific type of entity in the message.
     * @param {string} searchType - The type of entity to search for.
     * @returns {SearchResult[]} An array of objects representing the found entities.
     */
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
    /**
     * Enables iteration over the message entities.
     * @returns {Generator<[string, import("@telegram.ts/types").MessageEntity[]]>} An iterator over the message entities.
     */
    *[Symbol.iterator]() {
        yield* Object.entries({
            [this.searchText]: this.entities,
        });
    }
}
module.exports = { MessageEntities };
//# sourceMappingURL=MessageEntities.js.map