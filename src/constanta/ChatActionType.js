/**
 * An object representing the available chat action types.
 * @typedef {object} ChatActionType
 * @property {string} Typing - Represents a typing action.
 * @property {string} UploadPhoto - Represents an action for uploading a photo.
 * @property {string} RecordVideo - Represents an action for recording a video.
 * @property {string} UploadVideo - Represents an action for uploading a video.
 * @property {string} RecordVoice - Represents an action for recording a voice message.
 * @property {string} UploadVoice - Represents an action for uploading a voice message.
 * @property {string} UploadDocument - Represents an action for uploading a document.
 * @property {string} ChooseSticker - Represents an action for choosing a sticker.
 * @property {string} FindLocation - Represents an action for finding a location.
 * @property {string} RecordVideoNote - Represents an action for recording a video note.
 * @property {string} UploadVideoNote - Represents an action for uploading a video note.
 */
const ChatActionType = {
  Typing: 'typing',
  UploadPhoto: 'upload_photo',
  RecordVideo: 'record_video',
  UploadVideo: 'upload_video',
  RecordVoice: 'record_voice',
  UploadVoice: 'upload_voice',
  UploadDocument: 'upload_document',
  ChooseSticker: 'choose_sticker',
  FindLocation: 'find_location',
  RecordVideoNote: 'record_video_note',
  UploadVideoNote: 'upload_video_note'
};

module.exports = ChatActionType;