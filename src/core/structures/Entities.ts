import type { MessageEntity } from "@telegram.ts/types";

/**
 * Represents a search result for a specific message entity type.
 */
interface ISearchResult {
  /** The index of the entity. */
  index: number;
  /** The starting offset of the entity. */
  offset: number;
  /** The length of the entity. */
  length: number;
  /** The text that matches the entity. */
  search: string;
}

/**
 * Represents a type of message entity for searching.
 */
type SearchEntityType =
  | "mention"
  | "hashtag"
  | "cashtag"
  | "bot_command"
  | "url"
  | "email"
  | "phone_number"
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "spoiler"
  | "blockquote"
  | "code";

/**
 * A class to facilitate searching for message entities within a text.
 */
class Entities {
  /**
   * Creates an instance of Entities.
   * @param searchText - The text to search within.
   * @param entities - An array of message entities to search for.
   */
  constructor(
    private readonly searchText: string,
    private readonly entities: MessageEntity[],
  ) {}

  /**
   * Retrieves all mention entities found in the text.
   * @returns An array of mention search results.
   */
  get mention(): ISearchResult[] {
    return this.searchEntity("mention");
  }

  /**
   * Retrieves all hashtag entities found in the text.
   * @returns An array of hashtag search results.
   */
  get hashtag(): ISearchResult[] {
    return this.searchEntity("hashtag");
  }

  /**
   * Retrieves all cashtag entities found in the text.
   * @returns An array of cashtag search results.
   */
  get cashtag(): ISearchResult[] {
    return this.searchEntity("cashtag");
  }

  /**
   * Retrieves all bot command entities found in the text.
   * @returns An array of bot command search results.
   */
  get botCommand(): ISearchResult[] {
    return this.searchEntity("bot_command");
  }

  /**
   * Retrieves all URL entities found in the text.
   * @returns An array of URL search results.
   */
  get url(): ISearchResult[] {
    return this.searchEntity("url");
  }

  /**
   * Retrieves all email entities found in the text.
   * @returns An array of email search results.
   */
  get email(): ISearchResult[] {
    return this.searchEntity("email");
  }

  /**
   * Retrieves all phone number entities found in the text.
   * @returns An array of phone number search results.
   */
  get phoneNumber(): ISearchResult[] {
    return this.searchEntity("phone_number");
  }

  /**
   * Retrieves all bold text entities found in the text.
   * @returns An array of bold text search results.
   */
  get bold(): ISearchResult[] {
    return this.searchEntity("bold");
  }

  /**
   * Retrieves all italic text entities found in the text.
   * @returns An array of italic text search results.
   */
  get italic(): ISearchResult[] {
    return this.searchEntity("italic");
  }

  /**
   * Retrieves all underline text entities found in the text.
   * @returns An array of underline text search results.
   */
  get underline(): ISearchResult[] {
    return this.searchEntity("underline");
  }

  /**
   * Retrieves all strikethrough text entities found in the text.
   * @returns An array of strikethrough text search results.
   */
  get strikethrough(): ISearchResult[] {
    return this.searchEntity("strikethrough");
  }

  /**
   * Retrieves all spoiler text entities found in the text.
   * @returns An array of spoiler text search results.
   */
  get spoiler(): ISearchResult[] {
    return this.searchEntity("spoiler");
  }

  /**
   * Retrieves all blockquote entities found in the text.
   * @returns An array of blockquote search results.
   */
  get blockquote(): ISearchResult[] {
    return this.searchEntity("blockquote");
  }

  /**
   * Retrieves all code entities found in the text.
   * @returns An array of code search results.
   */
  get code(): ISearchResult[] {
    return this.searchEntity("code");
  }

  /**
   * Searches for a specific type of entity within the text.
   * @param searchType - The type of entity to search for.
   * @returns An array of search results for the specified entity type.
   */
  private searchEntity(searchType: SearchEntityType): ISearchResult[] {
    const entities: ISearchResult[] = [];
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
   * Iterates over each entity within the text.
   * @returns An iterator of key-value pairs where the key is the original text and the value is an array of message entities.
   */
  *[Symbol.iterator](): IterableIterator<[string, MessageEntity[]]> {
    yield* Object.entries({
      [this.searchText]: this.entities,
    });
  }
}

export { Entities, SearchEntityType, ISearchResult };
