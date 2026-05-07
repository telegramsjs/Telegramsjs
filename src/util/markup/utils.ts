const styleMap = {
  red: "danger",
  green: "success",
  blue: "primary",
} as const;

/**
 * Additional keyboard button options.
 */
type MarkupOptions = {
  /**
   * The custom emoji id shown before the button text.
   */
  icon?: string;

  /**
   * The style of the button.
   */
  style?: "danger" | "success" | "primary" | "red" | "green" | "blue";
};

function replacedMarkupOptions(options?: MarkupOptions) {
  if (!options) return {};

  let style: MarkupOptions["style"];

  switch (options.style) {
    case "red":
    case "green":
    case "blue":
      style = styleMap[options.style];
      break;
    default:
      style = options.style;
  }

  return {
    ...(options.icon ? { icon_custom_emoji_id: options.icon } : {}),
    ...(style ? { style } : {}),
  };
}

export { replacedMarkupOptions, type MarkupOptions };
