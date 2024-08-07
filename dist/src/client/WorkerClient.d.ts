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
declare class WorketClient {
    readonly client: TelegramClient;
    /**
     * Creates an instance of WorketClient.
     * @param client - The Telegram client instance.
     */
    constructor(client: TelegramClient);
    /**
     * Processes an incoming update and emits the corresponding event.
     * @param data - The update data received from Telegram.
     */
    processUpdate(data: Update): Message | [Message | null, Message] | BusinessConnection | BusinessMessagesDeleted | MessageReactionUpdated | MessageReactionCountUpdated | InlineQuery | ChosenInlineResult | CallbackQuery | ShippingQuery | PreCheckoutQuery | Poll | PollAnswer | ChatMemberUpdated | ChatJoinRequest | ChatBoostUpdated | ChatBoostRemoved | undefined;
    /**
     * Handles new messages, channel posts, or business messages.
     * @param data - The message data.
     */
    onMessage(data: Update["message"] | Update["channel_post"] | Update["business_message"]): Message | undefined;
    /**
     * Handles new business connections.
     * @param data - The business connection data.
     */
    onBusinessConnection(data: Update["business_connection"]): BusinessConnection | undefined;
    /**
     * Handles edited messages, channel posts, or business messages.
     * @param data - The edited message data.
     */
    onMessageEdit(data: Update["edited_message"] | Update["edited_channel_post"] | Update["edited_business_message"]): [Message | null, Message] | undefined;
    /**
     * Handles deleted business messages.
     * @param data - The deleted business messages data.
     */
    onDeletedBusinessMessages(data: Update["deleted_business_messages"]): BusinessMessagesDeleted | undefined;
    /**
     * Handles reactions to messages.
     * @param data - The message reaction data.
     */
    onMessageReaction(data: Update["message_reaction"]): MessageReactionUpdated | undefined;
    /**
     * Handles updates to message reaction counts.
     * @param data - The message reaction count data.
     */
    onMessageReactionCount(data: Update["message_reaction_count"]): MessageReactionCountUpdated | undefined;
    /**
     * Handles incoming inline queries.
     * @param data - The inline query data.
     */
    onInlineQuery(data: Update["inline_query"]): InlineQuery | undefined;
    /**
     * Handles chosen inline results.
     * @param data - The chosen inline result data.
     */
    onChosenInlineResult(data: Update["chosen_inline_result"]): ChosenInlineResult | undefined;
    /**
     * Handles incoming callback queries.
     * @param data - The callback query data.
     */
    onCallbackQuery(data: Update["callback_query"]): CallbackQuery | undefined;
    /**
     * Handles incoming shipping queries.
     * @param data - The shipping query data.
     */
    onShippingQuery(data: Update["shipping_query"]): ShippingQuery | undefined;
    /**
     * Handles pre-checkout queries.
     * @param data - The pre-checkout query data.
     */
    onPreCheckoutQuery(data: Update["pre_checkout_query"]): PreCheckoutQuery | undefined;
    /**
     * Handles new polls.
     * @param data - The poll data.
     */
    onPoll(data: Update["poll"]): Poll | undefined;
    /**
     * Handles new poll answers.
     * @param data - The poll answer data.
     */
    onPollAnswer(data: Update["poll_answer"]): PollAnswer | undefined;
    /**
     * Handles updates to the client's chat member status.
     * @param data - The chat member update data.
     */
    onMyChatMember(data: Update["my_chat_member"]): ChatMemberUpdated | undefined;
    /**
     * Handles updates to chat members.
     * @param data - The chat member update data.
     */
    onChatMember(data: Update["chat_member"]): ChatMemberUpdated | undefined;
    /**
     * Handles new chat members being added.
     * @param data - The message data containing new chat members.
     */
    onChatMemberAdd(data: Update["message"]): Message | undefined;
    /**
     * Handles chat members being removed.
     * @param data - The message data containing removed chat members.
     */
    onChatMemberRemove(data: Update["message"]): Message | undefined;
    /**
     * Handles chat join requests.
     * @param data - The chat join request data.
     */
    onChatJoinRequest(data: Update["chat_join_request"]): ChatJoinRequest | undefined;
    /**
     * Handles updates to chat boosts.
     * @param data - The chat boost update data.
     */
    onChatBoost(data: Update["chat_boost"]): ChatBoostUpdated | undefined;
    /**
     * Handles removed chat boosts.
     * @param data - The removed chat boost data.
     */
    onRemovedChatBoost(data: Update["removed_chat_boost"]): ChatBoostRemoved | undefined;
}
export { WorketClient };
//# sourceMappingURL=WorkerClient.d.ts.map