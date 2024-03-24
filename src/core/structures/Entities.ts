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

interface ISearchResult {
  result: { index: number; offset: number; length: number; search: string }[];
  hasEntities: () => boolean;
}

class Entities {
  constructor(
    private readonly searchText: string,
    private readonly entities: MessageEntity[],
  ) {}

  get mention(): ISearchResult {
    return this.searchEntity("mention");
  }

  get hashtag(): ISearchResult {
    return this.searchEntity("hashtag");
  }

  get cashtag(): ISearchResult {
    return this.searchEntity("cashtag");
  }

  get botCommand(): ISearchResult {
    return this.searchEntity("bot_command");
  }

  get url(): ISearchResult {
    return this.searchEntity("url");
  }

  get email(): ISearchResult {
    return this.searchEntity("email");
  }

  get phoneNumber(): ISearchResult {
    return this.searchEntity("phone_number");
  }

  get bold(): ISearchResult {
    return this.searchEntity("bold");
  }

  get italic(): ISearchResult {
    return this.searchEntity("italic");
  }

  get underline(): ISearchResult {
    return this.searchEntity("underline");
  }

  get strikethrough(): ISearchResult {
    return this.searchEntity("strikethrough");
  }

  get spoiler(): ISearchResult {
    return this.searchEntity("spoiler");
  }

  get blockquote(): ISearchResult {
    return this.searchEntity("blockquote");
  }

  get code(): ISearchResult {
    return this.searchEntity("code");
  }

  private searchEntity(searchType: SearchEntityType): ISearchResult {
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

export { Entities, SearchEntityType, ISearchResult };
