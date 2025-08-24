import { deepStrictEqual } from "node:assert";
import type { ParseMode } from "@telegram.ts/types";
import type { MessageEntity } from "../../client/interfaces/Message";
import type {
  InputChecklistTask,
  InputChecklist,
} from "../../client/interfaces/Checklist";

/**
 * Validation constants for checklist constraints
 */
const TITLE_MAX_LENGTH = 255;
const TASK_MAX_LENGTH = 100;
const MAX_TASKS = 30;
const MIN_TASKS = 1;

/**
 * Builder for creating Telegram checklist inputs
 * @example
 * ```ts
 * const checklist = new InputChecklistBuilder()
 *   .setTitle('My Checklist')
 *   .addTask('Task 1')
 *   .addTask('Task 2')
 *   .setOthersCanAddTasks(true);
 * ```
 */
class InputChecklistBuilder {
  private nextTaskId = 1;
  readonly data: Partial<InputChecklist>;

  constructor(data?: Partial<InputChecklist>) {
    this.data = {
      title: "",
      tasks: [],
      ...data,
    };

    if (this.data.tasks?.length) {
      const maxId = Math.max(...this.data.tasks.map((t) => t.id), 0);
      this.nextTaskId = maxId + 1;
    }
  }

  /**
   * Set the checklist title
   * @param title Title text (1-255 characters)
   * @param parseMode Optional parse mode
   * @param entities Optional title entities
   */
  setTitle(
    title: string,
    parseMode?: ParseMode,
    entities?: MessageEntity[],
  ): this {
    if (!title?.length || title.length > TITLE_MAX_LENGTH) {
      throw new RangeError(
        `Title must be 1-${TITLE_MAX_LENGTH} characters long`,
      );
    }

    this.data.title = title;
    if (parseMode !== undefined) this.data.parse_mode = parseMode;
    if (entities !== undefined) this.data.title_entities = entities;

    return this;
  }

  /**
   * Set the parse mode for the title
   * @param parseMode Parse mode to use
   */
  setParseMode(parseMode: ParseMode): this {
    this.data.parse_mode = parseMode;
    return this;
  }

  /**
   * Set title entities
   * @param entities Message entities for the title
   */
  setTitleEntities(entities: MessageEntity[]): this {
    this.data.title_entities = entities;
    return this;
  }

  /**
   * Add a single task to the checklist
   * @param text Task text (1-100 characters)
   * @param options Optional task configuration
   */
  addTask(
    text: string,
    options?: {
      id?: number;
      parseMode?: ParseMode;
      entities?: MessageEntity[];
    },
  ): this {
    if (!text?.length || text.length > TASK_MAX_LENGTH) {
      throw new RangeError(
        `Task text must be 1-${TASK_MAX_LENGTH} characters long`,
      );
    }

    if ((this.data.tasks?.length ?? 0) >= MAX_TASKS) {
      throw new RangeError(`Cannot exceed ${MAX_TASKS} tasks`);
    }

    const taskId = options?.id ?? this.nextTaskId;

    if (taskId <= 0) {
      throw new RangeError("Task ID must be positive");
    }

    if (this.data.tasks?.some((task) => task.id === taskId)) {
      throw new Error(`Task with ID ${taskId} already exists`);
    }

    if (taskId >= this.nextTaskId) {
      this.nextTaskId = taskId + 1;
    }

    const task: InputChecklistTask = { id: taskId, text };

    if (options?.parseMode !== undefined) task.parse_mode = options.parseMode;
    if (options?.entities !== undefined) task.text_entities = options.entities;

    this.data.tasks = [...(this.data.tasks ?? []), task];
    return this;
  }

