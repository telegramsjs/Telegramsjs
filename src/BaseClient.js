const https = require('https');
const querystring = require('querystring');
const Request = require("./request.js");
const { TelegramApiError } = require("./errorcollection.js");

class BaseClient extends Request {

  constructor(token, intents) {
    super(token, intents);
  }
  
  async getMe() {
    const method = 'getMe';
    const response = await this.request(method);
    if (!response) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async deleteWebhook(options) {
    const method = 'deleteWebhook';
    const params = {
      drop_pending_updates: options.dropPendingUpdates
    };
    const response = await this.request(method, params);
    if (!!response) {
      throw new TelegramApiError('Failed to delete webhook');
    }
    return response.result;
  }
  
  async getWebhookInfo() {
    const method = 'getWebhookInfo';
    const response = await this.request(method);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async sendMessage(options) {
    const method = 'sendMessage';
    const params = {
      chat_id: options.chatId,
      text: options.text,
      reply_markup: options.replyMarkup,
      allow_sending_without_reply: options.allowReply,
      disable_notification: options.notification,
      protect_content: options.content,
      message_thread_id: options.threadId,
      reply_to_message_id: options.replyToMessageId,
      parse_mode: options.parseMode
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
   }
   
   async sendPhoto(options) {
    const method = 'sendPhoto';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.threadId,
      photo: options.photo,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      has_spoiler: options.hasSpoiler,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
   }
   
   async sendAudio(options) {
    const method = 'sendAudio';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.threadId,
      audio: options.audio,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      duration: options.duration,
      performer: options.performer,
      title: options.title,
      thumbnail: options.thumbnail,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
   }
   
   async sendDocument(options) {
    const method = 'sendDocument';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.threadId,
      document: options.document,
      thumbnail: options.thumbnail,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      disable_content_type_detection: options.disableContentTypeDetection,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendVideo(options) {
  const method = 'sendVideo';
  const params = {
    chat_id: options.chatId,
    video: options.video,
    duration: options.duration,
    width: options.width,
    height: options.height,
    thumbnail: options.thumbnail,
    caption: options.caption,
    parse_mode: options.parseMode,
    caption_entities: options.captionEntities,
    has_spoiler: options.hasSpoiler,
    supports_streaming: options.supportsStreaming,
    disable_notification: options.notification,
    protect_content: options.content,
    reply_to_message_id: options.replyToMessageId,
    allow_sending_without_reply: options.allowReply,
    reply_markup: options.replyMarkup
  };
  const response = await this.request(method, params);

  if (!!response?.error_code) {

  

    throw new TelegramApiError(response.description);
  }
   return response.result;
  }


  async sendAnimation(options) {
    const method = 'sendAnimation';
    const params = {
      chat_id: options.chatId,
      animation: options.animation,
      duration: options.duration,
      width: options.width,
      height: options.height,
      thumbnail: options.thumbnail,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      has_spoiler: options.hasSpoiler,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup,
      message_thread_id: options.threadId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendVoice(options) {
    const method = 'sendVoice';
    const params = {
      chat_id: options.chatId,
      voice: options.voice,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      duration: options.duration,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup,
      message_thread_id: options.threadId,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendVideoNote(options) {
  const method = 'sendVideoNote';
  const params = {
    chat_id: options.chatId,
    video_note: options.videoNote,
    duration: options.duration,
    length: options.length,
    thumbnail: options.thumbnail,
    disable_notification: options.notification,
    protect_content: options.content,
    message_thread_id: options.threadId,
    reply_to_message_id: options.replyToMessageId,
    allow_sending_without_reply: options.allowReply,
    reply_markup: optiono.replyMarkup
  };
  const response = await this.request(method, params);

  if (!!response?.error_code) {

  

    throw new TelegramApiError(response.description);
  }
   return response.result;
  }

  async sendMediaGroup(options) {
  const method = 'sendMediaGroup';
  const params = {
    chat_id: options.chatId,
    disable_notification: options.notification,
    protect_content: options.content,
    message_thread_id: options.threadId,
    reply_to_message_id: options.replyToMessageId,
    allow_sending_without_reply: options.allowReply,
    media: options.media.map(media => ({
      type: media.type,
      media: media.media,
      caption: media.caption,
      parse_mode: media.parseMode,
      width: media.width,
      height: media.height,
      duration: media.duration,
      supports_streaming: media.supportsStreaming
    }))
  };
  const response = await this.request(method, params);

  if (!!response?.error_code) {

  

    throw new TelegramApiError(response.description);
  }
  return response.result;
 }

  async sendLocation(options) {
    const method = 'sendLocation';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.threadId,
      latitude: options.latitude,
      longitude: options.longitude,
      horizontal_accuracy: options.accuracy,
      live_period: options.livePeriod,
      heading: options.heading,
      proximity_alert_radius: options.proximityRadius,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async sendVenue(options) {
    const method = 'sendVenue';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.threadId,
      latitude: options.latitude,
      longitude: options.longitude,
      title: options.title,
      address: options.address,
      foursquare_id: options.foursquareId,
      foursquare_type: options.foursquareType,
      google_place_id: options.googlePlaceId,
      google_place_type: options.googlePlaceType,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

   
   async forwardMessage(options) {
    const method = 'forwardMessage';
    const params = {
      chat_id: options.chatId,
      from_chat_id: options.fromChatId,
      message_id: options.messageId,
      message_thread_id: options.threadId,
      disable_notification: options.notification,
      protect_content: options.content
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
   }
   
   async copyMessage(options) {
    const method = 'copyMessage';
    const params = {
      chat_id: options.chatId,
      from_chat_id: options.fromChatId,
      message_id: options.messageId,
      message_thread_id: options.threadId,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowSendingWithoutReply,
      reply_markup: options.replyMarkup
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
   }
   
   async sendContact(options) {
    const method = 'sendContact';
    const params = {
      chat_id: options.chatId,
      phone_number: options.phoneNumber,
      first_name: options.firstName,
      last_name: options.lastName,
      vcard: options.vcard,
      disable_notification: options.notification,
      protect_content: options.content,
      message_thread_id: options.threadId,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendPoll(options) {
    const method = 'sendPoll';
    const params = {
      chat_id: options.chatId,
      question: options.question,
      options: JSON.stringify(options.options),
      is_anonymous: options.isAnonymous,
      type: options.type,
      allows_multiple_answers: options.allowsMultipleAnswers,
      correct_option_id: options.correctOptionId,
      explanation: options.explanation,
      explanation_parse_mode: options.explanationParseMode,
      explanation_entities: JSON.stringify(options.explanationEntities),
      open_period: options.openPeriod,
      close_date: options.closeDate,
      is_closed: options.isClosed,
      disable_notification: options.notification,
      protect_content: options.content,
      message_thread_id: options.threadId,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendDice(options) {
    const method = 'sendDice';
    const params = {
      chat_id: options.chatId,
      emoji: options.emoji,
      disable_notification: options.notification,
      protect_content: options.content,
      message_thread_id: options.threadId,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendChatAction(options) {
    const method = 'sendChatAction';
    const params = {
      chat_id: options.chatId,
      action: options.action,
      message_thread_id: options.threadId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async getUserProfilePhotos(options) {
    const method = 'getUserProfilePhotos';
    const params = {
      user_id: options.userId,
      offset: options.offset,
      limit: options.limit
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

    throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async getFile(options) {
    const method = 'getFile';
    const params = { file_id: options.fileId };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async downloadFile(options) {
    const fileUrl = `https://api.telegram.org/file/bot${this.token}/${options.filePath}`;
    return new Promise((resolve, reject) => {
      https.get(fileUrl, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download file: ${res.statusCode}`));
          return;
        }
        let chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    });
  }
  
  async banChatMember(options) {
    const method = 'banChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId,
      until_date: options.untilDate,
      revoke_messages: options.revokeMessages
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async unbanChatMember(options) {
    const method = 'unbanChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId,
      only_if_banned: options.onlyIfBanned
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

    throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async restrictChatMember(options) {
    const method = 'restrictChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId,
      permissions: JSON.stringify(options.permissions),
      use_independent_chat_permissions: options.useIndependentChatPermissions,
      until_date: options.untilDate
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async promoteChatMember(options) {
    const method = 'promoteChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId,
      is_anonymous: options.isAnonymous,
      can_manage_chat: options.canManageChat,
      can_post_messages: options.canPostMessages,
      can_edit_messages: options.canEditMessages,
      can_delete_messages: options.canDeleteMessages,
      can_manage_video_chats: options.canManageVideoChats,
      can_restrict_members: options.canRestrictMembers,
      can_promote_members: options.canPromoteMembers,
      can_change_info: options.canChangeInfo,
      can_invite_users: options.canInviteUsers,
      can_pin_messages: options.canPinMessages,
      can_manage_topics: options.canManageTopics
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setChatAdministratorCustomTitle(options) {
    const method = 'setChatAdministratorCustomTitle';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId,
      custom_title: options.customTitle
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return true;
  }
  
  async banChatSenderChat(options) {
    const method = 'banChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: optiond.senderChatId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async unbanChatSenderChat(options) {
    const method = 'unbanChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: options.senderChatId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setChatPermissions(options) {
    const method = 'setChatPermissions';
    const params = {
      chat_id: options.chatId,
      permissions: JSON.stringify(options.permissions),
      use_independent_chat_permissions: options.independentPermissions
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  

  async portChatInviteLink(options) {
    const method = 'exportChatInviteLink';
    const params = {
      chat_id: options.chatId
    }
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async createChatInviteLink(options) {
    const method = 'createChatInviteLink';
    const params = {
      chat_id: options.chatId,
      name: options.name,
      expire_date: options.expireDate,
      member_limit: options.memberLimit,
      creates_join_request: options.createsJoinRequest
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async editChatInviteLink(options) {
    const method = 'editChatInviteLink';
    const params = {
      chat_id: options.chatId,
      invite_link: options.inviteLink,
      name: options.name,
      expire_date: options.expireDate,
      member_limit: options.memberLimit,
      creates_join_request: options.createsJoinRequest
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async revokeChatInviteLink(options) {
    const method = 'revokeChatInviteLink';
    const params = {
      chat_id: options.chatId,
      invite_link: options.inviteLink
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async approveChatJoinRequest(options) {
    const method = 'approveChatJoinRequest';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async declineChatJoinRequest(options) {
    const method = 'declineChatJoinRequest';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  

  async setChatPhoto(options) {
    const method = 'setChatPhoto';
    const params = {
      chat_id: options.chatId,
      photo: options.photo
    };

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async deleteChatPhoto(options) {
    const method = 'deleteChatPhoto';
    const params = {
      chat_id: options.chatId
    };

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setChatTitle(options) {
    const method = 'setChatTitle';
    const params = {
      chat_id: options.chatId,
      title: options.title
    };

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setChatDescription(options) {
    const method = 'setChatDescription';
    const params = {
      chat_id: options.chatId,
      description: options.description
    };

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async pinChatMessage(options) {
    const method = 'pinChatMessage';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      disable_notification: options.notification
    };

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async unpinChatMessage(options) {
    const method = 'unpinChatMessage';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async unpinAllChatMessages(options) {
    const method = 'unpinAllChatMessages';
    const params = {
      chat_id: options.chatId,
    };
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async leaveChat(options) {
    const method = 'leaveChat';
    const params = {
      chat_id: options.chatId,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getChat(options) {
    const method = 'getChat';
    const params = {
      chat_id: options.chatId,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getChatAdministrators(options) {
    const method = 'getChatAdministrators';
    const params = {
      chat_id: options.chatId,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getChatMemberCount(options) {
    const method = 'getChatMemberCount';
    const params = {
      chat_id: options.chatId,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  

  async getChatMember(options) {

    const method = 'getChatMember';
    const params = {
      chat_id: options.chatId,
      user_id: options.userId
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setChatStickerSet(options) {

    const method = 'setChatStickerSet';
    const params = {
      chat_id: options.chatId,
      sticker_set_name: options.stickerSetName
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async deleteChatStickerSet(options) {
    const method = 'deleteChatStickerSet';
    const params = {
      chat_id: options.chatId
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async getForumTopicIconStickers() {
    const method = 'getForumTopicIconStickers';
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async createForumTopic(options) {
    const method = 'createForumTopic';
    const params = {
      chat_id: options.chatId,
      name: options.name,
      icon_color: options.iconColor,
      icon_custom_emoji_id: options.iconCustomEmojiId
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async editForumTopic(options) {
    const method = 'editForumTopic';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.messageThreadId,
      name: options.name,
      icon_custom_emoji_id: options.iconCustomEmojiId
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async closeForumTopic(options) {
    const method = 'closeForumTopic';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.messageThreadId
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async reopenForumTopic(options) {
    const method = 'reopenForumTopic';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.messageThreadId
    }

    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
  }
  
  async deleteForumTopic(options) {
    const method = 'deleteForumTopic';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.messageThreadId
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async unpinAllForumTopicMessages(options) {
    const method = 'unpinAllForumTopicMessages';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.messageThreadId
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async editGeneralForumTopic(options) {
    const method = 'editGeneralForumTopic';
    const params = {
      chat_id: options.chatId,
      name: options.name
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async closeGeneralForumTopic(options) {
    const method = 'closeGeneralForumTopic';
    const params = {
      chat_id: options.chatId
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async reopenGeneralForumTopic(options) {
    const method = 'reopenGeneralForumTopic';
    const params = {
      chat_id: options.chatId
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async hideGeneralForumTopic(options) {
    const method = 'hideGeneralForumTopic';
    const params = {
      chat_id: options.chatId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return true;
  }
  
  async unhideGeneralForumTopic(options) {
    const method = 'unhideGeneralForumTopic';
    const params = {
      chat_id: options.chatId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return true;
  }
  
  async answerCallbackQuery(options) {
    const method = 'answerCallbackQuery';
    const params = {
      callback_query_id: options.callbackQueryId,
      text: options.text,
      show_alert: options.showAlert,
      url: options.url,
      cache_time: options.cacheTime
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return true;
  }
  
  async setMyCommands(options) {
    const method = 'setMyCommands';
    const params = {
      commands: options.commands,
      scope: options?.scope,
      language_code: options?.languageCode
    };
    return await this.request(method, params);
  }
  
  async deleteMyCommands(options) {
    const method = 'deleteMyCommands';
    const params = {
      scope: options?.scope,
      language_code: options?.languageCode
    };
    return await this.request(method, params);
  }
  
  async getMyCommands(options) {
    const method = 'getMyCommands';
    const params = {
      scope: options?.scope,
      language_code: options?.languageCode
    };
    return await this.request(method, params);
  }
  
  async setMyDescription(options) {
    const method = 'setMyDescription';
    const params = {
      description: options.description,
      language_code: options.languageCode
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {

    
      console.log(response);

      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getMyDescription(options) {
    const method = 'getMyDescription';
    const params = {
      language_code: options?.languageCode
    }
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async setMyShortDescription(options) {
    const method = 'setMyShortDescription';
    const params = {
      short_description: options.description,
      language_code: options.languageCode
    }
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getMyShortDescription(options) {
    const method = 'getMyShortDescription';
    const params = {
      language_code: options?.languageCode
    }
    
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setChatMenuButton(options) {
    const method = 'setChatMenuButton';
    const params = {
      chat_id: options.chatId,
      menu_button: options.menuButton
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getChatMenuButton(options) {
    const method = 'getChatMenuButton';
    const params = {
      chat_id: options.chatId
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async setMyDefaultAdministratorRights(options) {
    const method = 'setMyDefaultAdministratorRights';
    const params = {
      rights: options.rights,
      for_channels: options.forChannels
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getMyDefaultAdministratorRights(options) {
    const method = 'getMyDefaultAdministratorRights';
    const params = {
      for_channels: options.forChannels
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async editMessageText(options) {
    const method = 'editMessageText';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      inline_message_id: options.inlineMessageId,
      text: options.text,
      parse_mode: options.parseMode,
      entities: options.entities,
      disable_web_page_preview: options.disableWebPagePreview,
      reply_markup: options.replyMarkup,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async editMessageCaption(options) {
    const method = 'editMessageCaption';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      inline_message_id: options.inlineMessageId,
      caption: options.caption,
      parse_mode: options.parseMode,
      caption_entities: options.captionEntities,
      reply_markup: options.replyMarkup,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async editMessageMedia(options) {
    const method = 'editMessageMedia';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      inline_message_id: options.inlineMessageId,
      media: options.media,
      reply_markup: options.replyMarkup,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async editMessageLiveLocation(options) {
    const method = 'editMessageLiveLocation';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      inline_message_id: options.inlineMessageId,
      latitude: options.latitude,
      longitude: options.longitude,
      horizontal_accuracy: options.horizontalAccuracy,
      heading: options.heading,
      proximity_alert_radius: options.proximityAlertRadius,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async stopMessageLiveLocation(options) {
    const method = 'stopMessageLiveLocation';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      inline_message_id: options.inlineMessageId,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async editMessageReplyMarkup(options) {
    const method = 'editMessageReplyMarkup';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      inline_message_id: options.inlineMessageId,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async stopPoll(options) {
    const method = 'stopPoll';
    const params = {
      chat_id: options.chatId,
      message_id: options.messageId,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendSticker(options) {
    const method = 'sendSticker';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.threadId,
      sticker: options.sticker,
      emoji: options.emoji,
      disable_notification: options.notification,
      protect_content: options.content,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowReply,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getStickerSet(options) {
    const method = 'getStickerSet';
    const params = {
      name: options.name
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async getCustomEmojiStickers(options) {
    const method = 'getCustomEmojiStickers';
    const params = {
      custom_emoji_ids: options.customEmojiIds
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async uploadStickerFile(options) {
    const method = 'uploadStickerFile';
    const params = {
      user_id: options.userId,
      sticker: options.sticker,
      sticker_format: options.stickerFormat,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async createNewStickerSet(options) {
    const method = 'createNewStickerSet';
    const params = {
      user_id: options.userId,
      name: options.name,
      title: options.title,
      stickers: JSON.stringify(options.stickers),
      sticker_format: options.stickerFormat,
      sticker_type: options.stickerType,
      needs_repainting: options.needsRepainting,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async addStickerToSet(options) {
    const method = 'addStickerToSet';
    const params = {
      user_id: options.userId,
      name: options.name,
      sticker: JSON.stringify(options.sticker),
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async setStickerPositionInSet(options) {
    const method = 'setStickerPositionInSet';
    const params = {
      sticker: options.sticker,
      position: options.position,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async deleteStickerFromSet(options) {
    const method = 'deleteStickerFromSet';
    const params = {
      sticker: options.sticker,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setStickerEmoji(options) {
    const method = 'setStickerEmoji';
    const params = {
      sticker: options.sticker,
      emoji_list: options.emojiList
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setStickerKeywords(options) {
    const method = 'setStickerKeywords';
    const params = {
      sticker: options.sticker,
      keywords: options.keywords
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setStickerMaskPosition(options) {
    const method = 'setStickerMaskPosition';
    const params = {
      sticker: options.sticker,
      mask_position: options.maskPosition
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setStickerSetTitle(options) {
    const method = 'setStickerSetTitle';
    const params = {
      name: options.name,
      title: options.title
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setStickerSetThumbnail(options) {
    const method = 'setStickerSetThumbnail';
    const params = {
      name: options.name,
      user_id: options.userId,
      thumbnail: options.thumbnail
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async setCustomEmojiStickerSetThumbnail(options) {
    const method = 'setCustomEmojiStickerSetThumbnail';
    const params = {
      name: options.name,
      custom_emoji_id: options.customEmojiId
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async deleteStickerSet(options) {
    const method = 'deleteStickerSet';
    const params = {
      name: options.name
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async setStickerKeywords(options) {
    const method = 'setStickerKeywords';
    const params = {
      sticker: options.sticker,
      keywords: options.keywords
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }

  async setStickerMaskPosition(options) {
    const method = 'setStickerMaskPosition';
    const params = {
      sticker: options.sticker,
      mask_position: options.maskPosition
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async answerInlineQuery(options) {
    const method = 'answerInlineQuery';
    const params = {
      inline_query_id: options.inlineQueryId,
      results: options.results,
      cache_time: options.cacheTime || 300,
      is_personal: options.isPersonal,
      next_offset: options.nextOffset || '',
      switch_pm_text: options.switchPmText,
      switch_pm_parameter: options.switchPmParameter
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async answerInlineQuery(options) {
    const method = 'answerInlineQuery';
    const params = {
      inline_query_id: options.inlineQueryId,
      results: options.results,
      cache_time: options.cacheTime || 300,
      is_personal: options.isPersonal,
      next_offset: options.nextOffset || '',
      switch_pm_text: options.switchPmText,
      switch_pm_parameter: options.switchPmParameter
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async answerWebAppQuery(options) {
    const method = 'answerWebAppQuery';
    const params = {
      web_app_query_id: options.queryId,
      result: options.inlineQueryResult
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendInvoice(options) {
    const method = 'sendInvoice';
    const params = {
      chat_id: options.chatId,
      message_thread_id: options.messageThreadId,
      title: options.title,
      description: options.description,
      payload: options.payload,
      provider_token: options.providerToken,
      currency: options.currency,
      prices: options.prices,
      max_tip_amount: options.maxTipAmount,
      suggested_tip_amounts: options.suggestedTipAmounts,
      start_parameter: options.startParameter,
      provider_data: options.providerData,
      photo_url: options.photoUrl,
      photo_size: options.photoSize,
      photo_width: options.photoWidth,
      photo_height: options.photoHeight,
      need_name: options.needName,
      need_phone_number: options.needPhoneNumber,
      need_email: options.needEmail,
      need_shipping_address: options.needShippingAddress,
      send_phone_number_to_provider: options.sendPhoneNumberToProvider,
      send_email_to_provider: options.sendEmailToProvider,
      is_flexible: options.isFlexible,
      disable_notification: options.disableNotification,
      protect_content: options.protectContent,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowSendingWithoutReply,
      reply_markup: options.replyMarkup,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async createInvoiceLink(options) {
    const method = 'createInvoiceLink';
    const params = {
      title: options.title,
      description: options.description,
      payload: options.payload,
      provider_token: options.providerToken,
      currency: options.currency,
      prices: options.prices,
      max_tip_amount: options.maxTipAmount,
      suggested_tip_amounts: options.suggestedTipAmounts,
      provider_data: options.providerData,
      photo_url: options.photoUrl,
      photo_size: options.photoSize,
      photo_width: options.photoWidth,
      photo_height: options.photoHeight,
      need_name: options.needName,
      need_phone_number: options.needPhoneNumber,
      need_email: options.needEmail,
      need_shipping_address: options.needShippingAddress,
      send_phone_number_to_provider: options.sendPhoneNumberToProvider,
      send_email_to_provider: options.sendEmailToProvider,
      is_flexible: options.isFlexible,
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async answerShippingQuery(options) {
    const method = 'answerShippingQuery';
    const params = {
      shipping_query_id: options.queryId,
      ok: options.isDeliveryPossible,
      shipping_options: options.shippingOptions,
    error_message: options.errorMessage,
    };
   const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async answerPreCheckoutQuery(options) {
    const method = 'answerPreCheckoutQuery';
    const params = {
      pre_checkout_query_id: options.preCheckoutQueryId,
      ok: options.ok,
      error_message: options.errorMessage
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async setPassportDataErrors(options) {
    const method = 'setPassportDataErrors';
    const params = {
      user_id: options.userId,
      errors: JSON.stringify(options.errors)
    };
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
  async sendGame(options) {
    const method = 'sendGame';
    const params = {
      chat_id: options.chatId,
      game_short_name: options.gameShortName,
      disable_notification: options.disableNotification,
      protect_content: options.protectContent,
      message_thread_id: options.messageThreadId,
      reply_to_message_id: options.replyToMessageId,
      allow_sending_without_reply: options.allowSendingWithoutReply,
      reply_markup: options.replyMarkup
    }
    const response = await this.request(method, params);

    if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
    }
    return response.result;
  }
  
   async deleteMessage(options) {
     const method = 'deleteMessage';
     const params = {
       chat_id: options.chatId,
       message_id: options.messageId,
       revoke: options.revoke
     };
     
     const response = await this.request(method, params);

     if (!!response?.error_code) {
      throw new TelegramApiError(response.description);
     }
     return response.result;
   }
  
  async createChat(options) {
    const method = 'createChat';
    const params = {
      chat_type: options.type,
      title: options.title
    };
    const response = await this.request(method, params);
    if (!!response?.error_code) {
      throw new TelegramApiError(response.description)
    }
    return response.result;
  }

  
  async deleteWebhook() {
    const response = await this.request('deleteWebhook', {});
    return response.result;
  }

}

module.exports = BaseClient;