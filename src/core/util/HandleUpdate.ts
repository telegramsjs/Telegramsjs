import { ApiContext } from "../context";
import type { ServerResponse } from "node:http";
import type { TelegramBot } from "../../client";
import type { Update } from "@telegram.ts/types";
import { type EventKeysFunctions, EventAvaliableUpdates } from "../events";

/**
 * Handles incoming updates and emits corresponding events.
 * @param telegram - The TelegramBot instance.
 * @param updates - An array of updates to handle.
 * @param webhookResponse - The server response if the updates were received via webhook.
 * @returns The ID of the next update to handle.
 */
function handleUpdate(
  telegram: TelegramBot,
  updates: Update[],
  webhookResponse?: ServerResponse,
) {
  for (const update of updates) {
    for (const [type, options] of Object.entries(EventAvaliableUpdates)) {
      const updateProperty = update as any;

      if (updateProperty[options.event]) {
        telegram.emit("update", update);
        const context = new ApiContext(
          telegram,
          update,
          updateProperty[options.event],
        );
        telegram.emit(options.event as EventKeysFunctions, context);

        const optionEvent = "properties" in options ? options.properties : [];

        for (const properties of optionEvent) {
          if (
            properties.event &&
            properties.name in updateProperty[options.event]
          ) {
            telegram.emit(properties.event as EventKeysFunctions, context);
          }
        }
      }
    }
    if (webhookResponse?.writableEnded === false) {
      webhookResponse.end();
    }
    return update.update_id + 1;
  }
}

export { handleUpdate };
