// @ts-check
const { Base } = require("../Base");
const { MessageEntities } = require("../message/MessageEntities");

class InputChecklistTask extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").InputChecklistTask} data - Data about a task to add to a checklist.
   */
  constructor(client, data) {
    super(client);

    /** Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist */
    this.id = data.id;

    /** Text of the task; 1-100 characters after entities parsing */
    this.text = data.text;

    if ("parse_mode" in data) {
      /**
       * Mode for parsing entities in the text. See formatting options for more details.
       * @type {import("@telegram.ts/types").ParseMode | undefined}
       */
      this.parseMode = data.parse_mode;
    }

    if ("text_entities" in data) {
      /**
       * List of special entities that appear in the text, which can be specified instead of parse_mode
       * @type {MessageEntities | undefined}
       */
      this.entities = new MessageEntities(
        client,
        this.text,
        data.text_entities,
      );
    }
  }
}

module.exports = { InputChecklistTask };
