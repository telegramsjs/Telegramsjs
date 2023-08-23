type KeyboardOptions = {
  keyboard: string[][];
  resize_keyboard: boolean;
  one_time_keyboard: boolean;
  selective?: boolean;
  input_field_placeholder?: string;
  remove_keyboard?: boolean;
};

class MenuKeyboardBuilder {
  private buttons: string[][] = [[]];
  private isOneTime: boolean = false;
  private isResize: boolean = false;
  private placeholderText: string | undefined;
  private isSelective: boolean | undefined;
  private isRemoveKeyboard: boolean = false;

  /**
   * Adds buttons to the current row of the keyboard.
   * ```ts
   * const menu1 = new MenuKeyboardBuilder()
   * .keyboard("🥇")
   * .keyboard("🥈")
   * .keyboard("🥉")
   * .build()
   *
   * const menu2 = new MenuKeyboardBuilder()
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
   * @returns The instance of the MenuKeyboardBuilder.
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
   * const menu = new MenuKeyboardBuilder()
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
   * @returns {MenuKeyboardBuilder} - The instance of the MenuKeyboardBuilder.
   */
  row(): this {
    this.buttons.push([]);
    return this;
  }

  /**
   * Sorts buttons in each row alphabetically.
   * @returns {MenuKeyboardBuilder} - The instance of the MenuKeyboardBuilder.
   */
  sort(): this {
    this.buttons = this.buttons.map((row) => row.sort());
    return this;
  }

  /**
   * Sets whether the keyboard should be removed after use.
   * @param {value} [boolean=true] - A boolean indicating whether to remove the keyboard.
   * @returns {MenuKeyboardBuilder} - The instance of the MenuKeyboardBuilder.
   */
  removeKeyboard(value: boolean = true): this {
    this.isRemoveKeyboard = value;
    return this;
  }

  /**
   * Sets whether the keyboard is one-time use.
   * @param {value} [boolean=true] - A boolean indicating whether the keyboard is one-time use.
   * @returns {MenuKeyboardBuilder} - The instance of the MenuKeyboardBuilder.
   */
  oneTime(value: boolean = true): this {
    this.isOneTime = value;
    return this;
  }

  /**
   * Sets whether the keyboard should be resizable.
   * @param {value} [boolean=true] - A boolean indicating whether the keyboard should be resizable.
   * @returns {MenuKeyboardBuilder} - The instance of the MenuKeyboardBuilder.
   */
  resize(value: boolean = true): this {
    this.isResize = value;
    return this;
  }

  /**
   * Sets the placeholder text for the input field.
   * @param {text} string - The placeholder text to be displayed.
   * @returns The instance of the MenuKeyboardBuilder.
   */
  placeholder(text: string): this {
    this.placeholderText = text;
    return this;
  }

  /**
   * Sets whether the keyboard is selective.
   * @param {value} [boolean=true] - A boolean indicating whether the keyboard is selective.
   * @returns {MenuKeyboardBuilder} The instance of the MenuKeyboardBuilder.
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

export { MenuKeyboardBuilder };
