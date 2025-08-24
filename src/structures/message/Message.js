// @ts-check
const { Base } = require("../Base");
const { UsersShared } = require("../misc/UsersShared");
const { ChatShared } = require("../misc/ChatShared");
const { ChatMember } = require("../chat/ChatMember");
const { Checklist } = require("../checklist/Checklist");
const { Story } = require("../story/Story");
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
const { ForumTopic } = require("../forum/ForumTopic");
const { TextQuote } = require("../misc/TextQuote");
const { PassportData } = require("../passport/PassportData");
const { MessageCollector } = require("../../util/collector/MessageCollector");
const { ReactionCollector } = require("../../util/collector/ReactionCollector");
const {
  InlineKeyboardCollector,
} = require("../../util/collector/InlineKeyboardCollector");
const {
  CollectorEvents,
  ReactionCollectorEvents,
} = require("../../util/Constants");
const { ReactionType } = require("../misc/ReactionType");
const { GiftInfo } = require("../gift/GiftInfo");
const { UniqueGiftInfo } = require("../gift/UniqueGiftInfo");
const { TelegramError } = require("../../errors/TelegramError");
const { ErrorCodes } = require("../../errors/ErrorCodes");
const { Collection } = require("@telegram.ts/collection");

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

    /** Unique message identifier inside this chat. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent */
    this.id = String(data.message_id);

    this._patch(data);

    /**
     * Date the message was sent in Unix time. It is always a positive number, representing a valid date
     * @type {number}
     */
    this.createdUnixTime = data.date;

    if ("edit_date" in data) {
      /**
       * Date the message was last edited in Unix time
       * @type {number | undefined}
       */
      this.editedUnixTime = data.edit_date;
    }
  }

  /**
   * @param {import("@telegram.ts/types").Message} data - Data about the message
   * @override
   */
  _patch(data) {
    if ("message_thread_id" in data) {
      /**
       * Unique identifier of a message thread or a forum topic to which the message belongs; for supergroups only
       * @type {string | undefined}
       */
      this.threadId = String(data.message_thread_id);
    }

    if ("from" in data) {
      /**
       * Sender of the message; may be empty for messages sent to channels. For backward compatibility, if the message was sent on behalf of a chat, the field contains a fake sender user in non-channel chats
       * @type {import("../misc/User").User | undefined}
       */
      this.author = this.client.users._add(data.from);
    }

    if ("is_topic_message" in data) {
      if ("chat" in this && this.chat && "threadId" in this && this.threadId) {
        /**
         * If the message is sent to a forum topic
         * @type {Forum | undefined}
         */
        this.forum = new Forum(this.client, this.threadId, this.chat.id);
      }

      /**
       * True, if the message is sent to a forum topic
       * @type {boolean | undefined}
       */
      this.inTopic = data.is_topic_message;
    }

    if ("direct_messages_topic" in data) {
      /**
       * @typedef {Object} DirectMessagesTopic
       * @property {number} id - Unique identifier of the topic.
       * @property {import("../misc/User").User} user - Information about the user that created the topic. Currently, it is always present.
       */

      /**
       * Information about the direct messages chat topic that contains the message.
       * @type {DirectMessagesTopic | undefined}
       */
      this.directMessagesTopic = {
        id: data.direct_messages_topic.topic_id,
        user: this.client.users._add(data.direct_messages_topic.user),
      };
    }

    if ("chat" in data) {
      /**
       * Sender of the message when sent on behalf of a chat. For example, the supergroup itself for messages sent by its anonymous administrators or a linked channel for messages automatically forwarded to the channel's discussion group. For backward compatibility, if the message was sent on behalf of a chat, the field *from* contains a fake sender user in non-channel chats.
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = this.client.chats._add({
        ...data.chat,
        ...(data.chat.type !== "private" && {
          threadId: this.threadId,
          inTopic: this.inTopic,
        }),
      });

      if (!this.chat.isPrivate() && data.from) {
        /**
         * Member that were added to the message group or supergroup and information about them
         * @type {ChatMember | undefined}
         */
        this.member = new ChatMember(this.client, this.chat.id, {
          user: data.from,
          status: "member",
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

    if ("caption_entities" in data && "caption" in data) {
      /**
       * For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
       * @type {MessageEntities | undefined}
       */
      this.captionEntities = new MessageEntities(
        this.client,
        data.caption,
        data.caption_entities,
      );
    }

    if ("entities" in data && "text" in data) {
      /**
       * For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
       * @type {MessageEntities | undefined}
       */
      this.entities = new MessageEntities(
        this.client,
        data.text,
        data.entities,
      );
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
       * @type {import("../misc/User").User | undefined}
       */
      this.senderBusinessBot = this.client.users._add(data.sender_business_bot);
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

    if ("reply_to_checklist_task_id" in data) {
      /**
       * Identifier of the specific checklist task that is being replied to
       * @type {number | undefined}
       */
      this.checklistTaskId = data.reply_to_checklist_task_id;
    }

    if ("is_paid_post" in data) {
      /**
       * True, if the message is a paid post. Note that such posts must not be deleted for 24 hours to receive the payment and can't be edited.
       * @type {true | undefined}
       */
      this.isPaidPost = data.is_paid_post;
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
      this.quote = new TextQuote(this.client, data.quote);
    }

    if ("story" in data) {
      /**
       * For replies to a story, the original message
       * @type {Story | undefined}
       */
      this.story = new Story(this.client, data.story);
    }

    if ("via_bot" in data) {
      /**
       * Bot through which the message was sent
       * @type {import("../misc/User").User | undefined}
       */
      this.viaBot = this.client.users._add(data.via_bot);
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
       * @type {string | undefined}
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

    if ("paid_star_count" in data) {
      /**
       * The number of Telegram Stars that were paid by the sender of the message to send it.
       * @type {number | undefined}
       */
      this.paidStarCount = data.paid_star_count;
    }

    if ("sender_chat" in data) {
      /**
       * Chat that sent the message originally
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.senderChat = this.client.chats._add({
        ...data.sender_chat,
        ...(data.sender_chat.type !== "private" && {
          threadId: this.threadId,
          inTopic: this.inTopic,
        }),
      });
    }

    if ("business_connection_id" in data) {
      /**
       * Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier
       * @type {string | undefined}
       */
      this.businessId = data.business_connection_id;
    }

    if ("new_chat_members" in data) {
      /**
       * New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
       * @type {Collection<string, import("../misc/User").User> | undefined}
       */
      this.newChatMembers = new Collection(
        data.new_chat_members.map((user) => [
          String(user.id),
          this.client.users._add(user),
        ]),
      );
    }

    if ("left_chat_member" in data) {
      /**
       * A member was removed from the group, information about them (this member may be the bot itself)
       * @type {import("../misc/User").User | undefined}
       */
      this.leftChatMember = this.client.users._add(data.left_chat_member);
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
        (photo) => new Photo(this.client, photo),
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
       * The supergroup has been migrated from a group with the specified identifier
       * @type {string | undefined}
       */
      this.migrateFromChatId = String(data.migrate_to_chat_id);
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
       * @type {UsersShared | undefined}
       */
      this.usersShared = new UsersShared(this.client, data.users_shared);
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
       * @property {boolean} [authorRequest] - True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess
       * @property {string} [appName] - Name of the Web App, if the access was granted when the Web App was launched from a link
       * @property {boolean} [authorAttachmentMenu] - True, if the access was granted when the bot was added to the attachment or side menu
       */

      /** @type {WiteAccessAllowed} */
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
      this.passport = new PassportData(this.client, data.passport_data);
    }

    if ("proximity_alert_triggered" in data) {
      /**
       * @typedef {Object} ProximityAlertTriggered
       * @property {import("../misc/User").User} traveler - User that triggered the alert
       * @property {import("../misc/User").User} watcher - User that set the alert
       * @property {number} distance - The distance between the users
       */

      /** @type {ProximityAlertTriggered} */
      const proximityAlertTriggered = {
        traveler: this.client.users._add(
          data.proximity_alert_triggered.traveler,
        ),
        watcher: this.client.users._add(data.proximity_alert_triggered.watcher),
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

    if ("forum_topic_created" in data && this.threadId && this.chat) {
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

    if ("forum_topic_edited" in data && this.threadId && this.chat) {
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
       * @typedef {Object} GiveawayCreated
       * @property {number} [starCount] - The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only
       */

      /**
       * Service message: a scheduled giveaway was created
       * @type {GiveawayCreated | undefined}
       */
      this.giveawayCreated = {
        ...("prize_star_count" in data.giveaway_created && {
          starCount: data.giveaway_created.prize_star_count,
        }),
      };
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

    if ("gift" in data) {
      /**
       * Service message: a regular gift was sent or received
       * @type {GiftInfo | undefined}
       */
      this.gift = new GiftInfo(this.client, data.gift);
    }

    if ("unique_gift" in data) {
      /**
       * Service message: a unique gift was sent or received
       * @type {UniqueGiftInfo | undefined}
       */
      this.uniqueGift = new UniqueGiftInfo(this.client, data.unique_gift);
    }

    if ("paid_message_price_changed" in data) {
      /** Service message: the price for paid messages has changed in the chat; The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message */
      this.paidPriceStartCount =
        data.paid_message_price_changed.paid_message_star_count;
    }

    if ("direct_message_price_changed" in data) {
      /**
       * @typedef {Object} DirectMessagePriceChanged
       * @property {boolean} messagesEnabled - True, if direct messages are enabled for the channel chat; false otherwise.
       * @property {number} [messageStarCount] - The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Defaults to 0.
       */

      /**
       * Service message: the price for paid messages in the corresponding direct messages chat of a channel has changed
       * @type {DirectMessagePriceChanged | undefined}
       */
      this.directMessagePriceChanged = {
        messagesEnabled:
          data.direct_message_price_changed.are_direct_messages_enabled,
        ...(data.direct_message_price_changed.direct_message_star_count && {
          messageStarCount:
            data.direct_message_price_changed.direct_message_star_count,
        }),
      };
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

    if ("checklist" in data) {
      /**
       * Message is a checklist
       * @type {Checklist | undefined}
       */
      this.checklist = new Checklist(this.client, data.checklist);
    }

    if ("checklist_tasks_done" in data) {
      /**
       * Service message: some tasks in a checklist were marked as done or not done
       * @type {ChecklistTasksDone | undefined}
       */
      this.checklistTasksDone = new ChecklistTasksDone(
        this.client,
        data.checklist_tasks_done,
      );
    }

    if ("checklist_tasks_added" in data) {
      /**
       * Service message: tasks were added to a checklist
       * @type {ChecklistTasksAdded | undefined}
       */
      this.checklistTasksAdded = new ChecklistTasksAdded(
        this.client,
        data.checklist_tasks_added,
      );
    }

    if ("suggested_post_info" in data) {
      /**
       * Information about suggested post parameters if the message is a suggested post in a channel direct messages chat. If the message is an approved or declined suggested post, then it can't be edited.
       * @type {SuggestedPostInfo | undefined}
       */
      this.suggestedPostInfo = new SuggestedPostInfo(data.suggested_post_info);
    }

    if ("suggested_post_approved" in data) {
      /**
       * Service message: a suggested post was approved
       * @type {SuggestedPostApproved | undefined}
       */
      this.suggestedPostApproved = new SuggestedPostApproved(
        this.client,
        data.suggested_post_approved,
      );
    }

    if ("suggested_post_approval_failed" in data) {
      /**
       * Service message: approval of a suggested post has failed
       * @type {SuggestedPostApprovalFailed | undefined}
       */
      this.suggestedPostApprovalFailed = new SuggestedPostApprovalFailed(
        this.client,
        data.suggested_post_approval_failed,
      );
    }

    if ("suggested_post_declined" in data) {
      /**
       * Service message: a suggested post was declined
       * @type {SuggestedPostDeclined | undefined}
       */
      this.suggestedPostDeclined = new SuggestedPostDeclined(
        this.client,
        data.suggested_post_declined,
      );
    }

    if ("suggested_post_paid" in data) {
      /**
       * Service message: payment for a suggested post was received
       * @type {SuggestedPostPaid | undefined}
       */
      this.suggestedPostPaid = new SuggestedPostPaid(
        this.client,
        data.suggested_post_paid,
      );
    }

    if ("suggested_post_refunded" in data) {
      /**
       * Service message: payment for a suggested post was refunded
       * @type {SuggestedPostRefunded | undefined}
       */
      this.suggestedPostRefunded = new SuggestedPostRefunded(
        this.client,
        data.suggested_post_refunded,
      );
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
      this.venue = new Venue(this.client, data.venue);
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
   * Checking if the message has been edited
   * @returns {this is this & { editedUnixTime: number; editedTimestamp: number; editedAt: Date }}
   */
  isEdited() {
    return Boolean(
      this.editedUnixTime && this.editedTimestamp && this.editedAt,
    );
  }

  /**
   * Checking if the message video has been pending.
   * @remarks The check will only be valid on December 1, 2024.
   * @returns {boolean}
   */
  isPendingVideoMessage() {
    return this.id === "0";
  }

  /**
   * Return the timestamp message was sent, in milliseconds
   */
  get createdTimestamp() {
    return this.createdUnixTime * 1000;
  }

  /**
   * Date the message was sent. It is always a positive number, representing a valid date
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * Return the timestamp message was last edited, in milliseconds
   */
  get editedTimestamp() {
    return this.editedUnixTime ? this.editedUnixTime * 1000 : null;
  }

  /**
   * Date the message was last edited
   * @type {null | Date}
   */
  get editedAt() {
    return this.editedTimestamp ? new Date(this.editedTimestamp) : null;
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, Message>} [options={}] - message collector options
   * @returns {import("../../util/collector/MessageCollector").MessageCollector}
   */
  createMessageCollector(options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return new MessageCollector(this.client, this.chat, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, Message>} [options={}] - message collector options
   * @returns {Promise<[import("@telegram.ts/collection").Collection<string, Message>, string]>}
   */
  awaitMessage(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve) => {
      const collect = this.createMessageCollector(_options);
      collect.on(CollectorEvents.End, (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, Message> & { errors?: string[] }} [options={}] - message collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, Message>>}
   */
  awaitMessages(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createMessageCollector(options);
      collect.on(CollectorEvents.End, (collections, reason) => {
        if (options.errors?.includes(reason)) {
          reject(collections);
        } else {
          resolve(collections);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @returns {import("../../util/collector/ReactionCollector").ReactionCollector}
   */
  createReactionCollector(options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return new ReactionCollector(this.client, this.chat, options);
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated>} [options={}] - reaction collector options
   * @returns {Promise<[import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>, string]>}
   */
  awaitReaction(options = {}) {
    const _options = { ...options, max: 1 };
    return new Promise((resolve) => {
      const collect = this.createReactionCollector(_options);
      collect.on(ReactionCollectorEvents.End, (collections, reason) => {
        resolve([collections, reason]);
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../MessageReactionUpdated").MessageReactionUpdated> & { errors?: string[] }} [options={}] - reaction collector options
   * @returns {Promise<import("@telegram.ts/collection").Collection<string, import("../MessageReactionUpdated").MessageReactionUpdated>>}
   */
  awaitReactions(options = {}) {
    return new Promise((resolve, reject) => {
      const collect = this.createReactionCollector(options);
      collect.on(ReactionCollectorEvents.End, (collections, reason) => {
        if (options.errors?.includes(reason)) {
          reject(collections);
        } else {
          resolve(collections);
        }
      });
    });
  }

  /**
   * @param {import("../../util/collector/Collector").ICollectorOptions<string, import("../CallbackQuery").CallbackQuery>} [options={}] - inline keyboard collector options
   * @returns {InlineKeyboardCollector}
   */
  createMessageComponentCollector(options = {}) {
    return new InlineKeyboardCollector(this.client, options);
  }

  /**
   * Reply to the current message
   * @param {string} text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["sendMessage"], "text" | "chatId" | "messageThreadId">} [options={}] - out parameters
   * @returns {Promise<Message & { content: string; }>} - On success, the sent Message is returned.
   */
  reply(text, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.sendMessage({
      text,
      chatId: this.chat.id,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      replyParameters: {
        message_id: this.id,
        ...(this.checklistTaskId && { checklistTaskId: this.checklistTaskId }),
      },
      ...options,
    });
  }

  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param {string | import("@telegram.ts/types").ReactionType | import("@telegram.ts/types").ReactionType[] | ReactionType | ReactionType[]} reaction - A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots
   * @param {boolean} [isBig] - Pass True to set the reaction with a big animation
   * @returns {Promise<true>} - Returns True on success.
   */
  react(reaction, isBig) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    /** @type {any[]} */
    let react = [];

    if (typeof reaction === "string") {
      react.push({ type: "emoji", emoji: reaction });
    } else if (reaction instanceof ReactionType) {
      const reactionData = reaction.isEmoji()
        ? { type: "emoji", emoji: reaction.emoji }
        : { type: "custom_emoji", customEmojiId: reaction.customEmojiId };
      react.push(reactionData);
    } else if (Array.isArray(reaction)) {
      reaction.forEach((rea) => {
        if (rea instanceof ReactionType) {
          const reactionData = rea.isEmoji()
            ? { type: "emoji", emoji: rea.emoji }
            : { type: "custom_emoji", customEmojiId: rea.customEmojiId };
          react.push(reactionData);
        } else {
          react.push(rea);
        }
      });
    } else if (typeof reaction === "object") {
      react.push(reaction);
    } else {
      react = reaction;
    }

    return this.client.setMessageReaction({
      reaction: react,
      chatId: this.chat.id,
      messageId: this.id,
      ...(isBig && { isBig }),
    });
  }

  /**
   * Use this method to edit text and game messages.
   * @param {string} text - New text of the message, 1-4096 characters after entities parsing
   * @param {Omit<MethodParameters["editMessageText"], "text" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | (Message & {content: string; editedUnixTime: number; editedTimestamp: number; editedAt: Date; })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(text, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<true | (Message & { caption: string | undefined; editedUnixTime: number; editedTimestamp: number; editedAt: Date; })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editCaption(caption, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.editMessageCaption({
      ...(caption && { caption }),
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param {MethodParameters["editMessageMedia"]["media"]} media - An object for a new media content of the message
   * @param {Omit<MethodParameters["editMessageMedia"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(media, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @param {import("../../client/interfaces/Markup").InlineKeyboardMarkup} replyMarkup - An object for an inline keyboard
   * @param  {Omit<MethodParameters["editMessageReplyMarkup"], "media" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; }>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(replyMarkup, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<Message>} - On success, the sent Message is returned.
   */
  forward(chatId, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.forwardMessage({
      chatId,
      ...(this.threadId && this.inTopic && { messageThreadId: this.threadId }),
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
   * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param {Omit<MethodParameters["copyMessage"], "chatId" | "fromChatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<number>} - Returns the message id of the sent message on success.
   */
  copy(chatId, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.copyMessage({
      chatId: chatId,
      fromChatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * @typedef {Object} PinMessage
   * @property {boolean} [notification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats
   * @property {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be pinned
   */

  /**
   * Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively.
   * @param {PinMessage} [options] - options for pinned message
   * @returns {Promise<true>} - Returns True on success.
   */
  pin({ notification = false, businessConnectionId } = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.pinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      disableNotification: notification,
      ...(businessConnectionId && { businessConnectionId }),
    });
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively.
   * @param {string} [businessConnectionId] - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @returns {Promise<true>} - Returns True on success.
   */
  unpin(businessConnectionId) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.unpinChatMessage({
      chatId: this.chat.id,
      messageId: this.id,
      ...(businessConnectionId && { businessConnectionId }),
    });
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
  - If the bot has can_delete_messages administrator right in a supergroup or a channel, it can delete any message there.
  - If the bot has can_manage_direct_messages administrator right in a channel, it can delete any message in the corresponding direct messages chat.
   * @returns {Promise<true>} - Returns True on success.
   */
  delete() {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.deleteMessage(this.chat.id, this.id);
  }

  /**
   * Use this method to edit a checklist on behalf of a connected business account.
   * @param {string} businessConnectionId - Unique identifier of the business connection on behalf of which the message will be sent.
   * @param {import("../../client/interfaces/Checklist").InputChecklist} checklist - An object for the new checklist.
   * @param {Omit<MethodParameters["editMessageChecklist"], "messageId" | "chatId" | "checklist" | "businessConnectionId">} [options] - out parameters.
   * @returns {Promise<Message & { checklist: Checklist }>} - On success, the edited Message is returned.
   */
  editChecklist(businessConnectionId, checklist, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.editMessageChecklist({
      checklist,
      messageId: this.id,
      chatId: this.chat.id,
      businessConnectionId,
      ...options,
    });
  }

  /**
   * Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat.
   * @param {number} [sendDate] - Point in time (Unix timestamp) when the post is expected to be published; omit if the date has already been specified when the suggested post was created. If specified, then the date must be not more than 2678400 seconds (30 days) in the future.
   * @returns {Promise<true>} - Returns True on success.
   */
  approveSuggestedPost(sendDate) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.approveSuggestedPost({
      messageId: this.id,
      chatId: this.chat.id,
      ...(sendDate && { sendDate }),
    });
  }

  /**
   * Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat.
   * @param {string} [comment] - Comment for the creator of the suggested post; 0-128 characters.
   * @returns {Promise<true>} - Returns True on success.
   */
  declineSuggestedPost(comment) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.declineSuggestedPost({
      messageId: this.id,
      chatId: this.chat.id,
      ...(comment && { comment }),
    });
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param {number} latitude - Latitude of new location
   * @param {number} longitude - Longitude of new location
   * @param {Omit<MethodParameters["editMessageLiveLocation"], "latitude" | "longitude" | "chatId" | "messageId">} [options={}] - out parameters
   * @returns {Promise<true | (Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; location: Location })>} - On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(latitude, longitude, options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
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
   * @returns {Promise<true | (Message & { editedUnixTime: number; editedTimestamp: number; editedAt: Date; location: Location })>} - On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(options = {}) {
    if (!this.chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    return this.client.stopMessageLiveLocation({
      chatId: this.chat.id,
      messageId: this.id,
      ...options,
    });
  }

  /**
   * Return this message content and caption for media, otherwise just an empty string
   * @override
   */
  toString() {
    return this.content ?? this.caption ?? "";
  }
}

module.exports = { Message };

const { ChecklistTasksAdded } = require("../checklist/ChecklistTasksAdded");
const { ChecklistTasksDone } = require("../checklist/ChecklistTasksDone");
const {
  SuggestedPostApprovalFailed,
} = require("../invoice/SuggestedPostApprovalFailed");
const { SuggestedPostApproved } = require("../invoice/SuggestedPostApproved");
const { SuggestedPostDeclined } = require("../invoice/SuggestedPostDeclined");
const { SuggestedPostInfo } = require("../invoice/SuggestedPostInfo");
const { SuggestedPostPaid } = require("../invoice/SuggestedPostPaid");
const { SuggestedPostRefunded } = require("../invoice/SuggestedPostRefunded");
