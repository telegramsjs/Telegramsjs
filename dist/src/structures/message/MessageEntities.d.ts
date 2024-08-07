/**
 * Represents a search result for a specific message entity type.
 */
export type SearchResult = {
    /**
     * - The index of the entity.
     */
    index: number;
    /**
     * - The starting offset of the entity.
     */
    offset: number;
    /**
     * - The length of the entity.
     */
    length: number;
    /**
     * - The text that matches the entity.
     */
    search: string;
};
/**
 * Represents a search result for a specific message entity type.
 * @typedef {Object} SearchResult
 * @property {number} index - The index of the entity.
 * @property {number} offset - The starting offset of the entity.
 * @property {number} length - The length of the entity.
 * @property {string} search - The text that matches the entity.
 */
export class MessageEntities {
    /**
     * Creates an instance of the MessageEntities class.
     * @param {string} searchText - The text to search within.
     * @param {import("@telegram.ts/types").MessageEntity[]} entities - The array of message entities.
     */
    constructor(searchText: string, entities: import("@telegram.ts/types").MessageEntity[]);
    searchText: string;
    entities: import("@telegram.ts/types").MessageEntity[];
    /**
     * Retrieves all mention entities from the message.
     * @returns {SearchResult[]} An array of objects representing mention entities.
     */
    get mention(): SearchResult[];
    /**
     * Retrieves all hashtag entities from the message.
     * @returns {SearchResult[]} An array of objects representing hashtag entities.
     */
    get hashtag(): SearchResult[];
    /**
     * Retrieves all cashtag entities from the message.
     * @returns {SearchResult[]} An array of objects representing cashtag entities.
     */
    get cashtag(): SearchResult[];
    /**
     * Retrieves all bot command entities from the message.
     * @returns {SearchResult[]} An array of objects representing bot command entities.
     */
    get botCommand(): SearchResult[];
    /**
     * Retrieves all URL entities from the message.
     * @returns {SearchResult[]} An array of objects representing URL entities.
     */
    get url(): SearchResult[];
    /**
     * Retrieves all email entities from the message.
     * @returns {SearchResult[]} An array of objects representing email entities.
     */
    get email(): SearchResult[];
    /**
     * Retrieves all phone number entities from the message.
     * @returns {SearchResult[]} An array of objects representing phone number entities.
     */
    get phoneNumber(): SearchResult[];
    /**
     * Retrieves all bold entities from the message.
     * @returns {SearchResult[]} An array of objects representing bold entities.
     */
    get bold(): SearchResult[];
    /**
     * Retrieves all italic entities from the message.
     * @returns {SearchResult[]} An array of objects representing italic entities.
     */
    get italic(): SearchResult[];
    /**
     * Retrieves all underline entities from the message.
     * @returns {SearchResult[]} An array of objects representing underline entities.
     */
    get underline(): SearchResult[];
    /**
     * Retrieves all strikethrough entities from the message.
     * @returns {SearchResult[]} An array of objects representing strikethrough entities.
     */
    get strikethrough(): SearchResult[];
    /**
     * Retrieves all spoiler entities from the message.
     * @returns {SearchResult[]} An array of objects representing spoiler entities.
     */
    get spoiler(): SearchResult[];
    /**
     * Retrieves all blockquote entities from the message.
     * @returns {SearchResult[]} An array of objects representing blockquote entities.
     */
    get blockquote(): SearchResult[];
    /**
     * Retrieves all code entities from the message.
     * @returns {SearchResult[]} An array of objects representing code entities.
     */
    get code(): SearchResult[];
    /**
     * Searches for a specific type of entity in the message.
     * @param {string} searchType - The type of entity to search for.
     * @returns {SearchResult[]} An array of objects representing the found entities.
     */
    searchEntity(searchType: string): SearchResult[];
    /**
     * Enables iteration over the message entities.
     * @returns {Generator<[string, import("@telegram.ts/types").MessageEntity[]]>} An iterator over the message entities.
     */
    [Symbol.iterator](): Generator<[string, import("@telegram.ts/types").MessageEntity[]]>;
}
//# sourceMappingURL=MessageEntities.d.ts.map