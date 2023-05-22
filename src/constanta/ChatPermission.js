/**
 * An object containing chat permissions.
 * @typedef {Object} ChatPermission
 * @property {string} CanSendOtherMessages - Specifies if users can send other kinds of messages.
 * @property {string} CanAddWebPagePreviews - Specifies if users can add web page previews to their messages.
 * @property {string} CanSendMessages - Specifies if users can send text messages.
 * @property {string} CanSendAudios - Specifies if users can send audio messages.
 * @property {string} CanSendDocuments - Specifies if users can send document messages.
 * @property {string} CanSendPhotos - Specifies if users can send photo messages.
 * @property {string} CanSendVideos - Specifies if users can send video messages.
 * @property {string} CanSendVideoNotes - Specifies if users can send video note messages.
 * @property {string} CanSendVoiceNotes - Specifies if users can send voice note messages.
 * @property {string} CanSendPolls - Specifies if users can send polls.
 */

const ChatPermission = {
  CanSendOtherMessages: 'can_send_other_messages',
  CanAddWebPagePreviews: 'can_add_web_page_previews',
  CanSendMessages: 'can_send_messages',
  CanSendAudios: 'can_send_audios',
  CanSendDocuments: 'can_send_documents',
  CanSendPhotos: 'can_send_photos',
  CanSendVideos: 'can_send_videos',
  CanSendVideoNotes: 'can_send_video_notes',
  CanSendVoiceNotes: 'can_send_voice_notes',
  CanSendPolls: 'can_send_polls',
};

module.exports = ChatPermission;