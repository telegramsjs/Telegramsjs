const { Base } = require("./Base");
const { User } = require("./User");
const { Chat } = require("./Chat");
const { Game } = require("./Game");
const { Animation } = require("./media/Animation");
const { Audio } = require("./media/Audio");
const { Contact } = require("./media/Contact");
const { Dice } = require("./media/Dice");
const { Document } = require("./media/Document");
const { Photo } = require("./media/Photo");
const { Poll } = require("./media/Poll");
const { Sticker } = require("./media/Sticker");
const { Video } = require("./media/Video");
const { VideoNote } = require("./media/VideoNote");
const { Voice } = require("./media/Voice");
const { SuccessfulPayment } = require("./invoice/SuccessfulPayment");
const { Location } = require("./Location");
const { Venue } = require("./Venue");
const { LinkPreviewOptions } = require("./LinkPreviewOptions");
const { MessageOrigin } = require("./MessageOrigin");
const { MessageEntities } = require("./MessageEntities");
const { ExternalReplyInfo } = require("./ExternalReplyInfo");
const { ChatBackground } = require("./chat/ChatBackground");
const { Giveaway } = require("./Giveaway");
const { GiveawayWinners } = require("./GiveawayWinners");
const { GiveawayCompleted } = require("./GiveawayCompleted");
const { VideoChatScheduled } = require("./VideoChatScheduled");
const {
  VideoChatParticipantsInvited,
} = require("./VideoChatParticipantsInvited");
const { Forum } = require("./forum/Forum");
const { ForumTopic } = require("./forum/ForumTopic");
const { TextQuote } = require("./TextQuote");

/**
 * Represents a message on Discord.
 * @extends {Base}
 */
