import type { Update } from "@telegram.ts/types";
import { Message } from "../structures/message/Message";
import { Poll } from "../structures/media/Poll";
import { PollAnswer } from "../structures/PollAnswer";
import { InlineQuery } from "../structures/InlineQuery";
import { ShippingQuery } from "../structures/ShippingQuery";
import { ChatJoinRequest } from "../structures/ChatJoinRequest";
import { ChatBoostUpdated } from "../structures/ChatBoostUpdated";
import { ChatBoostRemoved } from "../structures/ChatBoostRemoved";
import { PreCheckoutQuery } from "../structures/PreCheckoutQuery";
import { ChatMemberUpdated } from "../structures/ChatMemberUpdated";
import { ChosenInlineResult } from "../structures/ChosenInlineResult";
import { MessageReactionUpdated } from "../structures/MessageReactionUpdated";
import { MessageReactionCountUpdated } from "../structures/MessageReactionCountUpdated";
import { CallbackQuery } from "../structures/CallbackQuery";
import { BusinessConnection } from "../structures/business/BusinessConnection";
import { BusinessMessagesDeleted } from "../structures/business/BusinessMessagesDeleted";
import type { TelegramClient } from "./TelegramClient";

/**
 * Handles incoming updates from the Telegram API and routes them to the appropriate event handlers.
 */
class WorketClient {
  /**
   * Creates an instance of WorketClient.
   * @param client - The Telegram client instance.
   */
  constructor(public readonly client: TelegramClient) {}

  /**
   * Processes an incoming update and emits the corresponding event.
   * @param data - The update data received from Telegram.
   */
  processUpdate(data: Update) {
    if (
      "message" in data ||
      "channel_post" in data ||
      "business_message" in data
    ) {
      if ("new_chat_members" in (data.message || {})) {
        return this.onChatMemberAdd(data.message!);
      }
      if ("left_chat_member" in (data.message || {})) {
        return this.onChatMemberRemove(data.message!);
      }
      return this.onMessage(
        data.message || data.channel_post || data.business_message,
      );
    }
    if ("business_connection" in data) {
      return this.onBusinessConnection(data.business_connection);
    }
    if (
      "edited_message" in data ||
      "edited_channel_post" in data ||
      "edited_business_message" in data
    ) {
      return this.onMessageEdit(
        data.edited_message ||
          data.edited_channel_post ||
          data.edited_business_message,
      );
    }
    if ("deleted_business_messages" in data) {
      return this.onDeletedBusinessMessages(data.deleted_business_messages);
    }
    if ("message_reaction" in data) {
      return this.onMessageReaction(data.message_reaction);
    }
    if ("message_reaction_count" in data) {
      return this.onMessageReactionCount(data.message_reaction_count);
    }
    if ("inline_query" in data) {
      return this.onInlineQuery(data.inline_query);
    }
    if ("chosen_inline_result" in data) {
      return this.onChosenInlineResult(data.chosen_inline_result);
    }
    if ("callback_query" in data) {
      return this.onCallbackQuery(data.callback_query);
    }
    if ("shipping_query" in data) {
      return this.onShippingQuery(data.shipping_query);
    }
    if ("pre_checkout_query" in data) {
      return this.onPreCheckoutQuery(data.pre_checkout_query);
    }
    if ("poll" in data) {
      return this.onPoll(data.poll);
    }
    if ("poll_answer" in data) {
      return this.onPollAnswer(data.poll_answer);
    }
    if ("my_chat_member" in data) {
      return this.onMyChatMember(data.my_chat_member);
    }
    if ("chat_member" in data) {
      return this.onChatMember(data.chat_member);
    }
    if ("chat_join_request" in data) {
      return this.onChatJoinRequest(data.chat_join_request);
    }
    if ("chat_boost" in data) {
      return this.onChatBoost(data.chat_boost);
    }
    if ("removed_chat_boost" in data) {
      return this.onRemovedChatBoost(data.removed_chat_boost);
    }
  }

  /**
   * Handles new messages, channel posts, or business messages.
   * @param data - The message data.
   */
  onMessage(
    data:
      | Update["message"]
      | Update["channel_post"]
      | Update["business_message"],
  ) {
    if (!data) return;
    const message = new Message(this.client, data);
    if ("chat" in message) {
      message.chat?.messages._add(data);
    }
    this.client.emit("message", message);
  }

  /**
   * Handles new business connections.
   * @param data - The business connection data.
   */
  onBusinessConnection(data: Update["business_connection"]) {
    if (!data) return;
    this.client.emit(
      "businessConnection",
      new BusinessConnection(this.client, data),
    );
  }

  /**
   * Handles edited messages, channel posts, or business messages.
   * @param data - The edited message data.
   */
  onMessageEdit(
    data:
      | Update["edited_message"]
      | Update["edited_channel_post"]
      | Update["edited_business_message"],
  ) {
    if (!data) return;
    const newMessage = new Message(this.client, data);
    const oldMessage =
      newMessage.chat?.messages.cache.get(newMessage.id) || null;
    this.client.emit("messageUpdate", oldMessage, newMessage);
  }

