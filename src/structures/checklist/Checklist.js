// @ts-check
const { Base } = require("../Base");
const { ChecklistTask } = require("./ChecklistTask");
const { MessageEntities } = require("../message/MessageEntities");

class Checklist extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Checklist} data - Data about a checklist.
   */
  constructor(client, data) {
    super(client);

    /** Title of the checklist */
    this.title = data.title;

    if ("title_entities" in data && data.title_entities) {
      /** Special entities that appear in the checklist title */
      this.entities = new MessageEntities(
        client,
        this.title,
        data.title_entities,
      );
    }

    /** List of tasks in the checklist */
    this.tasks = data.tasks.map((task) => new ChecklistTask(client, task));

    if ("others_can_add_tasks" in data) {
      /** True, if users other than the creator of the list can add tasks to the list */
      this.othersCanAddTasks = data.others_can_add_tasks;
    }

    if ("others_can_mark_tasks_as_done" in data) {
      /** True, if users other than the creator of the list can mark tasks as done or not done */
      this.othersCanMarkTasksAsDone = data.others_can_mark_tasks_as_done;
    }
  }

  /**
   * Get completed tasks
   * @type {ChecklistTask[]}
   */
  get completedTasks() {
    return this.tasks.filter((task) => task.isCompleted);
  }

  /**
   * Get pending tasks
   * @type {ChecklistTask[]}
   */
  get pendingTasks() {
    return this.tasks.filter((task) => !task.isCompleted);
  }

  /**
   * Get total number of tasks
   * @type {number}
   */
  get totalTasks() {
    return this.tasks.length;
  }

  /**
   * Get number of completed tasks
   * @type {number}
   */
  get completedTasksCount() {
    return this.completedTasks.length;
  }

  /**
   * Makes the class iterable, returning each check task list
   * @returns {IterableIterator<ChecklistTask>}
   */
  *[Symbol.iterator]() {
    for (const task of this.tasks) {
      yield task;
    }
  }
}

module.exports = { Checklist };
