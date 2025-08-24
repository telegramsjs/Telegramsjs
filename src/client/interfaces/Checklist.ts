import type { MessageEntity } from "./Message";
import type { ParseMode } from "@telegram.ts/types";

/** Describes a task to add to a checklist. */
export interface InputChecklistTask {
  /** Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist */
  id: number;
  /** Text of the task; 1-100 characters after entities parsing */
  text: string;
  /** Mode for parsing entities in the text. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the text, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are allowed. */
  text_entities?: MessageEntity[];
}

/** Describes a checklist to create. */
export interface InputChecklist {
  /** Title of the checklist; 1-255 characters after entities parsing */
  title: string;
  /** Mode for parsing entities in the title. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the title, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are allowed. */
  title_entities?: MessageEntity[];
  /** List of 1-30 tasks in the checklist */
  tasks: InputChecklistTask[];
  /** Pass True if other users can add tasks to the checklist */
  others_can_add_tasks?: boolean;
  /** Pass True if other users can mark tasks as done or not done in the checklist */
  others_can_mark_tasks_as_done?: true;
}
