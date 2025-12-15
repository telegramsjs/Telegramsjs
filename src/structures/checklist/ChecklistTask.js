// @ts-check
const { Base } = require("../Base");
const { MessageEntities } = require("../message/MessageEntities");

class ChecklistTask extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChecklistTask} data - Data about a task in a checklist.
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the task */
    this.id = data.id;

    /** Text of the task */
    this.text = data.text;

    if ("text_entities" in data) {
      /** Special entities that appear in the task text */
      this.entities = new MessageEntities(
        client,
        this.text,
        data.text_entities,
      );
    }

    if ("completed_by_user" in data) {
      /**
       * User that completed the task; omitted if the task wasn't completed
       * @type {import("../misc/User").User | undefined}
       */
      this.completedByUser = client.users._add(data.completed_by_user);
    }

    if ("completion_date" in data) {
      /** Point in time (Unix timestamp) when the task was completed; 0 if the task wasn't completed */
      this.completionUnixTime = data.completion_date;
    }
  }

  /**
   * Return the timestamp task was completed, in milliseconds
   */
  get completionTimestamp() {
    return this.completionUnixTime ? this.completionUnixTime * 1000 : null;
  }

  /**
   * Date the task was completed
   * @type {null | Date}
   */
  get completedAt() {
    return this.completionTimestamp ? new Date(this.completionTimestamp) : null;
  }

  /**
   * True if the task is completed
   * @type {boolean}
   */
  get isCompleted() {
    return Boolean(this.completionUnixTime && this.completionUnixTime > 0);
  }
}

module.exports = { ChecklistTask };
