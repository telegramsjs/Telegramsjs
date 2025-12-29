// @ts-check
const { Base } = require("../Base");
const { ChecklistTask } = require("./ChecklistTask");
const { MessageEntities } = require("../message/MessageEntities");
const { Collection } = require("@telegram.ts/collection");

/**
 * Type guard for completed tasks
 * @param {ChecklistTask} task
 * @returns {task is ChecklistTask & { completionUnixTime: number; completionTimestamp: number; isCompleted: true; completedByUser: import("../misc/User").User }}
 */
function isCompletedTask(task) {
  return task.isCompleted === true;
}

/**
 * Type guard for pending tasks
 * @param {ChecklistTask} task
 * @returns {task is ChecklistTask & { completionUnixTime: undefined; completionTimestamp: undefined; isCompleted: false; completedByUser: undefined }}
 */
function isPendingTask(task) {
  return task.isCompleted === false;
}

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

    /**
     * Collection of tasks in the checklist
     * @type {import("@telegram.ts/collection").ReadonlyCollection<number, ChecklistTask>}
     */
    this.tasks = new Collection(
      data.tasks.map((task, index) => [index, new ChecklistTask(client, task)]),
    );

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
   * @type {import("@telegram.ts/collection").ReadonlyCollection<number, ChecklistTask & { completionUnixTime: number; completionTimestamp: number; isCompleted: true; completedByUser: import("../misc/User").User }>}
   */
  get completedTasks() {
    return this.tasks.filter(isCompletedTask);
  }

  /**
   * Get pending tasks
   * @type {import("@telegram.ts/collection").ReadonlyCollection<number, ChecklistTask & { completionUnixTime: undefined; completionTimestamp: undefined; isCompleted: false; completedByUser: undefined }>}
   */
  get pendingTasks() {
    return this.tasks.filter(isPendingTask);
  }

  /**
   * Get total number of tasks
   * @type {number}
   */
  get totalTasks() {
    return this.tasks.size;
  }

  /**
   * Get number of completed tasks
   * @type {number}
   */
  get completedTasksCount() {
    return this.completedTasks.size;
  }

  /**
   * Makes the class iterable, returning each check task list
   * @returns {IterableIterator<ChecklistTask>}
   */
  *[Symbol.iterator]() {
    yield* this.tasks.values();
  }
}

module.exports = { Checklist };
