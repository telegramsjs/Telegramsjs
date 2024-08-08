const { Base } = require("../Base");
const { Photo } = require("../media/Photo");
const { Animation } = require("../media/Animation");
const { MessageEntities } = require("../message/MessageEntities");

/**
 * @typedef {import("../message/Message").Message} Message
 */

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

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

  /**
   * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned.
   * @param {string | number} userId - User identifier
   * @param {number} score - New score, must be non-negative
   * @param {Omit<MethodParameters["setGameScore"], "userId" | "score">} [options={}] - out parameters
   * @return {Promise<Message & { game: Game; editedTimestamp: number; }>} - On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
   */
  setScore(userId, score, options = {}) {
    return this.client.setGameScore({
      userId,
      score,
      ...options,
    });
  }

  /**
   * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game.
   * @param {string | number} userId - Target user id
   * @param {Omit<MethodParameters["getGameHighScores"], "userId">} [options={}] - out parameters
   * @return {Promise<import("./GameHighScore").GameHighScore[]>} -  Returns an Array of GameHighScore objects.
   * This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
   */
  getHighScores(userId, options = {}) {
    return this.client.getGameHighScores({
      userId,
      ...options,
    });
  }
}

module.exports = { Game };
