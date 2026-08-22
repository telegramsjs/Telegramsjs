// @ts-check
const { Base } = require("../../Base");
const { PollMedia } = require("./PollMedia");
const { MessageEntities } = require("../../message/MessageEntities");

class Poll extends Base {
  /**
   * @param {import("../../../client/TelegramClient").TelegramClient | import("../../../client/BaseClient").BaseClient} client - The client that instantiated this
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

    /** True, if the poll allows to change the chosen answer options */
    this.allowsRevoting = data.allows_revoting;

    /** True if voting is limited to users who have been members of the chat where the poll was originally sent for more than 24 hours */
    this.isOnlyMembers = data.members_only;

    if (data.country_codes) {
      /**
       * A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which users can vote in the poll. The country code “FT” is used for users with anonymous numbers. If omitted, then users from any country can participate in the poll.
       * @type {string[] | undefined}
       */
      this.countryCodes = data.country_codes;
    }

    if (data.correct_option_ids) {
      /**
       * Array of 0-based identifiers of the correct answer options. Available only for polls in quiz mode which are closed or were sent (not forwarded) by the bot or to the private chat with the bot.
       * @type {number[] | undefined}
       */
      this.correctOptionIds = data.correct_option_ids;
    }

    if (data.explanation_media) {
      /**
       * Media added to the quiz explanation
       * @type {PollMedia | undefined}
       */
      this.explanationMedia = new PollMedia(
        this.client,
        data.explanation_media,
      );
    }

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
       * @property {string} persistentId - Unique identifier of the option, persistent on option addition and deletion.
       * @property {string} text - Option text, 1-100 characters
       * @property {PollMedia|undefined} media - Media added to the poll option
       * @property {MessageEntities} entities - Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
       * @property {number} voterCount - Number of users who voted for this option; may be 0 if unknown.
       * @property {import("../../misc/user/User").User|undefined} addedUser - User who added the option; omitted if the option wasn't added by a user after poll creation.
       * @property {import("../../chat/Chat").Chat|undefined} addedChat - Chat that added the option; omitted if the option wasn't added by a chat after poll creation.
       * @property {number|undefined} additionUnixTime - Point in time (Unix timestamp) when the option was added; omitted if the option existed in the original poll.
       */

      /** @type {PollOptions[]} */
      const options = [];

      if (Array.isArray(data.options)) {
        for (const opts of data.options) {
          /** @type {PollOptions} */
          const result = {};

          result.persistentId = opts.persistent_id;

          result.text = opts.text;

          if (opts.media) {
            result.media = new PollMedia(this.client, opts.media);
          }

          if ("text_entities" in opts) {
            result.entities = new MessageEntities(
              this.client,
              opts.text,
              opts.text_entities,
            );
          }
          result.voterCount = opts.voter_count;

          if ("added_by_user" in opts) {
            result.addedUser = this.client.users._add(opts.added_by_user);
          }

          if ("added_by_chat" in opts) {
            result.addedChat = this.client.chats._add(opts.added_by_chat);
          }

          if ("addition_date" in opts) {
            result.additionUnixTime = opts.addition_date;
          }

          options.push(result);
        }
      }

      /**
       * List of poll options
       * @type {PollOptions[] | undefined}
       */
      this.options = options;

      if ("description" in data) {
        /**
         * Description of the poll; for polls inside the Message object only
         * @type {string | undefined}
         */
        this.description = data.description;

        if ("description_entities" in data) {
          /**
           * Special entities like usernames, URLs, bot commands, etc. that appear in the description
           * @type {MessageEntities | undefined}
           */
          this.descriptionEntities = new MessageEntities(
            this.client,
            data.description,
            data.description_entities,
          );
        }
      }

      /**
       * Media added to the poll description; for polls inside the Message object only
       * @type {PollMedia | undefined}
       */
      if ("media" in data) {
        this.media = new PollMedia(this.client, data.media);
      }
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
   * @property {import("../../../client/interfaces/Markup").InlineKeyboardMarkup} [replyMarkup] - An object for a new message inline keyboard.
   */

  /**
   * Use this method to stop a poll which was sent by the bot. ONLY BOT POLL
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (bot, supergroup or channel in the format @username).
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
