import { Events } from "../util/Constants";
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
import { PaidMediaPurchased } from "../structures/PaidMediaPurchased";
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
  processUpdate(
    data: Update,
  ):
    | Message
    | BusinessConnection
    | BusinessMessagesDeleted
    | MessageReactionUpdated
    | MessageReactionCountUpdated
    | InlineQuery
    | ChosenInlineResult
    | CallbackQuery
    | ShippingQuery
    | PreCheckoutQuery
    | Poll
    | PollAnswer
    | ChatMemberUpdated
    | ChatJoinRequest
    | ChatBoostUpdated
    | ChatBoostRemoved
    | PaidMediaPurchased
    | undefined {
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
    if ("purchased_paid_media" in data) {
      return this.onPurchasedPaidMedia(data.purchased_paid_media);
    }
    return;
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
  ): Message | undefined {
    if (!data) return;

    const message = new Message(this.client, data);
    this.client.emit(Events.Message, message);

    return message;
  }

  /**
   * Handles new business connections.
   * @param data - The business connection data.
   */
  onBusinessConnection(
    data: Update["business_connection"],
  ): BusinessConnection | undefined {
    if (!data) return;

    const business = new BusinessConnection(this.client, data);
    this.client.emit(Events.BusinessConnection, business);

    return business;
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
  ): Message | undefined {
    if (!data) return;

    const newMessage = new Message(this.client, data);
    this.client.emit(Events.EditedMessage, newMessage);

    return newMessage;
  }

  /**
   * Handles deleted business messages.
   * @param data - The deleted business messages data.
   */
  onDeletedBusinessMessages(
    data: Update["deleted_business_messages"],
  ): BusinessMessagesDeleted | undefined {
    if (!data) return;

    const businessMessage = new BusinessMessagesDeleted(this.client, data);
    this.client.emit(Events.DeletedBusinessMessages, businessMessage);

    return businessMessage;
  }

  /**
   * Handles reactions to messages.
   * @param data - The message reaction data.
   */
  onMessageReaction(
    data: Update["message_reaction"],
  ): MessageReactionUpdated | undefined {
    if (!data) return;

    const messageReaction = new MessageReactionUpdated(this.client, data);
    this.client.emit(Events.MessageReaction, messageReaction);

    return messageReaction;
  }

  /**
   * Handles updates to message reaction counts.
   * @param data - The message reaction count data.
   */
  onMessageReactionCount(
    data: Update["message_reaction_count"],
  ): MessageReactionCountUpdated | undefined {
    if (!data) return;

    const messageReaction = new MessageReactionCountUpdated(this.client, data);
    this.client.emit(Events.MessageReactionCount, messageReaction);

    return messageReaction;
  }

  /**
   * Handles incoming inline queries.
   * @param data - The inline query data.
   */
  onInlineQuery(data: Update["inline_query"]): InlineQuery | undefined {
    if (!data) return;

    const inline = new InlineQuery(this.client, data);
    this.client.emit(Events.InlineQuery, inline);

    return inline;
  }

  /**
   * Handles chosen inline results.
   * @param data - The chosen inline result data.
   */
  onChosenInlineResult(
    data: Update["chosen_inline_result"],
  ): ChosenInlineResult | undefined {
    if (!data) return;

    const chosenInline = new ChosenInlineResult(this.client, data);
    this.client.emit(Events.ChosenInlineResult, chosenInline);

    return chosenInline;
  }

  /**
   * Handles incoming callback queries.
   * @param data - The callback query data.
   */
  onCallbackQuery(data: Update["callback_query"]): CallbackQuery | undefined {
    if (!data) return;

    const callback = new CallbackQuery(this.client, data);
    this.client.emit(Events.CallbackQuery, callback);

    return callback;
  }

  /**
   * Handles incoming shipping queries.
   * @param data - The shipping query data.
   */
  onShippingQuery(data: Update["shipping_query"]): ShippingQuery | undefined {
    if (!data) return;

    const shipping = new ShippingQuery(this.client, data);
    this.client.emit(Events.ShippingQuery, shipping);

    return shipping;
  }

  /**
   * Handles pre-checkout queries.
   * @param data - The pre-checkout query data.
   */
  onPreCheckoutQuery(
    data: Update["pre_checkout_query"],
  ): PreCheckoutQuery | undefined {
    if (!data) return;

    const preCheckout = new PreCheckoutQuery(this.client, data);
    this.client.emit(Events.PreCheckoutQuery, preCheckout);

    return preCheckout;
  }

  /**
   * Handles new polls.
   * @param data - The poll data.
   */
  onPoll(data: Update["poll"]): Poll | undefined {
    if (!data) return;

    const poll = new Poll(this.client, data);
    this.client.emit(Events.Poll, poll);

    return poll;
  }

  /**
   * Handles new poll answers.
   * @param data - The poll answer data.
   */
  onPollAnswer(data: Update["poll_answer"]): PollAnswer | undefined {
    if (!data) return;

    const poll = new PollAnswer(this.client, data);
    this.client.emit(Events.PollAnswer, poll);

    return poll;
  }

  /**
   * Handles updates to the client's chat member status.
   * @param data - The chat member update data.
   */
  onMyChatMember(
    data: Update["my_chat_member"],
  ): ChatMemberUpdated | undefined {
    if (!data) return;

    const myChat = new ChatMemberUpdated(this.client, data);
    this.client.emit(Events.MyChatMember, myChat);

    return myChat;
  }

  /**
   * Handles updates to chat members.
   * @param data - The chat member update data.
   */
  onChatMember(data: Update["chat_member"]): ChatMemberUpdated | undefined {
    if (!data) return;

    const chatMember = new ChatMemberUpdated(this.client, data);
    this.client.emit(Events.ChatMember, chatMember);

    return chatMember;
  }

  /**
   * Handles new chat members being added.
   * @param data - The message data containing new chat members.
   */
  onChatMemberAdd(data: Update["message"]): Message | undefined {
    if (!data) return;

    const message = new Message(this.client, data);

    if (
      message.newChatMembers?.findIndex(
        (user) => user.id === this.client.user.id,
      ) !== -1
    ) {
      this.client.emit(Events.ChatCreate, message);
      return message;
    } else {
      this.client.emit(Events.ChatMemberAdd, message);
      return message;
    }
  }

  /**
   * Handles chat members being removed.
   * @param data - The message data containing removed chat members.
   */
  onChatMemberRemove(data: Update["message"]): Message | undefined {
    if (!data) return;

    const message = new Message(this.client, data);

    if (message.leftChatMember?.id === this.client.user.id) {
      this.client.emit("chatDelete", message);
      return message;
    } else {
      this.client.emit(Events.ChatMemberRemove, message);
      return message;
    }
  }

  /**
   * Handles chat join requests.
   * @param data - The chat join request data.
   */
  onChatJoinRequest(
    data: Update["chat_join_request"],
  ): ChatJoinRequest | undefined {
    if (!data) return;

    const chatJoin = new ChatJoinRequest(this.client, data);
    this.client.emit(Events.ChatJoinRequest, chatJoin);

    return chatJoin;
  }

  /**
   * Handles updates to chat boosts.
   * @param data - The chat boost update data.
   */
  onChatBoost(data: Update["chat_boost"]): ChatBoostUpdated | undefined {
    if (!data) return;

    const chatBoost = new ChatBoostUpdated(this.client, data);
    this.client.emit(Events.ChatBoost, chatBoost);

    return chatBoost;
  }

  /**
   * Handles removed chat boosts.
   * @param data - The removed chat boost data.
   */
  onRemovedChatBoost(
    data: Update["removed_chat_boost"],
  ): ChatBoostRemoved | undefined {
    if (!data) return;

    const chatBoost = new ChatBoostRemoved(this.client, data);
    this.client.emit(Events.RemovedChatBoost, chatBoost);

    return chatBoost;
  }

  /**
   * Handles purchased paid media.
   * @param data - The purchased paid media.
   */
  onPurchasedPaidMedia(
    data: Update["purchased_paid_media"],
  ): PaidMediaPurchased | undefined {
    if (!data) return;

    const paidMedia = new PaidMediaPurchased(this.client, data);
    this.client.emit(Events.PurchasedPaidMedia, paidMedia);

    return paidMedia;
  }
}

export { WorketClient };
