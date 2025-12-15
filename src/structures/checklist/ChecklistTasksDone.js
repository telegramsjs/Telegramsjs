// @ts-check
const { Base } = require("../Base");
const { Message } = require("../message/Message");

class ChecklistTasksDone extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChecklistTasksDone} data - Data about a service message about checklist tasks marked as done or not done.
   */
  constructor(client, data) {
    super(client);

    if ("checklist_message" in data) {
      /**
       * Message containing the checklist whose tasks were marked as done or not done
       * @type {import("../message/Message").Message | undefined}
       */
      this.checklistMessage = new Message(client, data.checklist_message);
    }

    if ("marked_as_done_task_ids" in data) {
      /** Identifiers of the tasks that were marked as done */
      this.markedAsDoneTaskIds = data.marked_as_done_task_ids;
    }

    if ("marked_as_not_done_task_ids" in data) {
      /** Identifiers of the tasks that were marked as not done */
      this.markedAsNotDoneTaskIds = data.marked_as_not_done_task_ids;
    }
  }

  /**
   * Get all affected task IDs
   * @type {number[]}
   */
  get allAffectedTaskIds() {
    return [
      ...(this.markedAsDoneTaskIds || []),
      ...(this.markedAsNotDoneTaskIds || []),
    ];
  }

  /**
   * Get total number of tasks affected
   * @type {number}
   */
  get totalAffectedTasks() {
    return this.allAffectedTaskIds.length;
  }

  /**
   * Get number of tasks marked as done
   * @type {number}
   */
  get doneTasksCount() {
    return this.markedAsDoneTaskIds?.length || 0;
  }

  /**
   * Get number of tasks marked as not done
   * @type {number}
   */
  get notDoneTasksCount() {
    return this.markedAsNotDoneTaskIds?.length || 0;
  }
}

module.exports = { ChecklistTasksDone };
