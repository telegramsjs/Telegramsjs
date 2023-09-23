interface KeyboardOptions {
  keyboard: string[][];
  resize_keyboard: boolean;
  one_time_keyboard: boolean;
  selective?: boolean;
  input_field_placeholder?: string;
  remove_keyboard?: boolean;
}

class Keyboard {
  buttons: string[][] = [[]];
  isOneTime: boolean = false;
  isResize: boolean = false;
  placeholderText: string | undefined;
  isSelective: boolean | undefined;
  isRemoveKeyboard: boolean | undefined = false;

  constructor(
    options: KeyboardOptions = {
      keyboard: [[]],
      one_time_keyboard: false,
      resize_keyboard: false,
    },
  ) {
    this.buttons = options.keyboard;
    this.isResize = options.resize_keyboard;
    this.isOneTime = options.one_time_keyboard;
    this.isSelective = options.selective;
    this.placeholderText = options.input_field_placeholder;
    this.isRemoveKeyboard = options.remove_keyboard;
  }
  /**
   * Adds buttons to the current row of the keyboard.
   * ```ts
   * const menu1 = new Keyboard()
   * .keyboard("🥇")
   * .keyboard("🥈")
   * .keyboard("🥉")
   * .build()
   *
   * const menu2 = new Keyboard()
   * .keyboard(["🥇", "🥈", "🥉"])
   * .build()
   *
   * bot.command("keyboard", (ctx) => {
   *  ctx.reply("Keyboard create", {
   *   reply_markup: menu1
   *  });
   * });
   * ```
   * @param {string | string[]} buttons - An array of button labels to be added.
   * @returns The instance of the Keyboard.
   */
  keyboard(buttons: string | string[]): this {
    if (Array.isArray(buttons)) {
      this.buttons[this.buttons.length - 1] = [...buttons];
    } else {
      this.buttons[this.buttons.length - 1].push(buttons);
    }
    return this;
  }

  /**
   * Creates a new row in the keyboard for arranging buttons.
   * ```ts
   * const menu = new Keyboard()
   * .keyboard("🥇").row()
   * .keyboard("🥈").row()
   * .keyboard("🥉")
   * .resize()
   * .build()
   *
   * bot.command("keyboard", (ctx) => {
   *  ctx.reply("Keyboard create", {
   *   reply_markup: menu
   *  });
   * });
   * ```
   * @returns {Keyboard} - The instance of the Keyboard.
   */
  row(): this {
    this.buttons.push([]);
    return this;
  }

  /**
   * Sorts buttons in each row alphabetically.
   * @returns {Keyboard} - The instance of the Keyboard.
   */
  sort(): this {
    this.buttons = this.buttons.map((row) => row.sort());
    return this;
  }

  /**
   * Creates a KeyboardOptions object based on the provided parameters.
   * ```ts
   * const fromKeyboard = Keyboard.from([["a", "b"], ["c"]], {
   *  isResize: true
   * });
   *
   * bot.command("from", (ctx) => {
   *  ctx.reply("From keyboard", {
   *    reply_markup: fromKeyboard
   *   });
   * });
   * ```
   * @param buttons - An array of button arrays that define the keyboard layout.
   * @param options - An object containing various keyboard options.
   *   @property {boolean} resize_keyboard - Whether the keyboard should be resizable.
   *   @property {boolean} one_time_keyboard - Whether the keyboard should be shown only once.
   *   @property {boolean} selective - Whether the keyboard should be selective for certain users.
   *   @property {string} input_field_placeholder - Placeholder text for the input field.
   *   @property {boolean} remove_keyboard - Whether the keyboard should be removed.
   * @returns {KeyboardOptions} A KeyboardOptions object with the specified configuration.
   */
  static from(
    buttons: string[][] = [[]],
    options: Omit<KeyboardOptions, "keyboard"> = {
      resize_keyboard: false,
      one_time_keyboard: false,
    },
  ): KeyboardOptions {
    const keyboard: KeyboardOptions = {
      keyboard: (buttons[0].length > 0 ? buttons : undefined) as string[][],
      resize_keyboard: options.resize_keyboard ?? false,
      one_time_keyboard: options.one_time_keyboard ?? false,
      remove_keyboard: options.remove_keyboard ?? false,
    };
    if (options.selective !== undefined) {
      keyboard.selective = options.selective;
    }
    if (options.input_field_placeholder) {
      keyboard.input_field_placeholder = options.input_field_placeholder;
    }
    return keyboard;
  }

  /**
   * Sets whether the keyboard should be removed after use.
   * @param {value} [boolean=true] - A boolean indicating whether to remove the keyboard.
   * @returns {Keyboard} - The instance of the Keyboard.
   */
  removeKeyboard(value: boolean = true): this {
    this.isRemoveKeyboard = value;
    return this;
  }

  /**
   * Sets whether the keyboard is one-time use.
   * @param {value} [boolean=true] - A boolean indicating whether the keyboard is one-time use.
   * @returns {Keyboard} - The instance of the Keyboard.
   */
  oneTime(value: boolean = true): this {
    this.isOneTime = value;
    return this;
  }

  /**
   * Sets whether the keyboard should be resizable.
   * @param {value} [boolean=true] - A boolean indicating whether the keyboard should be resizable.
   * @returns {Keyboard} - The instance of the Keyboard.
   */
  resize(value: boolean = true): this {
    this.isResize = value;
    return this;
  }

  /**
   * Sets the placeholder text for the input field.
   * @param {text} string - The placeholder text to be displayed.
   * @returns The instance of the Keyboard.
   */
  placeholder(text: string): this {
    this.placeholderText = text;
    return this;
  }

  /**
   * Sets whether the keyboard is selective.
   * @param {value} [boolean=true] - A boolean indicating whether the keyboard is selective.
   * @returns {Keyboard} The instance of the Keyboard.
   */
  selective(value: boolean = true): this {
    this.isSelective = value;
    return this;
  }

  /**
   * Builds and returns the final KeyboardOptions object.
   * @returns {KeyboardOptions} - The built KeyboardOptions object based on the set options.
   */
  build(): KeyboardOptions {
    const keyboard: KeyboardOptions = {
      keyboard: (this.buttons[0].length > 0
        ? this.buttons
        : undefined) as string[][],
      resize_keyboard: this.isResize,
      one_time_keyboard: this.isOneTime,
      remove_keyboard: this.isRemoveKeyboard,
    };
    if (this.isSelective !== undefined) {
      keyboard.selective = this.isSelective;
    }
    if (this.placeholderText) {
      keyboard.input_field_placeholder = this.placeholderText;
    }
    return keyboard;
  }
}

export { Keyboard };
