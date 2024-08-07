"use strict";
const { Chat } = require("../chat/Chat");
const { Photo } = require("../media/Photo");
class ChatShared extends Chat {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatShared} data - Data about the contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button
     */
    constructor(client, data) {
        super(client, data);
        /** Identifier of the request */
        this.requestId = data.request_id;
        /** Available sizes of the chat photo, if the photo was requested by the bot */
        this.photo = data.photo.map((photo) => new Photo(client, photo));
    }
}
module.exports = { ChatShared };
//# sourceMappingURL=ChatShared.js.map