"use strict";
class VideoChatScheduled {
    /**
     * @param {import("@telegram.ts/types").Chat & { threadId?: number }} data - Data about the represents a service message about a video chat scheduled in the chat
     */
    constructor(data) {
        /**
         * Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator
         * @type {number}
         */
        this.startedTimestamp = data.start_date;
    }
    /**
     * Point in time when the video chat is supposed to be started by a chat administrator
     * @type {Date}
     */
    get startedAt() {
        return new Date(this.startedTimestamp);
    }
}
module.exports = { VideoChatScheduled };
//# sourceMappingURL=VideoChatScheduled.js.map