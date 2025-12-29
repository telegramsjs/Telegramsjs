// @ts-check
const { Base } = require("../Base");
const { Message } = require("../message/Message");
const { ChecklistTask } = require("./ChecklistTask");

class ChecklistTasksAdded extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChecklistTasksAdded} data - Data about a service message about tasks added to a checklist.
   */
  constructor(client, data) {
    super(client);

    if ("checklist_message" in data) {
      /**
       * Message containing the checklist to which the tasks were added
       * @type {import("../message/Message").Message | undefined}
       */
      this.checklistMessage = new Message(client, data.checklist_message);
    }

    /** List of tasks added to the checklist */
    this.tasks = data.tasks.map((task) => new ChecklistTask(client, task));
  }

  /**
   * Get number of tasks added
   * @type {number}
   */
  get addedTasksCount() {
    return this.tasks.length;
  }

  /**
   * Get task IDs that were added
   * @type {number[]}
   */
  get addedTaskIds() {
    return this.tasks.map((task) => task.id);
  }

  /**
   * Get task by ID
   * @param {number} id - Task ID
   * @returns {ChecklistTask | null}
   */
  getTaskById(id) {
    return this.tasks.find((task) => task.id === id) || null;
  }

  /**
   * Get tasks by completion status
   * @param {boolean} completed - Whether to get completed or pending tasks
   * @returns {ChecklistTask[]}
   */
  getTasksByStatus(completed) {
    return this.tasks.filter((task) => task.isCompleted === completed);
  }

  /**
   * Get completed tasks from added tasks
   * @type {ChecklistTask[]}
   */
  get completedTasks() {
    return this.getTasksByStatus(true);
  }

  /**
   * Get pending tasks from added tasks
   * @type {ChecklistTask[]}
   */
  get pendingTasks() {
    return this.getTasksByStatus(false);
  }

  /**
   * Makes the class iterable, returning each check task list
   * @returns {IterableIterator<ChecklistTask>}
   */
  *[Symbol.iterator]() {
    yield* this.tasks;
  }
}

module.exports = { ChecklistTasksAdded };
