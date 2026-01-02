// @ts-check
const { Base } = require("../Base");
const { Sticker } = require("../media/Sticker");
const { isDeepStrictEqual } = require("../../util/Utils");

class UniqueGift extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UniqueGift} data - Data about unique gift that was upgraded from a regular gift.
   */
  constructor(client, data) {
    super(client);

    /** Identifier of the regular gift from which the gift was upgraded */
    this.id = data.gift_id;

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

    if ("is_premium" in data) {
      /** True, if the original regular gift was exclusively purchaseable by Telegram Premium subscribers */
      this.isPremium = data.is_premium;
    }

    if ("is_from_blockchain" in data) {
      /** True, if the gift is assigned from the TON blockchain and can't be resold or transferred in Telegram */
      this.isAuthorBlockchain = data.is_from_blockchain;
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

    if ("colors" in data) {
      /** The color scheme that can be used by the gift's owner for the chat's name, replies to messages and link previews */
      this.colors = {
        /** Custom emoji identifier of the unique gift's model */
        modelCustomEmojiId: data.colors.model_custom_emoji_id,
        /** Custom emoji identifier of the unique gift's symbol */
        symbolCustomEmojiId: data.colors.symbol_custom_emoji_id,
        /** Light theme colors */
        lightTheme: {
          /** Main color used in light theme; RGB format */
          mainColor: data.colors.light_theme_main_color,
          /** List of 1-3 additional colors used in light theme; RGB format */
          otherColors: data.colors.light_theme_other_colors,
        },
        /** Dark theme colors */
        darkTheme: {
          /** Main color used in dark theme; RGB format */
          mainColor: data.colors.dark_theme_main_color,
          /** List of 1-3 additional colors used in dark theme; RGB format */
          otherColors: data.colors.dark_theme_other_colors,
        },
      };
    }
  }

  /**
   * Checks if this unique gift is equal to another unique gift.
   * @param {UniqueGift} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of UniqueGift and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof UniqueGift)) return false;

    return (
      this.id === other.id &&
      this.baseName === other.baseName &&
      this.name === other.name &&
      this.isPremium === other.isPremium &&
      this.isAuthorBlockchain === other.isAuthorBlockchain &&
      this.number === other.number &&
      isDeepStrictEqual(this.model, other.model) &&
      isDeepStrictEqual(this.symbol, other.symbol) &&
      isDeepStrictEqual(this.backdrop, other.backdrop) &&
      isDeepStrictEqual(this.colors, other.colors)
    );
  }
}

module.exports = { UniqueGift };
