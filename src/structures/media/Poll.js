const { Base } = require("../Base");
const { MessageEntities } = require("../MessageEntities");

class Poll extends Base {
  constructor(client, data) {
    super(client, data);
    this.id = data.id;

    this.question = data.question;

    this.totalVoterCount = data.total_voter_count;

    this.closed = data.is_closed;

    this.anonymous = Boolean(data.anonymous);

    this.type = data.type;

    this.allowAnswers = data.allows_multiple_answers;

    this._patch(data);
  }

  _patch(data) {
    if ("question_entities" in data) {
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

      this.options = options;
    }

    if ("correct_option_id" in data) {
      this.correctId = data.correct_option_id;
    }

    if ("explanation" in data) {
      this.explanation = data.explanation;
      if ("explanation_entities" in data) {
        this.explanationEntities = new MessageEntities(
          data.explanation,
          data.explanation_entities,
        );
      }
    }

    if ("open_period" in data) {
      this.openPeriod = data.open_period;
    }

    if ("close_date" in data) {
      this.closeTimestamp = data.close_date;
    }
  }

  get closedAt() {
    return this.closeTimestamp ? new Date(this.closeTimestamp) : null;
  }
}

module.exports = { Poll };
