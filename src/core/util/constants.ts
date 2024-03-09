const defaultParameters = {
  offset: 0,
  limit: 1,
  timeout: 0,
  allowed_updates: [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "inline_query",
    "chosen_inline_result",
    "callback_query",
    "shipping_query",
    "pre_checkout_query",
    "poll",
    "poll_answer",
    "my_chat_member",
    "chat_join_request",
    "chat_boost",
    "removed_chat_boost",
    "chat_member",
    "message_reaction",
    "message_reaction_count",
  ],
} as const;

export { defaultParameters };
