export class WebhookInfo extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").WebhookInfo} data - Data about the describes the current status of a webhook
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").WebhookInfo);
    /** Webhook URL, may be empty if webhook is not set up */
    url: string | undefined;
    /** True, if a custom certificate was provided for webhook certificate checks */
    customCertificate: boolean;
    /** Number of updates awaiting delivery */
    pendingCount: number;
    /** Currently used webhook IP address */
    ipAddress: string | undefined;
    /** Unix time for the most recent error that happened when trying to deliver an update via webhook */
    lastedTimestamp: number | undefined;
    /** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
    errorMessage: string | undefined;
    /** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
    synchronizatedTimestamp: number | undefined;
    /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
    connections: number | undefined;
    /** A list of update types the bot is subscribed to. Defaults to all update types except chat_member */
    allowedUpdates: ("chat_member" | "poll" | "message" | "edited_message" | "channel_post" | "edited_channel_post" | "business_connection" | "business_message" | "edited_business_message" | "deleted_business_messages" | "message_reaction" | "message_reaction_count" | "inline_query" | "chosen_inline_result" | "callback_query" | "shipping_query" | "pre_checkout_query" | "poll_answer" | "my_chat_member" | "chat_join_request" | "chat_boost" | "removed_chat_boost")[];
    /**
     * Use this method to remove webhook integration if you decide to switch back to getUpdates.
     * @param {boolean} [dropPendingUpdates] - Pass True to drop all pending updates
     * @return {Promise<true>} - Returns True on success.
     */
    delete(dropPendingUpdates?: boolean | undefined): Promise<true>;
    /**
     * Date for the most recent error that happened when trying to deliver an update via webhook
     * @type {Date}
     */
    get lastedAt(): Date;
    /**
     * Date of the most recent error that happened when trying to synchronize available updates with Telegram datacenters
     * @type {Date}
     */
    get synchronizatedAt(): Date;
}
import { Base } from "../Base";
//# sourceMappingURL=WebhookInfo.d.ts.map