export class VideoChatScheduled {
    /**
     * @param {import("@telegram.ts/types").Chat & { threadId?: number }} data - Data about the represents a service message about a video chat scheduled in the chat
     */
    constructor(data: import("@telegram.ts/types").Chat & {
        threadId?: number;
    });
    /**
     * Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator
     * @type {number}
     */
    startedTimestamp: number;
    /**
     * Point in time when the video chat is supposed to be started by a chat administrator
     * @type {Date}
     */
    get startedAt(): Date;
}
//# sourceMappingURL=VideoChatScheduled.d.ts.map