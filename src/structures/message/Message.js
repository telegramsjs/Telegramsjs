const { Base } = require("../Base");
const { User } = require("../misc/User");
const { SharedUser } = require("../misc/SharedUser");
const { ChatShared } = require("../misc/ChatShared");
const { Chat } = require("../chat/Chat");
const {
  VideoChatParticipantsInvited,
} = require("../chat/VideoChatParticipantsInvited");
const { Game } = require("../game/Game");
const { Animation } = require("../media/Animation");
const { Audio } = require("../media/Audio");
const { Contact } = require("../media/Contact");
const { Dice } = require("../media/Dice");
const { Document } = require("../media/Document");
const { Photo } = require("../media/Photo");
const { Poll } = require("../media/Poll");
const { Sticker } = require("../media/Sticker");
const { Video } = require("../media/Video");
const { VideoNote } = require("../media/VideoNote");
const { Voice } = require("../media/Voice");
const { PaidMediaInfo } = require("../media/paid/PaidMediaInfo");
const { SuccessfulPayment } = require("../invoice/SuccessfulPayment");
const { Location } = require("../misc/Location");
const { Venue } = require("../misc/Venue");
const { LinkPreviewOptions } = require("../misc/LinkPreviewOptions");
const { RefundedPayment } = require("../invoice/RefundedPayment");
const { MessageOrigin } = require("../message/MessageOrigin");
const { MessageEntities } = require("../message/MessageEntities");
const { ExternalReplyInfo } = require("../misc/ExternalReplyInfo");
const { ChatBackground } = require("../chat/ChatBackground");
const { Giveaway } = require("../giveaway/Giveaway");
const { GiveawayWinners } = require("../giveaway/GiveawayWinners");
const { GiveawayCompleted } = require("../giveaway/GiveawayCompleted");
const { VideoChatScheduled } = require("../chat/VideoChatScheduled");
const { Forum } = require("../forum/Forum");
const { ForumTopicEdited } = require("../forum/ForumTopic");
const { ForumTopic } = require("../forum/ForumTopic");
const { TextQuote } = require("../misc/TextQuote");
const { PassportData } = require("../passport/PassportData");
const { MessageCollector } = require("../../util/collector/MessageCollector");
const { ReactionCollector } = require("../../util/collector/ReactionCollector");
const {
  InlineKeyboardCollector,
} = require("../../util/collector/InlineKeyboardCollector");
const { TelegramError } = require("../../errors/TelegramError");

/**
 * @typedef {import("../../types").MethodParameters} MethodParameters
 */

