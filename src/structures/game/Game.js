const { Base } = require("../Base");
const { Photo } = require("../media/Photo");
const { Animation } = require("../media/Animation");
const { MessageEntities } = require("../message/MessageEntities");

class Game extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Game} data - Data about the represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers
   */
  constructor(client, data) {
    super(client);

    /** Title of the game */
    this.title = data.title;

    /** Description of the game */
    this.description = data.description;

    /** Photo that will be displayed in the game message in chats */
    this.photo = data.photo.map((photo) => new Photo(client, photo));

    /** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters */
    this.text = data.text;

    /** Special entities that appear in text, such as usernames, URLs, bot commands, etc */
    this.entities = new MessageEntities(data.text, data.text_entities);

    /** Animation that will be displayed in the game message in chats. Upload via BotFather */
    this.animation = new Animation(client, data.animation);
  }
}

module.exports = { Game };