class Message extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.message_id;

    this._patch(data);
  }

  _patch(data) {
    if ("message_thread_id" in data) {
      this.threadId = data.message_thread_id;
    }

    if ("from" in data) {
      this.author = this.client.users._add(data.from);
    }

    if ("chat" in data) {
      this.chat = this.client.chats._add(data.chat);

      if (!this.chat.isPrivate()) {
        this.member = this.chat.members._add(this.chat.id, true, {
          id: data.from.id,
          extras: [{ user: data.from }],
        });
      }
    }

    if ("text" in data) {
      this.content = data.text;
    }

    if ("caption" in data) {
      this.caption = data.caption;
    }

    if ("caption_entities" in data) {
      this.captionEntities = new MessageEntities(
        data.caption,
        data.caption_entities,
      );
    }

    if ("entities" in data) {
      this.entities = new MessageEntities(data.text, data.entities);
    }

    if ("sender_boost_count" in data) {
      this.senderBoostCount = data.sender_boost_count;
    }

    if ("sender_business_bot" in data) {
      this.senderBusinessBot = new User(data.sender_business_bot);
    }

    if ("forward_origin" in data) {
      this.forwardOrigin = new MessageOrigin(this.client, data.forward_origin);
    }

    if ("is_automatic_forward" in data) {
      this.automaticForward = data.is_automatic_forward;
    }

    if ("reply_to_message" in data) {
      this.originalMessage = new Message(this.client, data.reply_to_message);
    }

    if ("external_reply" in data) {
      this.externalReply = new ExternalReplyInfo(
        this.client,
        data.external_reply,
      );
    }

    if ("quote" in data) {
      this.quote = new TextQuote(data.quote);
    }

    if ("story" in data) {
      const story = {
        id: data.story.id,
        chat: new Chat(this.client, data.story.chat),
      };
      this.story = story;
    }

    if ("via_bot" in data) {
      this.viaBot = new User(this.client, data.via_bot);
    }

    if ("has_protected_content" in data) {
      this.protectedContent = data.has_protected_content;
    }

    if ("show_caption_above_media" in data) {
      this.showAboveMedia = data.show_caption_above_media;
    }

    if ("is_from_offline" in data) {
      this.authorOffline = data.is_from_offline;
    }

    if ("author_signature" in data) {
      this.authorSignature = data.author_signature;
    }

    if ("link_preview_options" in data) {
      this.linkPreviewOpts = new LinkPreviewOptions(data.link_preview_options);
    }

    if ("effect_id" in data) {
      this.effectId = data.effect_id;
    }

    if ("sender_chat" in data) {
      this.senderChat = new Chat(this.client, data.sender_chat);
    }

    this.createdTimestamp = data.date;

    if ("edit_date" in data) {
      this.editedTimestamp = data.edit_date;
    }

    if ("business_connection_id" in data) {
      this.businessId = data.business_connection_id;
    }

    if ("is_topic_message" in data) {
      if ("chat" in this && "threadId" in this) {
        this.forum = new Forum(this.client, this.threadId, this.chat.id);
      }
      this.inTopic = data.is_topic_message;
    }

    if ("new_chat_members" in data) {
      this.newChatMembers = data.new_chat_members.map(
        (user) => new User(this.client, user),
      );
    }

    if ("left_chat_members" in data) {
      this.leftChatMembers = data.new_chat_members.map(
        (user) => new User(this.client, user),
      );
    }

    if ("new_chat_title" in data) {
      this.newChatTitle = data.new_chat_title;
    }

    if ("new_chat_photo" in data) {
      this.newChatPhoto = data.new_chat_photo.map(
        (photo) => new Photo(this.client, data.new_chat_photo),
      );
    }

    if ("delete_chat_photo" in data) {
      this.deleteChatPhoto = data.delete_chat_photo;
    }

    if ("group_chat_created" in data) {
      this.groupChatCreated = data.group_chat_created;
    }

    if ("supergroup_chat_created" in data) {
      this.supergroupChatCreated = data.supergroup_chat_created;
    }

    if ("channel_chat_created" in data) {
      this.channelChatCreated = data.channel_chat_created;
    }

    if ("message_auto_delete_timer_changed" in data) {
      const messageAutoDeleteTimerChanged = {
        autoDelTime:
          data.message_auto_delete_timer_changed.message_auto_delete_time,
      };
      this.autoDelTimerChanged = messageAutoDeleteTimerChanged;
    }

    if ("migrate_to_chat_id" in data) {
      this.migrateToChatId = data.migrate_to_chat_id;
    }

    if ("migrate_to_chat_id" in data) {
      this.migrateFromChatId = data.migrate_to_chat_id;
    }

    if ("successful_payment" in data) {
      this.successfulPayment = new SuccessfulPayment(data.successful_payment);
    }

    if ("users_shared" in data) {
      this.usersShared = data.users_shared;
    }

    if ("chat_shared" in data) {
      this.chatShared = data.chat_shared;
    }

    if ("connected_website" in data) {
      this.connectedWebsite = data.connected_website;
    }

    if ("write_access_allowed" in data) {
      const writeAccessAllowed = {};

      if ("from_request" in data.write_access_allowed) {
        writeAccessAllowed.authorRequest =
          data.write_access_allowed.from_request;
      }

      if ("web_app_name" in data.write_access_allowed) {
        writeAccessAllowed.appName = data.write_access_allowed.web_app_name;
      }

      if ("from_attachment_menu" in data.write_access_allowed) {
        writeAccessAllowed.authorAttachmentMenu =
          data.write_access_allowed.from_attachment_menu;
      }

      this.writeAccessAllowed = writeAccessAllowed;
    }

    if ("passport_data" in data) {
      this.passport = new PassportData(data.passport_data);
    }

    if ("proximity_alert_triggered" in data) {
      const proximityAlertTriggered = {
        traveler: new User(
          this.client,
          data.proximity_alert_triggered.traveler,
        ),
        watcher: new User(this.client, data.proximity_alert_triggered.watcher),
        distance: data.proximity_alert_triggered.distance,
      };

      this.proximityAlertTriggered = proximityAlertTriggered;
    }

    if ("boost_added" in data) {
      const boostAdded = {
        count: data.boost_added.boost_count,
      };
      this.boostAdded = boostAdded;
    }

    if ("chat_background_set" in data) {
      this.chatBackgroundSet = new ChatBackground(
        this.client,
        data.chat_background_set,
      );
    }

    if ("forum_topic_created" in data) {
      this.forumCreated = new ForumTopic(
        this.client,
        this.threadId,
        this.chat?.id,
        data.forum_topic_created,
      );
    }

    if ("forum_topic_edited" in data) {
      this.forumEdited = new ForumTopicEdited(
        this.client,
        data.forum_topic_edited,
      );
    }

    if ("forum_topic_closed" in data) {
      this.forumClosed = true;
    }

    if ("forum_topic_reopened" in data) {
      this.forumTopicReopened = true;
    }

    if ("general_forum_topic_hidden" in data) {
      this.generalForumHidden = true;
    }

    if ("general_forum_topic_unhidden" in data) {
      this.generalForumUnhidden = true;
    }

    if ("giveaway_created" in data) {
      this.giveawayCreated = true;
    }

    if ("giveaway" in data) {
      this.giveaway = new Giveaway(this.client, data.giveaway);
    }

    if ("giveaway_winners" in data) {
      this.giveawayWinners = new GiveawayWinners(
        this.client,
        data.giveaway_winners,
      );
    }

    if ("giveaway_completed" in data) {
      this.giveawayCompleted = new GiveawayCompleted(
        this.client,
        data.giveaway_completed,
      );
    }

    if ("video_chat_scheduled" in data) {
      this.videoChatScheduled = new VideoChatScheduled(
        data.video_chat_scheduled,
      );
    }

    if ("video_chat_started" in data) {
      this.videoChatStarted = true;
    }

    if ("video_chat_ended" in data) {
      this.videoChatEnded = data.video_chat_ended;
    }

    if ("video_chat_participants_invited" in data) {
      this.videoChatParticiInvited = new VideoChatParticipantsInvited(
        this.client,
        data.video_chat_participants_invited,
      );
    }

    if ("web_app_data" in data) {
      const webAppData = {
        data: data.web_app_data.data,
        text: data.web_app_data.button_text,
      };
      this.webApp = webAppData;
    }

    if ("location" in data) {
      this.location = new Location(this.client, data.location);
    }

    if ("animation" in data) {
      this.animation = new Animation(this.client, data.animation);
    }

    if ("audio" in data) {
      this.audio = new Audio(this.client, data.audio);
    }

    if ("document" in data) {
      this.document = new Document(this.client, data.document);
    }

    if ("photo" in data) {
      this.photo = data.photo.map((photo) => new Photo(this.client, photo));
    }

    if ("video" in data) {
      this.video = new Video(this.client, data.video);
    }

    if ("video_note" in data) {
      this.videoNote = new VideoNote(this.client, data.video_note);
    }

    if ("voice" in data) {
      this.voice = new Voice(this.client, data.voice);
    }

    if ("sticker" in data) {
      this.sticker = new Sticker(this.client, data.sticker);
    }

    if ("contact" in data) {
      this.contact = new Contact(data.contact);
    }

    if ("poll" in data) {
      this.poll = new Poll(this.client, data.poll);
    }

    if ("venue" in data) {
      this.venue = new Venue(data.venue);
    }

    if ("game" in data) {
      this.game = new Game(this.client, data.game);
    }

    if ("dice" in data) {
      this.dice = new Dice(data.dice);
    }
  }

  reply(text, options = {}) {
    return this.client.sendMessage({
      text,
      chat_id: this.chat.id,
      message_thread_id: this.threadId,
      reply_parameters: {
        message_id: this.id,
      },
      ...options,
    });
  }

  react(reaction, options = {}) {
    const react = [];

    if (typeof reaction === "string") {
      react.push({ type: "emoji", emoji: reaction });
    } else if (typeof reaction === "object") {
      react.push(reaction);
    }

    return this.client.setMessageReaction({
      reaction: react,
      chat_id: this.chat.id,
      message_id: this.id,
    });
  }

  edit(text, options = {}) {
    return this.client.editMessageText({
      text,
      chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  editCaption(caption, options = {}) {
    return this.client.editMessageCaption({
      caption,
      chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  editMedia(media, options = {}) {
    return this.client.editMessageMedia({
      media,
      chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  editReplyMarkup(replyMarkup, options = {}) {
    return this.client.editMessageReplyMarkup({
      media,
      chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  forward(chatId, options = {}) {
    return this.client.forwardMessage({
      chat_id: chatId,
      message_thread_id: this.threadId,
      from_chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  copy(chatId, options = {}) {
    return this.client.copyMessage({
      chat_id: chatId,
      from_chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  pin(notification = false) {
    return this.client.pinChatMessage({
      chat_id: this.chat.id,
      message_id: this.id,
      disable_notification: notification,
    });
  }

  unpin() {
    return this.client.unpinChatMessage(this.chat.id, this.id);
  }

  delete() {
    return this.client.deleteMessage(this.chat.id, this.id);
  }

  editLiveLocation(latitude, longitude, options = {}) {
    return this.client.editMessageLiveNotification({
      chat_id: this.chat.id,
      message_id: this.id,
      latitude,
      longitude,
      ...options,
    });
  }

  stopLiveLocation(options = {}) {
    return this.client.stopMessageLiveLocation({
      chat_id: this.chat.id,
      message_id: this.id,
      ...options,
    });
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  get editedAt() {
    return new Date(this.editedTimestamp);
  }
}

module.exports = { Message };
