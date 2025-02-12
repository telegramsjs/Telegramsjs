// @ts-check
const { Chat } = require("./Chat");
const { Photo } = require("../media/Photo");
const { Location } = require("../misc/Location");
const { Sticker } = require("../media/Sticker");
const { ReactionType } = require("../misc/ReactionType");
const { Message } = require("../message/Message");
const { ChatPermissions } = require("../../util/ChatPermissions");

class ChatFullInfo extends Chat {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatFullInfo} data - Data about the full information of a chat
   */
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").ChatFullInfo} data - Data about the full information of a chat
   * @override
   */
  _patch(data) {
    if ("title" in data) {
      /**
       * The title of the chat.
       * @type {string | undefined}
       */
      this.title = data.title;
    }

    if ("username" in data) {
      /**
       * The username of the chat.
       * @type {string | undefined}
       */
      this.username = data.username;
    }

    if ("first_name" in data) {
      /**
       * The first name of the user.
       * @type {string | undefined}
       */
      this.firstName = data.first_name;
    }

    if ("last_name" in data) {
      /**
       * The last name of the user.
       * @type {string | undefined}
       */
      this.lastName = data.last_name;
    }

    if ("is_forum" in data) {
      /**
       * Whether the chat is a forum.
       * @type {boolean | undefined}
       */
      this.forum = data.is_forum;
    }

    if ("accent_color_id" in data) {
      /**
       * The accent color ID of the chat.
       * @type {number | undefined}
       */
      this.accentColorId = data.accent_color_id;
    }

    if ("max_reaction_count" in data) {
      /**
       * The maximum number of reactions allowed in the chat.
       * @type {number | undefined}
       */
      this.maxReactionCount = data.max_reaction_count;
    }

    if ("photo" in data && data.photo) {
      /**
       * The photo of the chat.
       * @type {{ smail: Photo, big: Photo } | undefined}
       */
      this.photo = {
        smail: new Photo(this.client, {
          file_id: data.photo.small_file_id,
          file_unique_id: data.photo.small_file_unique_id,
          width: 0,
          height: 0,
        }),
        big: new Photo(this.client, {
          file_id: data.photo.big_file_id,
          file_unique_id: data.photo.big_file_unique_id,
          width: 0,
          height: 0,
        }),
      };
    }

    if ("active_usernames" in data) {
      /**
       * The active usernames of the chat.
       * @type {string[] | undefined}
       */
      this.activeUsernames = data.active_usernames;
    }

    if ("birthdate" in data && data.birthdate) {
      /**
       * The birthdate of the chat.
       * @type {{ day: number, month: number, year?: number } | undefined}
       */
      this.birthdate = {
        day: data.birthdate.day,
        month: data.birthdate.month,
        ...(data.birthdate.year && { year: data.birthdate.year }),
      };
    }

    if ("business_intro" in data && data.business_intro) {
      /**
       * The business introduction of the chat.
       * @type {{ title?: string, message?: string, sticker?: Sticker } | undefined}}
       */
      this.businessIntro = {
        ...(data.business_intro.title && { title: data.business_intro.title }),
        ...(data.business_intro.message && {
          message: data.business_intro.message,
        }),
        ...(data.business_intro.sticker && {
          sticker: new Sticker(this.client, data.business_intro.sticker),
        }),
      };
    }

    if ("business_location" in data && data.business_location) {
      /**
       * The business location of the chat.
       * @type {{ address: string, location?: Location } | undefined}
       */
      this.businessLocation = {
        address: data.business_location.address,
        ...(data.business_location.location && {
          location: new Location(this.client, data.business_location.location),
        }),
      };
    }

    if ("business_opening_hours" in data && data.business_opening_hours) {
      /**
       * The business opening hours of the chat.
       * @type {undefined | { timeZone: string, hours: { opening: number, closing: number }[] } }
       */
      this.businessOpeningHours = {
        timeZone: data.business_opening_hours.time_zone_name,
        hours: data.business_opening_hours.opening_hours.map(
          ({ opening_minute, closing_minute }) => ({
            opening: opening_minute,
            closing: closing_minute,
          }),
        ),
      };
    }

    if ("personal_chat" in data && data.personal_chat) {
      /**
       * The personal chat associated with this chat.
       * @type {Chat | undefined}
       */
      this.personalChat = new Chat(this.client, data.personal_chat);
    }

    if ("available_reactions" in data) {
      /**
       * The available reactions in the chat.
       * @type {ReactionType[] | undefined}
       */
      this.availableReactions = data.available_reactions.map(
        (react) => new ReactionType(react),
      );
    }

    if ("background_custom_emoji_id" in data) {
      /**
       * The custom emoji ID for the chat background.
       * @type {string | undefined}
       */
      this.backgroundCustomEmojiId = data.background_custom_emoji_id;
    }

    if ("profile_accent_color_id" in data) {
      /**
       * The profile accent color ID of the chat.
       * @type {number | undefined}
       */
      this.profileAccentColorId = data.profile_accent_color_id;
    }

    if ("profile_background_custom_emoji_id" in data) {
      /**
       * The custom emoji ID for the profile background.
       * @type {string | undefined}
       */
      this.profileBackgroundCustomEmojiId =
        data.profile_background_custom_emoji_id;
    }

    if ("emoji_status_custom_emoji_id" in data) {
      /**
       * The custom emoji ID for the emoji status.
       * @type {string | undefined}
       */
      this.emojiStatusCustomEmojiId = data.emoji_status_custom_emoji_id;
    }

    if ("emoji_status_expiration_date" in data) {
      /**
       * The expiration date for the emoji status.
       * @type {number | undefined}
       */
      this.emojiStatusExpirationDate = data.emoji_status_expiration_date;
    }

    if ("bio" in data) {
      /**
       * The bio of the chat.
       * @type {string | undefined}
       */
      this.bio = data.bio;
    }

    if ("has_private_forwards" in data) {
      /**
       * Whether the chat has private forwards.
       * @type {boolean | undefined}
       */
      this.privateForwards = data.has_private_forwards;
    }

    if ("has_restricted_voice_and_video_messages" in data) {
      /**
       * Whether the chat has restricted voice and video messages.
       * @type {boolean | undefined}
       */
      this.restrictedMediaMessages =
        data.has_restricted_voice_and_video_messages;
    }

    if ("join_to_send_messages" in data) {
      /**
       * Whether users need to join to send messages in the chat.
       * @type {boolean | undefined}
       */
      this.joinToSendMessages = data.join_to_send_messages;
    }

    if ("join_by_request" in data) {
      /**
       * Whether users need to request to join the chat.
       * @type {boolean | undefined}
       */
      this.joinByRequest = data.join_by_request;
    }

    if ("description" in data) {
      /**
       * The description of the chat.
       * @type {string | undefined}
       */
      this.description = data.description;
    }

    if ("invite_link" in data) {
      /**
       * The invite link for the chat.
       * @type {string | undefined}
       */
      this.inviteLink = data.invite_link;
    }

    if ("pinned_message" in data) {
      /**
       * The pinned message in the chat.
       * @type {Message | undefined}
       */
      this.pinnedMessage = new Message(this.client, data.pinned_message);
    }

    if ("permissions" in data && data.permissions) {
      /** @type {any} */
      const permissions = {};

      if ("can_send_messages" in data.permissions) {
        permissions.sendMessages = data.permissions.can_send_messages;
      }

      if ("can_send_audios" in data.permissions) {
        permissions.sendAudios = data.permissions.can_send_audios;
      }

      if ("can_send_documents" in data.permissions) {
        permissions.sendDocuments = data.permissions.can_send_documents;
      }

      if ("can_send_photos" in data.permissions) {
        permissions.sendPhotos = data.permissions.can_send_photos;
      }

      if ("can_send_videos" in data.permissions) {
        permissions.sendVideos = data.permissions.can_send_videos;
      }

      if ("can_send_video_notes" in data.permissions) {
        permissions.sendVideoNotes = data.permissions.can_send_video_notes;
      }

      if ("can_send_voice_notes" in data.permissions) {
        permissions.sendVoiceNotes = data.permissions.can_send_voice_notes;
      }

      if ("can_send_polls" in data.permissions) {
        permissions.sendPolls = data.permissions.can_send_polls;
      }

      if ("can_send_other_messages" in data.permissions) {
        permissions.sendOtherMessages =
          data.permissions.can_send_other_messages;
      }

      if ("can_add_web_page_previews" in data.permissions) {
        permissions.addWebPagePreviews =
          data.permissions.can_add_web_page_previews;
      }

      if ("can_change_info" in data.permissions) {
        permissions.changeInfo = data.permissions.can_change_info;
      }

      if ("can_invite_users" in data.permissions) {
        permissions.inviteUsers = data.permissions.can_invite_users;
      }

      if ("can_pin_messages" in data.permissions) {
        permissions.pinMessages = data.permissions.can_pin_messages;
      }

      if ("can_manage_topics" in data.permissions) {
        permissions.manageTopics = data.permissions.can_manage_topics;
      }

      /**
       * The permissions in the chat.
       * @type {ChatPermissions | undefined}
       */
      this.permissions = new ChatPermissions(permissions);
    }

    if ("can_send_gift" in data) {
      /**
       * True, if gifts can be sent to the chat
       * @type {true}
       */
      this.giftSendingEnabled = data.can_send_gift;
    }

    if ("slow_mode_delay" in data) {
      /**
       * The slow mode delay in the chat.
       * @type {number | undefined}
       */
      this.slowModeDelay = data.slow_mode_delay;
    }

    if ("unrestrict_boost_count" in data) {
      /**
       * The unrestrict boost count of the chat.
       * @type {number | undefined}
       */
      this.unrestrictBoostCount = data.unrestrict_boost_count;
    }

    if ("message_auto_delete_time" in data) {
      /**
       * The message auto delete time in the chat.
       * @type {number | undefined}
       */
      this.messageAutoDeleteTime = data.message_auto_delete_time;
    }

    if ("has_aggressive_anti_spam_enabled" in data) {
      /**
       * Whether the chat has aggressive anti-spam enabled.
       * @type {boolean | undefined}
       */
      this.aggressiveAntiSpamEnabled = data.has_aggressive_anti_spam_enabled;
    }

    if ("has_hidden_members" in data) {
      /**
       * Whether the chat has hidden members.
       * @type {boolean | undefined}
       */
      this.hiddenMembers = data.has_hidden_members;
    }

    if ("has_protected_content" in data) {
      /**
       * Whether the chat has protected content.
       * @type {boolean | undefined}
       */
      this.protectedContent = data.has_protected_content;
    }

    if ("has_visible_history" in data) {
      /**
       * Whether the chat has visible history.
       * @type {boolean | undefined}
       */
      this.visibleHistory = data.has_visible_history;
    }

    if ("sticker_set_name" in data) {
      /**
       * The name of the sticker set in the chat.
       * @type {string | undefined}
       */
      this.stickerSetName = data.sticker_set_name;
    }

    if ("can_set_sticker_set" in data) {
      /**
       * Whether the chat can set a sticker set.
       * @type {boolean | undefined}
       */
      this.setStickeredSet = data.can_set_sticker_set;
    }

    if ("custom_emoji_sticker_set_name" in data) {
      /**
       * The name of the custom emoji sticker set in the chat.
       * @type {string | undefined}
       */
      this.customEmojiStickerSetName = data.custom_emoji_sticker_set_name;
    }

    if ("linked_chat_id" in data) {
      /**
       * The linked chat ID.
       * @type {string | undefined}
       */
      this.linkedId = String(data.linked_chat_id);
    }

    if ("location" in data && data.location) {
      /**
       * The location of the chat.
       * @type {{ location: Location; address: string; } | undefined}}
       */
      this.location = {
        location: new Location(this.client, data.location.location),
        address: data.location.address,
      };
    }

    return data;
  }
}

module.exports = { ChatFullInfo };