  /**
   * Add multiple tasks at once
   * @param tasks Array of task definitions
   */
  addTasks(
    ...tasks: Array<
      | string
      | InputChecklistTask
      | {
          text: string;
          id?: number;
          parseMode?: ParseMode;
          entities?: MessageEntity[];
        }
    >
  ): this {
    for (const task of tasks) {
      if (typeof task === "string") {
        this.addTask(task);
      } else if ("parseMode" in task || "entities" in task) {
        const options: {
          id?: number;
          parseMode?: ParseMode;
          entities?: MessageEntity[];
        } = {};

        if (task.id !== undefined) options.id = task.id;
        if ("parseMode" in task && task.parseMode !== undefined)
          options.parseMode = task.parseMode;
        if ("entities" in task && task.entities !== undefined)
          options.entities = task.entities;

        this.addTask(task.text, options);
      } else {
        const inputTask = task as InputChecklistTask;
        const options: {
          id?: number;
          parseMode?: ParseMode;
          entities?: MessageEntity[];
        } = {};

        if (inputTask.id !== undefined) options.id = inputTask.id;
        if (inputTask.parse_mode !== undefined)
          options.parseMode = inputTask.parse_mode;
        if (inputTask.text_entities !== undefined)
          options.entities = inputTask.text_entities;

        this.addTask(inputTask.text, options);
      }
    }
    return this;
  }

  /**
   * Remove a task by ID
   * @param id Task ID to remove
   */
  removeTask(id: number): this {
    this.data.tasks = this.data.tasks?.filter((task) => task.id !== id) ?? [];
    return this;
  }

  /**
   * Update an existing task
   * @param id Task ID to update
   * @param updates Partial task updates
   */
  updateTask(
    id: number,
    updates: Partial<Omit<InputChecklistTask, "id">>,
  ): this {
    if (!this.data.tasks) return this;

    const taskIndex = this.data.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const currentTask = this.data.tasks[taskIndex]!;
    const updatedTask: InputChecklistTask = {
      id: currentTask.id,
      text: updates.text !== undefined ? updates.text : currentTask.text,
    };

    if (updates.parse_mode !== undefined) {
      updatedTask.parse_mode = updates.parse_mode;
    } else if (currentTask.parse_mode !== undefined) {
      updatedTask.parse_mode = currentTask.parse_mode;
    }

    if (updates.text_entities !== undefined) {
      updatedTask.text_entities = updates.text_entities;
    } else if (currentTask.text_entities !== undefined) {
      updatedTask.text_entities = currentTask.text_entities;
    }

    this.data.tasks[taskIndex] = updatedTask;
    return this;
  }

  /**
   * Clear all tasks
   */
  clearTasks(): this {
    this.data.tasks = [];
    this.nextTaskId = 1;
    return this;
  }

  /**
   * Set whether others can add tasks
   * @param canAdd Whether others can add tasks
   */
  setOthersCanAddTasks(canAdd = true): this {
    this.data.others_can_add_tasks = canAdd;
    return this;
  }

  /**
   * Set whether others can mark tasks as done
   * @param canMark Whether others can mark tasks as done
   */
  setOthersCanMarkTasksAsDone(canMark = true): this {
    if (canMark === false) {
      return this;
    }
    this.data.others_can_mark_tasks_as_done = true;
    return this;
  }

  /**
   * Get a task by ID
   * @param id Task ID to find
   */
  getTask(id: number): InputChecklistTask | undefined {
    return this.data.tasks?.find((task) => task.id === id);
  }

  /**
   * Get all tasks
   */
  getTasks(): readonly InputChecklistTask[] {
    return [...(this.data.tasks ?? [])];
  }

  /**
   * Get task count
   */
  getTaskCount(): number {
    return this.data.tasks?.length ?? 0;
  }

  /**
   * Create a deep clone of this builder
   */
  clone(): InputChecklistBuilder {
    return new InputChecklistBuilder(JSON.parse(JSON.stringify(this.data)));
  }

  /**
   * Merge tasks from another source
   * @param source Source of tasks to merge
   */
  merge(
    source: InputChecklistBuilder | InputChecklist | InputChecklistTask[],
  ): this {
    let tasks: InputChecklistTask[];

    if (source instanceof InputChecklistBuilder) {
      tasks = source.data.tasks ?? [];
    } else if (Array.isArray(source)) {
      tasks = source;
    } else {
      tasks = source.tasks ?? [];
    }

    for (const task of tasks) {
      const options: { parseMode?: ParseMode; entities?: MessageEntity[] } = {};

      if (task.parse_mode !== undefined) options.parseMode = task.parse_mode;
      if (task.text_entities !== undefined)
        options.entities = task.text_entities;

      this.addTask(task.text, options);
    }

    return this;
  }

