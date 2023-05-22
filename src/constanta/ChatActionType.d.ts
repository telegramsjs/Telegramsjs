export = ChatActionType;
declare namespace ChatActionType {
    export { ChatActionType };
}
/**
 * An object representing the available chat action types.
 */
type ChatActionType = {
    /**
     * - Represents a typing action.
     */
    Typing: string;
    /**
     * - Represents an action for uploading a photo.
     */
    UploadPhoto: string;
    /**
     * - Represents an action for recording a video.
     */
    RecordVideo: string;
    /**
     * - Represents an action for uploading a video.
     */
    UploadVideo: string;
    /**
     * - Represents an action for recording a voice message.
     */
    RecordVoice: string;
    /**
     * - Represents an action for uploading a voice message.
     */
    UploadVoice: string;
    /**
     * - Represents an action for uploading a document.
     */
    UploadDocument: string;
    /**
     * - Represents an action for choosing a sticker.
     */
    ChooseSticker: string;
    /**
     * - Represents an action for finding a location.
     */
    FindLocation: string;
    /**
     * - Represents an action for recording a video note.
     */
    RecordVideoNote: string;
    /**
     * - Represents an action for uploading a video note.
     */
    UploadVideoNote: string;
};
