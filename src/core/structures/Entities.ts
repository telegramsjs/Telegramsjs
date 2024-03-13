import type { MessageEntity } from "@telegram.ts/types";

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

interface SearchResult {
  result: { index: number; offset: number; length: number; search: string }[];
  hasEntities: () => boolean;
}

class Entities {
  constructor(
    private readonly searchText: string,
    private readonly entities: MessageEntity[],
  ) {}

  get mention(): SearchResult {
    return this.searchEntity("mention");
  }

  get hashtag(): SearchResult {
    return this.searchEntity("hashtag");
  }

  get cashtag(): SearchResult {
    return this.searchEntity("cashtag");
  }

  get botCommand(): SearchResult {
    return this.searchEntity("bot_command");
  }

  get url(): SearchResult {
    return this.searchEntity("url");
  }

  get email(): SearchResult {
    return this.searchEntity("email");
  }

  get phoneNumber(): SearchResult {
    return this.searchEntity("phone_number");
  }

  get bold(): SearchResult {
    return this.searchEntity("bold");
  }

  get italic(): SearchResult {
    return this.searchEntity("italic");
  }

  get underline(): SearchResult {
    return this.searchEntity("underline");
  }

  get strikethrough(): SearchResult {
    return this.searchEntity("strikethrough");
  }

  get spoiler(): SearchResult {
    return this.searchEntity("spoiler");
  }

  get blockquote(): SearchResult {
    return this.searchEntity("blockquote");
  }

  get code(): SearchResult {
    return this.searchEntity("code");
  }

  searchEntity(searchType: SearchEntityType): SearchResult {
    const entities: {
      index: number;
      offset: number;
      length: number;
      search: string;
    }[] = [];
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
    return {
      result: entities,
      hasEntities: () => entities.length > 0,
    };
  }

  *[Symbol.iterator](): IterableIterator<[string, MessageEntity[]]> {
    yield* Object.entries({
      [this.searchText]: this.entities,
    });
  }
}

export { Entities, SearchEntityType, SearchResult };
