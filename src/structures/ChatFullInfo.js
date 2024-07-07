const { Base } = require("./Base");
const { Chat } = require("./Chat");
const { Photo } = require("./media/Photo");
const { Location } = require("./Location");
const { Sticker } = require("./media/Sticker");
const { ReactionType } = require("./ReactionType");
const { Message } = require("./Message");
const { Permissions } = require("../util/Permissions");

class ChatFullInfo extends Chat {
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  _patch(data) {
    if ("title" in data) {
      this.title = data.title;
    }

    if ("username" in data) {
      this.username = data.username;
    }

    if ("first_name" in data) {
      this.firstName = data.first_name;
    }

    if ("last_name" in data) {
      this.lastName = data.last_name;
    }

    if ("is_forum" in data) {
      this.forum = data.forum;
    }

    if ("accent_color_id" in data) {
      this.accentColorId = data.accent_color_id;
    }

    if ("max_reaction_count" in data) {
      this.maxReactionCount = data.max_reaction_count;
    }

    if ("photo" in data) {
      const chatPhoto = {
        smail: new Photo(this.client, {
          file_id: data.photo.small_file_id,
          file_unique_id: data.photo.small_file_unique_id,
        }),
        big: new Photo(this.client, {
          file_id: data.photo.big_file_id,
          file_unique_id: data.photo.big_file_unique_id,
        }),
      };
      this.photo = chatPhoto;
    }

    if ("active_usernames" in data) {
      this.activeUsernames = data.active_usernames;
    }

    if ("birthdate" in data) {
      const birthdate = {
        day: data.birthdate.day,
        month: data.birthdate.month,
      };

      if ("year" in data.birthdate) {
        birthdate.year = data.birthdate.year;
      }

      this.birthdate = birthdate;
    }

    if ("business_intro" in data) {
      const businessIntro = {};

      if ("title" in data.business_intro) {
        businessIntro.title = data.business_intro.title;
      }

      if ("message" in data.business_intro) {
        businessIntro.message = data.business_intro.message;
      }

      if ("sticker" in data.business_intro) {
        businessIntro.sticker = new Sticker(
          this.client,
          data.business_intro.sticker,
        );
      }

      this.businessIntro = businessIntro;
    }

    if ("business_location" in data) {
      const businessLocation = {
        address: data.business_location.address,
      };

      if ("location" in data.business_location) {
        businessLocation.location = new Location(
          this.client,
          data.business_location.location,
        );
      }

      this.businessLocation = businessLocation;
    }

    if ("business_opening_hours" in data) {
      const businessOpeningHours = {
        timeZone: data.business_opening_hours.time_zone_name,
        hours: data.business_opening_hours.map(
          ({ opening_minute, closing_minute }) => ({
            opening: opening_minute,
            closing: closing_minute,
          }),
        ),
      };
      this.businessOpeningHours = businessOpeningHours;
    }

    if ("personal_chat" in data) {
      this.personalChat = new Chat(this.client, data.personal_chat);
    }

    if ("available_reactions" in data) {
      this.availableReactions = data.available_reactions.map(
        (react) => new ReactionType(react),
      );
    }

    if ("background_custom_emoji_id" in data) {
      this.backgroundCustomEmojiId = data.background_custom_emoji_id;
    }

    if ("profile_accent_color_id" in data) {
      this.profileAccentColorId = data.profile_accent_color_id;
    }

    if ("profile_background_custom_emoji_id" in data) {
      this.profileBackgroundCustomEmojiId =
        data.profile_background_custom_emoji_id;
    }

    if ("emoji_status_custom_emoji_id" in data) {
      this.emojiStatusCustomEmojiId = data.emoji_status_custom_emoji_id;
    }

    if ("emoji_status_expiration_date" in data) {
      this.emojiStatusExpirationDate = data.emoji_status_expiration_date;
    }

    if ("bio" in data) {
      this.bio = data.bio;
    }

    if ("has_private_forwards" in data) {
      this.privateForwards = data.has_private_forwards;
    }

    if ("has_restricted_voice_and_video_messages" in data) {
      this.restrictedMediaMessages =
        data.has_restricted_voice_and_video_messages;
    }

    if ("join_to_send_messages" in data) {
      this.joinToSendMessages = data.join_to_send_messages;
    }

    if ("join_by_request" in data) {
      this.joinByRequest = data.join_by_request;
    }

    if ("description" in data) {
      this.description = data.description;
    }

    if ("invite_link" in data) {
      this.inviteLink = data.invite_link;
    }

    if ("pinned_message" in data) {
      this.pinnedMessage = new Message(this.client, data.pinned_message);
    }

    if ("permissions" in data) {
      this.permissions = new Permissions(data.permissions);
    }

    if ("slow_mode_delay" in data) {
      this.slowModeDelay = data.slow_mode_delay;
    }

    if ("unrestrict_boost_count" in data) {
      this.unrestrictBoostCount = data.unrestrict_boost_count;
    }

    if ("message_auto_delete_time" in data) {
      this.messageAutoDeleteTime = data.message_auto_delete_time;
    }

    if ("has_aggressive_anti_spam_enabled" in data) {
      this.aggressiveAntiSpamEnabled = data.has_aggressive_anti_spam_enabled;
    }

    if ("has_hidden_members" in data) {
      this.hiddenMembers = data.has_hidden_members;
    }

    if ("has_protected_content" in data) {
      this.protectedContent = data.has_protected_content;
    }

    if ("has_visible_history" in data) {
      this.visibleHistory = data.has_visible_history;
    }

    if ("sticker_set_name" in data) {
      this.stickerSetName = data.sticker_set_name;
    }

    if ("can_set_sticker_set" in data) {
      this.setStickerSet = data.can_set_sticker_set;
    }

    if ("custom_emoji_sticker_set_name" in data) {
      this.customEmojiStickerSetName = data.custom_emoji_sticker_set_name;
    }

    if ("linked_chat_id" in data) {
      this.linkedId = data.linked_chat_id;
    }

    if ("location" in data) {
      this.location = data.location;
    }
  }
}

module.exports = { ChatFullInfo };
