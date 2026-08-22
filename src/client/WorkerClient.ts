import { Events } from "../util/Constants";
import type { Update } from "@telegram.ts/types";
import { Message } from "../structures/message/Message";
import { Poll } from "../structures/media/poll/Poll";
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
import { ManagedBotUpdated } from "../structures/ManagedBotUpdated";
import type { TelegramClient } from "./TelegramClient";

type UpdateResult =
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
  | ManagedBotUpdated;

/**
 * Handles incoming updates from the Telegram API and routes them to the appropriate event handlers.
 */
class WorkerClient {
  /**
   * Creates an instance of WorkerClient.
   * @param client - The Telegram client instance.
   */
  constructor(public readonly client: TelegramClient) {}

  /**
   * Processes an incoming update and emits the corresponding event.
   * @param data - The update data received from Telegram.
   */
  processUpdate(data: Update): UpdateResult | void {
    this.client.emit(
      Events.RawUpdate,
      Object.assign({}, data, { client: this.client }),
    );

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
        (data.message || data.channel_post || data.business_message)!,
      );
    }

    if ("business_connection" in data && data.business_connection) {
      return this.onBusinessConnection(data.business_connection);
    }

    if (
      "edited_message" in data ||
      "edited_channel_post" in data ||
      "edited_business_message" in data
    ) {
      const edited =
        data.edited_message ||
        data.edited_channel_post ||
        data.edited_business_message;
      if (edited) return this.onMessageEdit(edited);
    }

    if ("deleted_business_messages" in data && data.deleted_business_messages) {
      return this.onDeletedBusinessMessages(data.deleted_business_messages);
    }

    if ("message_reaction" in data && data.message_reaction) {
      return this.onMessageReaction(data.message_reaction);
    }

    if ("message_reaction_count" in data && data.message_reaction_count) {
      return this.onMessageReactionCount(data.message_reaction_count);
    }

    if ("inline_query" in data && data.inline_query) {
      return this.onInlineQuery(data.inline_query);
    }

    if ("chosen_inline_result" in data && data.chosen_inline_result) {
      return this.onChosenInlineResult(data.chosen_inline_result);
    }

    if ("callback_query" in data && data.callback_query) {
      return this.onCallbackQuery(data.callback_query);
    }

    if ("shipping_query" in data && data.shipping_query) {
      return this.onShippingQuery(data.shipping_query);
    }

    if ("pre_checkout_query" in data && data.pre_checkout_query) {
      return this.onPreCheckoutQuery(data.pre_checkout_query);
    }

    if ("poll" in data && data.poll) {
      return this.onPoll(data.poll);
    }

    if ("poll_answer" in data && data.poll_answer) {
      return this.onPollAnswer(data.poll_answer);
    }

    if ("my_chat_member" in data && data.my_chat_member) {
      return this.onMyChatMember(data.my_chat_member);
    }

    if ("chat_member" in data && data.chat_member) {
      return this.onChatMember(data.chat_member);
    }

    if ("chat_join_request" in data && data.chat_join_request) {
      return this.onChatJoinRequest(data.chat_join_request);
    }

    if ("chat_boost" in data && data.chat_boost) {
      return this.onChatBoost(data.chat_boost);
    }

    if ("removed_chat_boost" in data && data.removed_chat_boost) {
      return this.onRemovedChatBoost(data.removed_chat_boost);
    }

    if ("purchased_paid_media" in data && data.purchased_paid_media) {
      return this.onPurchasedPaidMedia(data.purchased_paid_media);
    }

    if ("managed_bot" in data && data.managed_bot) {
      return this.onManagedUpdatedBot(data.managed_bot);
    }
  }

  /**
   * Handles new messages, channel posts, or business messages.
   * @param data - The message data.
   */
  onMessage(
    data: NonNullable<
      | Update["message"]
      | Update["channel_post"]
      | Update["business_message"]
      | Update["guest_message"]
    >,
  ): Message {
    const message = new Message(this.client, data);
    this.client.emit(Events.Message, message);
    return message;
  }

  /**
   * Handles new business connections.
   * @param data - The business connection data.
   */
  onBusinessConnection(
    data: NonNullable<Update["business_connection"]>,
  ): BusinessConnection {
    const business = new BusinessConnection(this.client, data);
    this.client.emit(Events.BusinessConnection, business);
    return business;
  }

  /**
   * Handles edited messages, channel posts, or business messages.
   * @param data - The edited message data.
   */
  onMessageEdit(
    data: NonNullable<
      | Update["edited_message"]
      | Update["edited_channel_post"]
      | Update["edited_business_message"]
    >,
  ): Message {
    const message = new Message(this.client, data);
    this.client.emit(Events.EditedMessage, message);
    return message;
  }

  /**
   * Handles deleted business messages.
   * @param data - The deleted business messages data.
   */
  onDeletedBusinessMessages(
    data: NonNullable<Update["deleted_business_messages"]>,
  ): BusinessMessagesDeleted {
    const businessMessage = new BusinessMessagesDeleted(this.client, data);
    this.client.emit(Events.DeletedBusinessMessages, businessMessage);
    return businessMessage;
  }

  /**
   * Handles reactions to messages.
   * @param data - The message reaction data.
   */
  onMessageReaction(
    data: NonNullable<Update["message_reaction"]>,
  ): MessageReactionUpdated {
    const messageReaction = new MessageReactionUpdated(this.client, data);
    this.client.emit(Events.MessageReaction, messageReaction);
    return messageReaction;
  }

  /**
   * Handles updates to message reaction counts.
   * @param data - The message reaction count data.
   */
  onMessageReactionCount(
    data: NonNullable<Update["message_reaction_count"]>,
  ): MessageReactionCountUpdated {
    const messageReaction = new MessageReactionCountUpdated(this.client, data);
    this.client.emit(Events.MessageReactionCount, messageReaction);
    return messageReaction;
  }

  /**
   * Handles incoming inline queries.
   * @param data - The inline query data.
   */
  onInlineQuery(data: NonNullable<Update["inline_query"]>): InlineQuery {
    const inline = new InlineQuery(this.client, data);
    this.client.emit(Events.InlineQuery, inline);
    return inline;
  }

  /**
   * Handles chosen inline results.
   * @param data - The chosen inline result data.
   */
  onChosenInlineResult(
    data: NonNullable<Update["chosen_inline_result"]>,
  ): ChosenInlineResult {
    const chosenInline = new ChosenInlineResult(this.client, data);
    this.client.emit(Events.ChosenInlineResult, chosenInline);
    return chosenInline;
  }

  /**
   * Handles incoming callback queries.
   * @param data - The callback query data.
   */
  onCallbackQuery(data: NonNullable<Update["callback_query"]>): CallbackQuery {
    const callback = new CallbackQuery(this.client, data);
    this.client.emit(Events.CallbackQuery, callback);
    return callback;
  }

  /**
   * Handles incoming shipping queries.
   * @param data - The shipping query data.
   */
  onShippingQuery(data: NonNullable<Update["shipping_query"]>): ShippingQuery {
    const shipping = new ShippingQuery(this.client, data);
    this.client.emit(Events.ShippingQuery, shipping);
    return shipping;
  }

  /**
   * Handles pre-checkout queries.
   * @param data - The pre-checkout query data.
   */
  onPreCheckoutQuery(
    data: NonNullable<Update["pre_checkout_query"]>,
  ): PreCheckoutQuery {
    const preCheckout = new PreCheckoutQuery(this.client, data);
    this.client.emit(Events.PreCheckoutQuery, preCheckout);
    return preCheckout;
  }

  /**
   * Handles new polls.
   * @param data - The poll data.
   */
  onPoll(data: NonNullable<Update["poll"]>): Poll {
    const poll = new Poll(this.client, data);
    this.client.emit(Events.Poll, poll);
    return poll;
  }

  /**
   * Handles new poll answers.
   * @param data - The poll answer data.
   */
  onPollAnswer(data: NonNullable<Update["poll_answer"]>): PollAnswer {
    const poll = new PollAnswer(this.client, data);
    this.client.emit(Events.PollAnswer, poll);
    return poll;
  }

  /**
   * Handles updates to the client's chat member status.
   * @param data - The chat member update data.
   */
  onMyChatMember(
    data: NonNullable<Update["my_chat_member"]>,
  ): ChatMemberUpdated {
    const myChat = new ChatMemberUpdated(this.client, data);
    this.client.emit(Events.MyChatMember, myChat);
    return myChat;
  }

  /**
   * Handles updates to chat members.
   * @param data - The chat member update data.
   */
  onChatMember(data: NonNullable<Update["chat_member"]>): ChatMemberUpdated {
    const chatMember = new ChatMemberUpdated(this.client, data);
    this.client.emit(Events.ChatMember, chatMember);
    return chatMember;
  }

  /**
   * Handles new chat members being added.
   * @param data - The message data containing new chat members.
   */
  onChatMemberAdd(data: NonNullable<Update["message"]>): Message {
    const message = new Message(this.client, data);

    if (
      this.client.user &&
      message.newChatMembers?.some(({ id }) => id === this.client.user!.id)
    ) {
      this.client.emit(Events.ChatCreate, message);
    } else {
      this.client.emit(Events.ChatMemberAdd, message);
    }

    return message;
  }

  /**
   * Handles chat members being removed.
   * @param data - The message data containing removed chat members.
   */
  onChatMemberRemove(data: NonNullable<Update["message"]>): Message {
    const message = new Message(this.client, data);

    if (
      message.leftChatMember &&
      this.client.user &&
      message.leftChatMember.id === this.client.user.id
    ) {
      this.client.emit(Events.ChatDelete, message);
    } else {
      this.client.emit(Events.ChatMemberRemove, message);
    }

    return message;
  }

  /**
   * Handles chat join requests.
   * @param data - The chat join request data.
   */
  onChatJoinRequest(
    data: NonNullable<Update["chat_join_request"]>,
  ): ChatJoinRequest {
    const chatJoin = new ChatJoinRequest(this.client, data);
    this.client.emit(Events.ChatJoinRequest, chatJoin);
    return chatJoin;
  }

  /**
   * Handles updates to chat boosts.
   * @param data - The chat boost update data.
   */
  onChatBoost(data: NonNullable<Update["chat_boost"]>): ChatBoostUpdated {
    const chatBoost = new ChatBoostUpdated(this.client, data);
    this.client.emit(Events.ChatBoost, chatBoost);
    return chatBoost;
  }

  /**
   * Handles removed chat boosts.
   * @param data - The removed chat boost data.
   */
  onRemovedChatBoost(
    data: NonNullable<Update["removed_chat_boost"]>,
  ): ChatBoostRemoved {
    const chatBoost = new ChatBoostRemoved(this.client, data);
    this.client.emit(Events.RemovedChatBoost, chatBoost);
    return chatBoost;
  }

  /**
   * Handles purchased paid media.
   * @param data - The purchased paid media data.
   */
  onPurchasedPaidMedia(
    data: NonNullable<Update["purchased_paid_media"]>,
  ): PaidMediaPurchased {
    const paidMedia = new PaidMediaPurchased(this.client, data);
    this.client.emit(Events.PurchasedPaidMedia, paidMedia);
    return paidMedia;
  }

  /**
   * Handles managed bot events.
   * @param data - The managed bot data.
   */
  onManagedUpdatedBot(
    data: NonNullable<Update["managed_bot"]>,
  ): ManagedBotUpdated {
    const managedBot = new ManagedBotUpdated(this.client, data);
    this.client.emit(Events.ManagedBotUpdated, managedBot);
    return managedBot;
  }
}

export { WorkerClient };
