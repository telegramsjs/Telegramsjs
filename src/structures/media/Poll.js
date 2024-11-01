// @ts-check
const { Base } = require("../Base");
const { MessageEntities } = require("../message/MessageEntities");

class Poll extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Poll} data - Data about the contains information about a poll
   */
  constructor(client, data) {
    super(client);

    /** Unique poll identifier */
    this.id = data.id;

    /** Poll question, 1-300 characters */
    this.question = data.question;

    /** Total number of users that voted in the poll */
    this.totalVoterCount = data.total_voter_count;

    /** True, if the poll is closed */
    this.closed = data.is_closed;

    /** True, if the poll is anonymous */
    this.anonymous = Boolean(data.is_anonymous);

    /** Poll type, currently can be “regular” or “quiz” */
    this.type = data.type;

    /** True, if the poll allows multiple answers */
    this.allowAnswers = data.allows_multiple_answers;

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").Poll} data - Data about the contains information about a poll
   * @override
   */
  _patch(data) {
    if ("question_entities" in data) {
      /**
       * Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions
       * @type {MessageEntities | undefined}
       */
      this.questionEntities = new MessageEntities(
        this.client,
        this.question,
        data.question_entities,
      );
    }

    if ("options" in data) {
      /**
       * @typedef {Object} PollOptions
       * @property {string} text - Option text, 1-100 characters
       * @property {MessageEntities} entities - Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
       * @property {number} voterCount - Number of users that voted for this option
       */

      /** @type {PollOptions[]} */
      const options = [];

      if (Array.isArray(data.options)) {
        for (const opts of data.options) {
          /** @type {PollOptions} */
          const result = {};

          result.text = opts.text;
          if ("text_entities" in opts) {
            result.entities = new MessageEntities(
              this.client,
              opts.text,
              opts.text_entities,
            );
          }
          result.voterCount = opts.voter_count;
          options.push(result);
        }
      }

      /**
       * List of poll options
       * @type {PollOptions[] | undefined}
       */
      this.options = options;
    }

    if ("correct_option_id" in data) {
      /**
       * 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot
       * @type {number | undefined}
       */
      this.correctId = data.correct_option_id;
    }

    if ("explanation" in data) {
      /**
       * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters
       * @type {string | undefined}
       */
      this.explanation = data.explanation;

      if ("explanation_entities" in data) {
        /**
         * Special entities like usernames, URLs, bot commands, etc. that appear in the explanation
         * @type {MessageEntities | undefined}
         */
        this.explanationEntities = new MessageEntities(
          this.client,
          data.explanation,
          data.explanation_entities,
        );
      }
    }

    if ("open_period" in data) {
      /**
       * Amount of time in seconds the poll will be active after creation
       * @type {number | undefined}
       */
      this.openPeriod = data.open_period;
    }

    if ("close_date" in data) {
      /**
       * Point in time (Unix timestamp) when the poll will be automatically closed
       * @type {number | undefined}
       */
      this.closeUnixTime = data.close_date;
    }

    return data;
  }

  /**
   * Return the timestamp poll will be automatically closed, in milliseconds
   */
  get closeTimestamp() {
    return this.closeUnixTime ? this.closeUnixTime * 1000 : null;
  }

  /**
   * Point in time when the poll will be automatically closed
   * @type {null | Date}
   */
  get closedAt() {
    return this.closeTimestamp ? new Date(this.closeTimestamp) : null;
  }

  /**
   * @typedef {Object} StopPoll
   * @property {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message to be edited was sent.
   * @property {import("../../client/interfaces/Markup").InlineKeyboardMarkup} [replyMarkup] - An object for a new message inline keyboard.
   */

  /**
   * Use this method to stop a poll which was sent by the bot. ONLY BOT POLL
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
   * @param {number | string} messageId -Identifier of the original message with the poll.
   * @param {StopPoll} [options] - options for stopping poll
   * @return {Promise<Omit<Poll, "close">>} On success, the stopped Poll is returned
   */
  close(chatId, messageId, { businessConnectionId, replyMarkup } = {}) {
    return this.client.stopPoll({
      chatId,
      messageId,
      ...(businessConnectionId && { businessConnectionId }),
      ...(replyMarkup && { replyMarkup }),
    });
  }
}

module.exports = { Poll };