  /**
   * Convert to API-ready JSON format
   * @throws Error if validation fails
   */
  toJSON(): InputChecklist {
    const { title, tasks } = this.data;

    if (!title?.length || title.length > TITLE_MAX_LENGTH) {
      throw new Error(`Title must be 1-${TITLE_MAX_LENGTH} characters long`);
    }

    if (!tasks?.length || tasks.length > MAX_TASKS) {
      throw new Error(`Checklist must have ${MIN_TASKS}-${MAX_TASKS} tasks`);
    }

    const taskIds = new Set<number>();
    for (const task of tasks) {
      if (task.id <= 0) {
        throw new Error(`Task ID must be positive, got ${task.id}`);
      }

      if (taskIds.has(task.id)) {
        throw new Error(`Duplicate task ID: ${task.id}`);
      }
      taskIds.add(task.id);

      if (!task.text?.length || task.text.length > TASK_MAX_LENGTH) {
        throw new Error(
          `Task text must be 1-${TASK_MAX_LENGTH} characters long`,
        );
      }
    }

    const result: InputChecklist = {
      title: this.data.title!,
      tasks: this.data.tasks!,
    };

    if (this.data.parse_mode !== undefined) {
      result.parse_mode = this.data.parse_mode;
    }
    if (this.data.title_entities !== undefined) {
      result.title_entities = this.data.title_entities;
    }
    if (this.data.others_can_add_tasks !== undefined) {
      result.others_can_add_tasks = this.data.others_can_add_tasks;
    }
    if (this.data.others_can_mark_tasks_as_done !== undefined) {
      result.others_can_mark_tasks_as_done =
        this.data.others_can_mark_tasks_as_done;
    }

    return result;
  }

  /**
   * Check equality with another checklist
   * @param other Other checklist to compare
   */
  equals(other: InputChecklistBuilder | InputChecklist): boolean {
    if (!other) return false;

    try {
      const otherData =
        other instanceof InputChecklistBuilder ? other.data : other;
      const thisData = this.data;

      const normalizeData = (
        data: Partial<InputChecklist> | InputChecklist,
      ) => ({
        title: data.title,
        parse_mode: data.parse_mode,
        title_entities: data.title_entities,
        tasks: data.tasks ? [...data.tasks].sort((a, b) => a.id - b.id) : [],
        others_can_add_tasks: data.others_can_add_tasks,
        others_can_mark_tasks_as_done: data.others_can_mark_tasks_as_done,
      });

      const normalizedThis = normalizeData(thisData);
      const normalizedOther = normalizeData(otherData);

      deepStrictEqual(normalizedThis, normalizedOther);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Create builder from existing checklist
   * @param source Source checklist or builder
   */
  static from(
    source: InputChecklistBuilder | InputChecklist,
  ): InputChecklistBuilder {
    if (source instanceof InputChecklistBuilder) {
      return source.clone();
    }
    return new InputChecklistBuilder(source);
  }

  /**
   * Create a task object
   * @param text Task text
   * @param id Task ID
   * @param options Optional task configuration
   */
  static createTask(
    text: string,
    id: number,
    options?: {
      parseMode?: ParseMode;
      entities?: MessageEntity[];
    },
  ): InputChecklistTask {
    if (!text?.length || text.length > TASK_MAX_LENGTH) {
      throw new RangeError(
        `Task text must be 1-${TASK_MAX_LENGTH} characters long`,
      );
    }

    if (id <= 0) {
      throw new RangeError("Task ID must be positive");
    }

    const task: InputChecklistTask = { id, text };

    if (options?.parseMode !== undefined) task.parse_mode = options.parseMode;
    if (options?.entities !== undefined) task.text_entities = options.entities;

    return task;
  }
}

export { InputChecklistBuilder };
