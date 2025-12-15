// @ts-check
const { Base } = require("../Base");
const { Sticker } = require("../media/Sticker");

class UniqueGift extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UniqueGift} data - Data about unique gift that was upgraded from a regular gift.
   */
  constructor(client, data) {
    super(client);

    /** Human-readable name of the regular gift from which this unique gift was upgraded */
    this.baseName = data.base_name;

    /** Unique name of the gift. This name can be used in https://t.me/nft/... links and story areas */
    this.name = data.name;

    if ("publisher_chat" in data) {
      /**
       * Information about the chat that published the gift
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.publisherChat = this.client.chats._add(data.publisher_chat);
    }

    /** Unique number of the upgraded gift among gifts upgraded from the same regular gift */
    this.number = data.number;

    /** Model of the gift */
    this.model = {
      /** Name of the model */
      name: data.model.name,
      /** The sticker that represents the unique gift */
      sticker: new Sticker(client, data.model.sticker),
      /** The number of unique gifts that receive this model for every 1000 gifts upgraded */
      rarityPerMille: data.model.rarity_per_mille,
    };

    /** Symbol of the gift */
    this.symbol = {
      /** Name of the model */
      name: data.symbol.name,
      /** The sticker that represents the unique gift */
      sticker: new Sticker(client, data.symbol.sticker),
      /** The number of unique gifts that receive this model for every 1000 gifts upgraded */
      rarityPerMille: data.symbol.rarity_per_mille,
    };

    /** Backdrop of the gift */
    this.backdrop = {
      /** Name of the backdrop */
      name: data.backdrop.name,
      /** Colors of the backdrop */
      colors: {
        /** The color in the center of the backdrop in RGB format */
        center: data.backdrop.colors.center_color,
        /** The color on the edges of the backdrop in RGB format */
        edge: data.backdrop.colors.edge_color,
        /** The color to be applied to the symbol in RGB format */
        symbol: data.backdrop.colors.symbol_color,
        /** The color for the text on the backdrop in RGB format */
        text: data.backdrop.colors.text_color,
      },
      /** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
      rarityPerMille: data.backdrop.rarity_per_mille,
    };
  }
}

module.exports = { UniqueGift };
