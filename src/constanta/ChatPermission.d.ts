export = ChatPermission;
declare namespace ChatPermission {
    export { ChatPermission };
}
/**
 * An object containing chat permissions.
 */
type ChatPermission = {
    /**
     * - Specifies if users can send other kinds of messages.
     */
    CanSendOtherMessages: string;
    /**
     * - Specifies if users can add web page previews to their messages.
     */
    CanAddWebPagePreviews: string;
    /**
     * - Specifies if users can send text messages.
     */
    CanSendMessages: string;
    /**
     * - Specifies if users can send audio messages.
     */
    CanSendAudios: string;
    /**
     * - Specifies if users can send document messages.
     */
    CanSendDocuments: string;
    /**
     * - Specifies if users can send photo messages.
     */
    CanSendPhotos: string;
    /**
     * - Specifies if users can send video messages.
     */
    CanSendVideos: string;
    /**
     * - Specifies if users can send video note messages.
     */
    CanSendVideoNotes: string;
    /**
     * - Specifies if users can send voice note messages.
     */
    CanSendVoiceNotes: string;
    /**
     * - Specifies if users can send polls.
     */
    CanSendPolls: string;
};