class Message extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").Message} data - Data about the message
   */
  constructor(client, data) {
    super(client);

    /** Unique message identifier inside this chat */
    this.id = data.message_id;

    this._patch(data);
  }

  _patch(data) {
    if ("message_thread_id" in data) {
      /**
       * Unique identifier of a message thread or a forum topic to which the message belongs; for supergroups only
       * @type {number | undefined}
       */
      this.threadId = data.message_thread_id;
    }

    if ("from" in data) {
      /**
       * Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat.
       * @type {import("../misc/User").User | undefined}
       */
      this.author = this.client.users._add(data.from);
    }

    if ("chat" in data) {
      /**
       * Chat the message belongs to
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = this.client.chats._add({
        ...data.chat,
        threadId: this.threadId,
      });

      if (!this.chat.isPrivate() && this.author) {
        /**
         * Member that were added to the message group or supergroup and information about them
         * @type {import("../chat/ChatMember").ChatMember | undefined}
         */
        this.member = this.chat.members._add(this.chat.id, true, {
          id: data.from.id,
          extras: [{ user: data.from }],
        });
      }
    }

    if ("text" in data) {
      /**
       * For text messages, the actual UTF-8 text of the message
       * @type {string | undefined}
       */
      this.content = data.text;
    }

    if ("caption" in data) {
      /**
       * Caption for the animation, audio, document, photo, video or voice
       * @type {string | undefined}
       */
      this.caption = data.caption;
    }

    if ("caption_entities" in data) {
      /**
       * For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
       * @type {MessageEntities | undefined}
       */
      this.captionEntities = new MessageEntities(
        data.caption,
        data.caption_entities,
      );
    }

    if ("entities" in data) {
      /**
       * For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
       * @type {MessageEntities | undefined}
       */
      this.entities = new MessageEntities(data.text, data.entities);
    }

    if ("sender_boost_count" in data) {
      /**
       * If the sender of the message boosted the chat, the number of boosts added by the user
       * @type {number | undefined}
       */
      this.senderBoostCount = data.sender_boost_count;
    }

    if ("sender_business_bot" in data) {
      /**
       * The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account.
       * @type {User | undefined}
       */
      this.senderBusinessBot = new User(this.client, data.sender_business_bot);
    }

    if ("forward_origin" in data) {
      /**
       * Information about the original message for forwarded messages
       * @type {MessageOrigin | undefined}
       */
      this.forwardOrigin = new MessageOrigin(this.client, data.forward_origin);
    }

    if ("is_automatic_forward" in data) {
      /**
       * True, if the message is a channel post that was automatically forwarded to the connected discussion group
       * @type {boolean | undefined}
       */
      this.automaticForward = data.is_automatic_forward;
    }

    if ("reply_to_message" in data) {
      /**
       * For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply
       * @type {Message | undefined}
       */
      this.originalMessage = new Message(this.client, data.reply_to_message);
    }

    if ("external_reply" in data) {
      /**
       * Information about the message that is being replied to, which may come from another chat or forum topic
       * @type {ExternalReplyInfo | undefined}
       */
      this.externalReply = new ExternalReplyInfo(
        this.client,
        data.external_reply,
      );
    }

    if ("quote" in data) {
      /**
       * For replies that quote part of the original message, the quoted part of the message
       * @type {TextQuote | undefined}
       */
      this.quote = new TextQuote(data.quote);
    }

    if ("story" in data) {
      /**
       * @typedef {Object} Story
       * @property {number} id - Unique identifier for the story in the chat
       * @property {Chat} chat - Chat that posted the story
       */

      const story = {
        id: data.story.id,
        chat: new Chat(this.client, {
          ...data.story.chat,
          threadId: this.threadId,
        }),
      };

      /**
       * For replies to a story, the original message
       * @type {Story | undefined}
       */
      this.story = story;
    }

    if ("via_bot" in data) {
      /**
       * Bot through which the message was sent
       * @type {User | undefined}
       */
      this.viaBot = new User(this.client, data.via_bot);
    }

    if ("has_protected_content" in data) {
      /**
       * True, if the message can't be forwarded
       * @type {true | undefined}
       */
      this.protectedContent = data.has_protected_content;
    }

    if ("show_caption_above_media" in data) {
      /**
       * True, if the caption must be shown above the message media
       * @type {true | undefined}
       */
      this.showAboveMedia = data.show_caption_above_media;
    }

    if ("is_from_offline" in data) {
      /**
       * True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message
       * @type {true | undefined}
       */
      this.authorOffline = data.is_from_offline;
    }

    if ("author_signature" in data) {
      /**
       * Signature of the post author for messages in channels, or the custom title of an anonymous group administrator
       * @type {true | undefined}
       */
      this.authorSignature = data.author_signature;
    }

    if ("link_preview_options" in data) {
      /**
       * Options used for link preview generation for the message, if it is a text message and link preview options were changed
       * @type {LinkPreviewOptions | undefined}
       */
      this.linkPreviewOpts = new LinkPreviewOptions(data.link_preview_options);
    }

    if ("effect_id" in data) {
      /**
       * Unique identifier of the message effect added to the message
       * @type {string | undefined}
       */
      this.effectId = data.effect_id;
    }

    if ("sender_chat" in data) {
      /**
       * Chat that sent the message originally
       * @type {Chat | undefined}
       */
      this.senderChat = new Chat(this.client, {
        ...data.sender_chat,
        threadId: this.threadId,
      });
    }

    /**
     * Date the message was sent in Unix time. It is always a positive number, representing a valid date
     * @type {number}
     */
    this.createdTimestamp = data.date;

    if ("edit_date" in data) {
      /**
       * Date the message was last edited in Unix time
       * @type {number | undefined}
       */
      this.editedTimestamp = data.edit_date;
    }

    if ("business_connection_id" in data) {
      /**
       * Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier
       * @type {string | undefined}
       */
      this.businessId = data.business_connection_id;
    }

    if ("is_topic_message" in data) {
      if ("chat" in this && "threadId" in this) {
        /**
         * If the message is sent to a forum topic
         * @type {Forum | undefined}
         */
        this.forum = new Forum(this.client, this.threadId, this.chat.id);
      }

      /**
       * True, if the message is sent to a forum topic
       * @type {number | undefined}
       */
      this.inTopic = data.is_topic_message;
    }

    if ("new_chat_member" in data) {
      /**
       * New member that were added to the group or supergroup and information about them (the bot itself may be one of these member)
       * @type {User | undefined}
       */
      this.newChatMember = new User(this.client, data.new_chat_member);
    }

    if ("new_chat_members" in data) {
      /**
       * New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
       * @type {User[] | undefined}
       */
      this.newChatMembers = data.new_chat_members.map(
        (user) => new User(this.client, user),
      );
    }

    if ("left_chat_member" in data) {
      /**
       * A member was removed from the group, information about them (this member may be the bot itself)
       * @type {User | undefined}
       */
      this.leftChatMember = new User(this.client, data.left_chat_member);
    }

    if ("new_chat_title" in data) {
      /**
       * A chat title was changed to this value
       * @type {string | undefined}
       */
      this.newChatTitle = data.new_chat_title;
    }

    if ("new_chat_photo" in data) {
      /**
       * A chat photo was change to this value
       * @type {Photo[] | undefined}
       */
      this.newChatPhoto = data.new_chat_photo.map(
        (photo) => new Photo(this.client, data.new_chat_photo),
      );
    }

    if ("delete_chat_photo" in data) {
      /**
       * Service message: the chat photo was deleted
       * @type {true | undefined}
       */
      this.deleteChatPhoto = data.delete_chat_photo;
    }

    if ("group_chat_created" in data) {
      /**
       * Service message: the group has been created
       * @type {true | undefined}
       */
      this.groupChatCreated = data.group_chat_created;
    }

    if ("supergroup_chat_created" in data) {
      /**
       * Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup
       * @type {true | undefined}
       */
      this.supergroupChatCreated = data.supergroup_chat_created;
    }

    if ("channel_chat_created" in data) {
      /**
       * Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel
       * @type {true | undefined}
       */
      this.channelChatCreated = data.channel_chat_created;
    }

    if ("message_auto_delete_timer_changed" in data) {
      /**
       * @typedef {Object} MessageAutoDeleteTimerChanged
       * @property {number} autoDelTime - New auto-delete time for messages in the chat; in seconds
       */

      const messageAutoDeleteTimerChanged = {
        autoDelTime:
          data.message_auto_delete_timer_changed.message_auto_delete_time,
      };

      /**
       * Service message: auto-delete timer settings changed in the chat
       * @type {MessageAutoDeleteTimerChanged | undefined}
       */
      this.autoDelTimerChanged = messageAutoDeleteTimerChanged;
    }

    if ("migrate_to_chat_id" in data) {
      /**
       * The group has been migrated to a supergroup with the specified identifier
       * @type {number | undefined}
       */
      this.migrateToChatId = data.migrate_to_chat_id;
    }

    if ("migrate_to_chat_id" in data) {
      /**
       * The supergroup has been migrated from a group with the specified identifier
       * @type {number | undefined}
       */
      this.migrateFromChatId = data.migrate_to_chat_id;
    }

    if ("successful_payment" in data) {
      /**
       * Message is a service message about a successful payment, information about the payment. More about payments
       * @type {SuccessfulPayment | undefined}
       */
      this.successfulPayment = new SuccessfulPayment(
        this.client,
        data.successful_payment,
      );
    }

    if ("refunded_payment" in data) {
      /**
       * Message is a service message about a refunded payment, information about the payment. More about payments
       * @type {RefundedPayment | undefined}
       */
      this.refundedPayment = new RefundedPayment(
        this.client,
        data.refunded_payment,
      );
    }

    if ("users_shared" in data) {
      /**
       * Service message: users were shared with the bot
       * @type {SharedUser | undefined}
       */
      this.usersShared = new SharedUser(this.client, data.users_shared);
    }

    if ("chat_shared" in data) {
      /**
       * Service message: a chat was shared with the bot
       * @type {ChatShared | undefined}
       */
      this.chatShared = new ChatShared(this.client, data.chat_shared);
    }

    if ("connected_website" in data) {
      /**
       * The domain name of the website on which the user has logged in. More about Telegram Login
       * @type {string | undefined}
       */
      this.connectedWebsite = data.connected_website;
    }

    if ("write_access_allowed" in data) {
      /**
       * @typedef {Object} WiteAccessAllowed
       * @property {boolean | undefined} authorRequest - True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess
       * @property {string | undefined} appName - Name of the Web App, if the access was granted when the Web App was launched from a link
       * @property {boolean | undefined} authorAttachmentMenu - True, if the access was granted when the bot was added to the attachment or side menu
       */

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

      /**
       * Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess
       * @type {WiteAccessAllowed | undefined}
       */
      this.writeAccessAllowed = writeAccessAllowed;
    }

    if ("passport_data" in data) {
      /**
       * Telegram Passport data
       * @type {PassportData | undefined}
       */
      this.passport = new PassportData(data.passport_data);
    }

    if ("proximity_alert_triggered" in data) {
      /**
       * @typedef {Object} ProximityAlertTriggered
       * @property {User} traveler - User that triggered the alert
       * @property {User} watcher - User that set the alert
       * @property {number} distance - The distance between the users
       */

      const proximityAlertTriggered = {
        traveler: new User(
          this.client,
          data.proximity_alert_triggered.traveler,
        ),
        watcher: new User(this.client, data.proximity_alert_triggered.watcher),
        distance: data.proximity_alert_triggered.distance,
      };

      /**
       * Service message. A user in the chat triggered another user's proximity alert while sharing Live Location
       * @type {ProximityAlertTriggered | undefined}
       */
      this.proximityAlertTriggered = proximityAlertTriggered;
    }

    if ("boost_added" in data) {
      /**
       * @typedef {Object} BoostAdded
       * @property {number} count - Number of boosts added by the user
       */

      const boostAdded = {
        count: data.boost_added.boost_count,
      };

      /**
       * Service message: user boosted the chat
       * @type {BoostAdded | undefined}
       */
      this.boostAdded = boostAdded;
    }

    if ("chat_background_set" in data) {
      /**
       * Service message: chat background set
       * @type {ChatBackground | undefined}
       */
      this.chatBackgroundSet = new ChatBackground(
        this.client,
        data.chat_background_set,
      );
    }

    if ("forum_topic_created" in data) {
      /**
       * Service message: forum topic created
       * @type {ForumTopic | undefined}
       */
      this.forumCreated = new ForumTopic(
        this.client,
        this.threadId,
        this.chat?.id,
        data.forum_topic_created,
      );
    }

    if ("forum_topic_edited" in data) {
      /**
       * Service message: forum topic edited
       * @type {ForumTopic | undefined}
       */
      this.forumEdited = new ForumTopic(
        this.client,
        this.threadId,
        this.chat?.id,
        data.forum_topic_edited,
      );
    }

    if ("forum_topic_closed" in data) {
      /**
       * Service message: forum topic closed
       * @type {true | undefined}
       */
      this.forumClosed = true;
    }

    if ("forum_topic_reopened" in data) {
      /**
       * Service message: forum topic reopened
       * @type {true | undefined}
       */
      this.forumTopicReopened = true;
    }

    if ("general_forum_topic_hidden" in data) {
      /**
       * Service message: the 'General' forum topic hidden
       * @type {true | undefined}
       */
      this.generalForumHidden = true;
    }

    if ("general_forum_topic_unhidden" in data) {
      /**
       * Service message: the 'General' forum topic unhidden
       * @type {true | undefined}
       */
      this.generalForumUnhidden = true;
    }

    if ("giveaway_created" in data) {
      /**
       * Service message: a scheduled giveaway was created
       * @type {true | undefined}
       */
      this.giveawayCreated = true;
    }

    if ("giveaway" in data) {
      /**
       * The message is a scheduled giveaway message
       * @type {Giveaway | undefined}
       */
      this.giveaway = new Giveaway(this.client, data.giveaway);
    }

    if ("giveaway_winners" in data) {
      /**
       * A giveaway with public winners was completed
       * @type {GiveawayWinners | undefined}
       */
      this.giveawayWinners = new GiveawayWinners(
        this.client,
        data.giveaway_winners,
      );
    }

    if ("giveaway_completed" in data) {
      /**
       * Service message: a giveaway without public winners was completed
       * @type {GiveawayCompleted | undefined}
       */
      this.giveawayCompleted = new GiveawayCompleted(
        this.client,
        data.giveaway_completed,
      );
    }

    if ("video_chat_scheduled" in data) {
      /**
       * Service message: video chat scheduled
       * @type {VideoChatScheduled | undefined}
       */
      this.videoChatScheduled = new VideoChatScheduled(
        data.video_chat_scheduled,
      );
    }

    if ("video_chat_started" in data) {
      /**
       * Service message: video chat started
       * @type {true | undefined}
       */
      this.videoChatStarted = true;
    }

    if ("video_chat_ended" in data) {
      /**
       * @typedef {Object} VideoChatEnded
       * @property {number} duration - Video chat duration in seconds
       */

      /**
       * Service message: video chat ended
       * @type {VideoChatEnded | undefined}
       */
      this.videoChatEnded = data.video_chat_ended;
    }

    if ("video_chat_participants_invited" in data) {
      /**
       * Service message: new participants invited to a video chat
       * @type {VideoChatParticipantsInvited | undefined}
       */
      this.videoChatParticiInvited = new VideoChatParticipantsInvited(
        this.client,
        data.video_chat_participants_invited,
      );
    }

    if ("web_app_data" in data) {
      /**
       * @typedef {Object} WebAppData
       * @property {string} data - The data. Be aware that a bad client can send arbitrary data in this field
       * @property {string} text - Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field
       */
      const webAppData = {
        data: data.web_app_data.data,
        text: data.web_app_data.button_text,
      };

      /**
       * Service message: data sent by a Web App
       * @type {WebAppData | undefined}
       */
      this.webApp = webAppData;
    }

    if ("location" in data) {
      /**
       * Message is a shared location, information about the location
       * @type {Location | undefined}
       */
      this.location = new Location(this.client, data.location);
    }

    if ("paid_media" in data) {
      /**
       * Message contains paid media; information about the paid media
       * @type {PaidMediaInfo | undefined}
       */
      this.paidMedia = new PaidMediaInfo(this.client, data.paid_media);
    }

    if ("animation" in data) {
      /**
       * Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set
       * @type {Animation | undefined}
       */
      this.animation = new Animation(this.client, data.animation);
    }

    if ("audio" in data) {
      /**
       * Message is an audio file, information about the file
       * @type {Audio | undefined}
       */
      this.audio = new Audio(this.client, data.audio);
    }

    if ("document" in data) {
      /**
       * Message is a general file, information about the file
       * @type {Document | undefined}
       */
      this.document = new Document(this.client, data.document);
    }

    if ("photo" in data) {
      /**
       * Message is a photo, available sizes of the photo
       * @type {Photo[] | undefined}
       */
      this.photo = data.photo.map((photo) => new Photo(this.client, photo));
    }

    if ("video" in data) {
      /**
       * Message is a video, information about the video
       * @type {Video | undefined}
       */
      this.video = new Video(this.client, data.video);
    }

    if ("video_note" in data) {
      /**
       * Message is a video note, information about the video message
       * @type {VideoNote | undefined}
       */
      this.videoNote = new VideoNote(this.client, data.video_note);
    }

    if ("voice" in data) {
      /**
       * Message is a voice message, information about the file
       * @type {Voice | undefined}
       */
      this.voice = new Voice(this.client, data.voice);
    }

    if ("sticker" in data) {
      /**
       * Message is a sticker, information about the sticker
       * @type {Sticker | undefined}
       */
      this.sticker = new Sticker(this.client, data.sticker);
    }

    if ("contact" in data) {
      /**
       * Message is a shared contact, information about the contact
       * @type {Contact | undefined}
       */
      this.contact = new Contact(data.contact);
    }

    if ("poll" in data) {
      /**
       * Message is a native poll, information about the poll
       * @type {Poll | undefined}
       */
      this.poll = new Poll(this.client, data.poll);
    }

    if ("venue" in data) {
      /**
       * Message is a venue, information about the venue
       * @type {Venue | undefined}
       */
      this.venue = new Venue(data.venue);
    }

    if ("game" in data) {
      /**
       * Message is a game, information about the game. More about games
       * @type {Game | undefined}
       */
      this.game = new Game(this.client, data.game);
    }

    if ("dice" in data) {
      /**
       * Message is a dice with random value
       * @type {Dice | undefined}
       */
      this.dice = new Dice(data.dice);
    }

    return data;
  }

  /**
   * @return {this is this & { editedTimestamp: number }}
   */
  get isEdited() {
    return Boolean(this.editedTimestamp);
  }

  /**
   * Date the message was sent. It is always a positive number, representing a valid date
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * Date the message was last edited
   * @type {Date}
   */
  get editedAt() {
    return new Date(this.editedTimestamp);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, Message>} [options={}] - message collector options
   * @return {import("../../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    return new MessageCollector(this.client, this, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, Message>} [options={}] - message collector options
   * @return {Promise<[import("@telegram.ts/collection").Collection<number, Message>, string]>}
   */
  awaitMessage(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve, reject) => {
      const collect = this.createMessageCollector(_options);
      collect.on("end", (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @typedef {import("../../util/collector/Collector").ICollectorOptions<number, Message>} AwaitMessagesOptions
   * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
   */

  /**
   * @param {AwaitMessagesOptions} [options={}] - message collector options
   * @return {Promise<import("@telegram.ts/collection").Collection<number, Message> | [import("@telegram.ts/collection").Collection<number, Message>, string]>}
   */
  awaitMessages(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createMessageCollector(options);
      collect.on("end", (collections, reason) => {
        if (options.errors?.includes(reason)) {
          reject([collection, reason]);
        } else {
          resolve(collection);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @return {import("../../util/collector/ReactionCollector").ReactionCollector}
   */
  createReactionCollector(options = {}) {
    return new ReactionCollector(this.client, this, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @return {Promise<[import("@telegram.ts/collection").Collection<number, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
   */
  awaitReaction(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createReactionCollector(options);
      collect.on("end", (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<number, import("../CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
   * @return {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /*
   * Reply to the current message
   * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @return {Promise<Message & { content: string; }>} - On success, the sent Message is returned.
   */
  reply(text, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.sendMessage({
      text,
      chatId: this.chat.id,
      messageThreadId: this.threadId,
      replyParameters: {
        messageId: this.id,
      },
      ...options,
    });
  }

  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param {string | import("@telegram.ts/types").ReactionType} reaction - A list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators
   * @param {boolean} [isBig] - Pass True to set the reaction with a big animation
   * @return {Promise<true>} - Returns True on success.
   */
  react(reaction, isBig) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    let react = [];

    if (typeof reaction === "string") {
      react.push({ type: "emoji", emoji: reaction });
    } else if (typeof reaction === "object") {
      react.push(reaction);
    } else {
      react = reaction;
    }

    return this.client.setMessageReaction({
      reaction: react,
      chatId: this.chat.id,
      messageId: this.id,
      isBig,
    });
  }

  /**
   * Use this method to edit text and game messages.
   * @param {string} text - New text of the message, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageText"], "text" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<Message & {content: string; editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(text, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageText({
      text,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit captions of messages.
   * @param {string} [caption] - New caption of the message, 0-1024 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageCaption"], "caption" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<Message & { caption?: string; editedTimestamp: number; }>}
   */
  editCaption(caption, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageCaption({
      caption,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param {import("@telegram.ts/types").InputMedia} media - An object for a new media content of the message
   * @param {Omit<MethodParameters["editMessageMedia"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(media, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageMedia({
      media,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit only the reply markup of messages.
   * @param {import("@telegram.ts/types").InlineKeyboardMarkup} replyMarkup - An object for an inline keyboard
   * @param  {Omit<MethodParameters["editMessageReplyMarkup"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { editedTimestamp: number; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(replyMarkup, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageReplyMarkup({
      replyMarkup,
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded.
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["forwardMessage"], "chatId" | "fromChatId" | "messageId" | "messageThreadId">} [options={}] - out parameters
   * @return {Promise<Message>} - On success, the sent Message is returned.
   */
  forward(chatId, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.forwardMessage({
      chatId: chatId,
      messageThreadId: this.threadId,
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["copyMessage"], "chatId" | "fromChatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<number>} - Returns the message id of the sent message on success.
   */
  copy(chatId, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.copyMessage({
      chatId: chatId,
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param {boolean} [notification=false] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
   * @return {Promise<true>} - Returns True on success.
   */
  pin(notification = false) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.pinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      disableNotification: notification,
    });
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @return {Promise<true>} - Returns True on success.
   */
  unpin() {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.unpinChatMessage(this.chat.id, this.id);
  }

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
  - A message can only be deleted if it was sent less than 48 hours ago.
  - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
  - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
  - Bots can delete outgoing messages in private chats, groups, and supergroups.
  - Bots can delete incoming messages in private chats.
  - Bots granted can_post_messages permissions can delete outgoing messages in channels.
  - If the bot is an administrator of a group, it can delete any message there.
  - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   * @return {Promise<true>} - Returns True on success.
   */
  delete() {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.deleteMessage(this.chat.id, this.id);
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param {number} latitude - Latitude of new location
   * @param {number} longitude - Longitude of new location
   * @param {Omit<MethodParameters["editMessageLiveLocation"], "latitude" | "longitude" | "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { location: Location }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(latitude, longitude, options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.editMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      latitude,
      longitude,
      ...options,
    });
  }

  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param {Omit<MethodParameters["stopMessageLiveLocation"], "chatId" | "messageId">} [options={}] - out parameters
   * @return {Promise<true | Message & { location: Location }>} - On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(options = {}) {
    if (!this.chat) {
      throw new TelegramError(
        "Could not find the chat where this message came from in the cache!",
      );
    }

    return this.client.stopMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }
}

module.exports = { Message };
