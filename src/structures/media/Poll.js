const { Base } = require("../Base");
const { MessageEntities } = require("../message/MessageEntities");

class Poll extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient} client - The client that instantiated this
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
    this.anonymous = Boolean(data.anonymous);

    /** Poll type, currently can be “regular” or “quiz” */
    this.type = data.type;

    /** True, if the poll allows multiple answers */
    this.allowAnswers = data.allows_multiple_answers;

    this._patch(data);
  }

  _patch(data) {
    if ("question_entities" in data) {
      /**
       * Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions
       * @type {MessageEntities | undefined}
       */
      this.questionEntities = new MessageEntities(
        this.question,
        data.question_entities,
      );
    }

    if ("options" in data) {
      const options = [];

      if (Array.isArray(data.options)) {
        for (const opts of data.options) {
          if ("text_entities" in options) {
            opts.entities = new MessageEntities(opts.text, opts.text_entities);
            delete opts["text_entities"];
          }
          opts.voterCount = opts.voter_count;
          delete opts["voter_count"];
          options.push(opts);
        }
      }

      /**
       * @typedef {Object} PollOptions
       * @property {string} text - Option text, 1-100 characters
       * @property {MessageEntities} entities - Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
       * @property {number} voterCount - Number of users that voted for this option
       */

      /**
       * List of poll options
       * @type {PollOptions | undefined}
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
      this.closeTimestamp = data.close_date;
    }

    return data;
  }
  /**
   * Point in time when the poll will be automatically closed
   * @type {Date}
   */
  get closedAt() {
    return new Date(this.closeTimestamp);
  }
}

module.exports = { Poll };