  /**
   * Handles deleted business messages.
   * @param data - The deleted business messages data.
   */
  onDeletedBusinessMessages(data: Update["deleted_business_messages"]) {
    if (!data) return;
    this.client.emit(
      "deletedBusinessMessages",
      new BusinessMessagesDeleted(this.client, data),
    );
  }

  /**
   * Handles reactions to messages.
   * @param data - The message reaction data.
   */
  onMessageReaction(data: Update["message_reaction"]) {
    if (!data) return;
    this.client.emit(
      "messageReaction",
      new MessageReactionUpdated(this.client, data),
    );
  }

  /**
   * Handles updates to message reaction counts.
   * @param data - The message reaction count data.
   */
  onMessageReactionCount(data: Update["message_reaction_count"]) {
    if (!data) return;
    this.client.emit(
      "messageReactionCount",
      new MessageReactionCountUpdated(this.client, data),
    );
  }

  /**
   * Handles incoming inline queries.
   * @param data - The inline query data.
   */
  onInlineQuery(data: Update["inline_query"]) {
    if (!data) return;
    this.client.emit("inlineQuery", new InlineQuery(this.client, data));
  }

  /**
   * Handles chosen inline results.
   * @param data - The chosen inline result data.
   */
  onChosenInlineResult(data: Update["chosen_inline_result"]) {
    if (!data) return;
    this.client.emit(
      "chosenInlineResult",
      new ChosenInlineResult(this.client, data),
    );
  }

  /**
   * Handles incoming callback queries.
   * @param data - The callback query data.
   */
  onCallbackQuery(data: Update["callback_query"]) {
    if (!data) return;
    this.client.emit("callbackQuery", new CallbackQuery(this.client, data));
  }

  /**
   * Handles incoming shipping queries.
   * @param data - The shipping query data.
   */
  onShippingQuery(data: Update["shipping_query"]) {
    if (!data) return;
    this.client.emit("shippingQuery", new ShippingQuery(this.client, data));
  }

  /**
   * Handles pre-checkout queries.
   * @param data - The pre-checkout query data.
   */
  onPreCheckoutQuery(data: Update["pre_checkout_query"]) {
    if (!data) return;
    this.client.emit(
      "preCheckoutQuery",
      new PreCheckoutQuery(this.client, data),
    );
  }

  /**
   * Handles new polls.
   * @param data - The poll data.
   */
  onPoll(data: Update["poll"]) {
    if (!data) return;
    this.client.emit("poll", new Poll(this.client, data));
  }

  /**
   * Handles new poll answers.
   * @param data - The poll answer data.
   */
  onPollAnswer(data: Update["poll_answer"]) {
    if (!data) return;
    this.client.emit("pollAnswer", new PollAnswer(this.client, data));
  }

  /**
   * Handles updates to the client's chat member status.
   * @param data - The chat member update data.
   */
  onMyChatMember(data: Update["my_chat_member"]) {
    if (!data) return;
    this.client.emit("myChatMember", new ChatMemberUpdated(this.client, data));
  }

  /**
   * Handles updates to chat members.
   * @param data - The chat member update data.
   */
  onChatMember(data: Update["chat_member"]) {
    if (!data) return;
    this.client.emit("chatMember", new ChatMemberUpdated(this.client, data));
  }

  /**
   * Handles new chat members being added.
   * @param data - The message data containing new chat members.
   */
  onChatMemberAdd(data: Update["message"]) {
    if (!data) return;
    const message = new Message(this.client, data);
    if ("chat" in message) {
      message.chat?.messages._add(data);
    }
    if (
      message.newChatMembers?.findIndex(
        ({ id }: { id: number }) => id === this.client.user.id,
      ) !== -1
    ) {
      this.client.emit("chatCreate", message);
    } else {
      this.client.emit("chatMemberAdd", message);
    }
  }

  /**
   * Handles chat members being removed.
   * @param data - The message data containing removed chat members.
   */
  onChatMemberRemove(data: Update["message"]) {
    if (!data) return;
    const message = new Message(this.client, data);
    if ("chat" in message) {
      message.chat?.messages._add(data);
    }
    if (message.leftChatMember?.id === this.client.user.id) {
      this.client.emit("chatDelete", message);
    } else {
      this.client.emit("chatMemberRemove", message);
    }
  }

  /**
   * Handles chat join requests.
   * @param data - The chat join request data.
   */
  onChatJoinRequest(data: Update["chat_join_request"]) {
    if (!data) return;
    this.client.emit("chatJoinRequest", new ChatJoinRequest(this.client, data));
  }

  /**
   * Handles updates to chat boosts.
   * @param data - The chat boost update data.
   */
  onChatBoost(data: Update["chat_boost"]) {
    if (!data) return;
    this.client.emit("chatBoost", new ChatBoostUpdated(this.client, data));
  }

  /**
   * Handles removed chat boosts.
   * @param data - The removed chat boost data.
   */
  onRemovedChatBoost(data: Update["removed_chat_boost"]) {
    if (!data) return;
    this.client.emit(
      "removedChatBoost",
      new ChatBoostRemoved(this.client, data),
    );
  }
}

export { WorketClient };
