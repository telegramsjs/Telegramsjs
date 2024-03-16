import { Api } from "./api";
import { Context } from "./core/context";
import type { Update } from "@telegram.ts/types";
import type { MethodParameters } from "./core/types";
import { TelegramTypeError, DefaultParameters } from "./core/util";
import { type EventKeysFunctions, EventAvaliableUpdates } from "./core/events";

class TelegramBot extends Api {
  offset: number = 0;
  #connect: boolean = true;
  
  constructor(authToken: string) {
    if (!authToken) {
      throw new TelegramTypeError("Specify a token to receive updates from Telegram");
    }
    super(authToken);
  }

  disconnect(connect?: boolean) {
    if (!connect) {
      this.#connect = true;
    } else {
      this.#connect = false;
      this.emit("disconnect");
    }
  }

  async login(options: MethodParameters["getUpdates"] = DefaultParameters) {
    this.getMe()
      .then((res) => {
        this.emit("ready", res);
      })
      .catch((err) => {
        throw err;
      });
    while (this.#connect) {
      const updates = await this.getUpdates({ ...options, offset: this.offset });

      for (const update of updates) {
        for (const [type, options] of Object.entries(EventAvaliableUpdates)) {
          const updateProperty = update as any;

          if (updateProperty[options.event]) {
            this.emit("update", update);
            const context = new Context(
              this,
              update,
              updateProperty[options.event],
            );
            this.emit(options.event as EventKeysFunctions, context);

            const optionEvent =
              "properties" in options ? options.properties : [];

            for (const properties of optionEvent) {
              if (properties.event && updateProperty?.[properties.name]) {
                this.emit(properties.event as EventKeysFunctions, context);
              }
            }
          }
        }
        this.offset = update.update_id + 1;
      }
    }
  }
}

export { TelegramBot };
