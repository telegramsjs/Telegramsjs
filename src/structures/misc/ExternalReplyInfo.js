// @ts-check
const { Base } = require("../Base");
const { LinkPreviewOptions } = require("./LinkPreviewOptions");
const { Animation } = require("../media/Animation");
const { Audio } = require("../media/Audio");
const { Document } = require("../media/Document");
const { Photo } = require("../media/Photo");
const { Sticker } = require("../media/Sticker");
const { Story } = require("./Story");
const { Video } = require("../media/Video");
const { Voice } = require("../media/Voice");
const { VideoNote } = require("../media/VideoNote");
const { Contact } = require("../media/Contact");
const { Dice } = require("../media/Dice");
const { PaidMediaInfo } = require("../media/paid/PaidMediaInfo");
const { Game } = require("../game/Game");
const { Giveaway } = require("../giveaway/Giveaway");
const { GiveawayWinners } = require("../giveaway/GiveawayWinners");
const { Invoice } = require("../invoice/Invoice");
const { Location } = require("./Location");
const { Poll } = require("../media/Poll");
const { Venue } = require("./Venue");
const { MessageOrigin } = require("../message/MessageOrigin");

class ExternalReplyInfo extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ExternalReplyInfo} data - Data about the contains information about a message that is being replied to, which may come from another chat or forum topic
   */
  constructor(client, data) {
    super(client);

    /** Origin of the message replied to by the given message */
    this.origin = new MessageOrigin(client, data.origin);

    this._patch(data);
  }

  /**
   * @param {import("@telegram.ts/types").ExternalReplyInfo} data - Data about the contains information about a message that is being replied to, which may come from another chat or forum topic
   * @override
   */
  _patch(data) {
    if ("chat" in data) {
      /**
       * Chat the original message belongs to. Available only if the chat is a supergroup or a channel
       * @type {import("../chat/Chat").Chat | undefined}
       */
      this.chat = this.client.chats._add(data.chat);
    }

    if ("message_id" in data) {
      /**
       * Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel
       * @type {string | undefined}
       */
      this.messageId = String(data.message_id);
    }

    if ("link_preview_options" in data) {
      /**
       * Options used for link preview generation for the original message, if it is a text message
       * @type {LinkPreviewOptions | undefined}
       */
      this.linkPreviewOpts = new LinkPreviewOptions(data.link_preview_options);
    }

    if ("animation" in data) {
      /**
       * Message is an animation, information about the animation
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

    if ("sticker" in data) {
      /**
       * Message is a sticker, information about the sticker
       * @type {Sticker | undefined}
       */
      this.sticker = new Sticker(this.client, data.sticker);
    }

    if ("story" in data) {
      /**
       * Message is a forwarded story
       * @type {Story | undefined}
       */
      this.story = new Story(this.client, data.story);
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

    if ("has_media_spoiler" in data) {
      /**
       * True, if the message media is covered by a spoiler animation
       * @type {true | undefined}
       */
      this.mediaSpoiler = data.has_media_spoiler;
    }

    if ("contact" in data) {
      /**
       * Message is a shared contact, information about the contact
       * @type {Contact | undefined}
       */
      this.contact = new Contact(data.contact);
    }

    if ("dice" in data) {
      /**
       * Message is a dice with random value
       * @type {Dice | undefined}
       */
      this.dice = new Dice(data.dice);
    }

    if ("game" in data) {
      /**
       * Message is a game, information about the game. More about games
       * @type {Game | undefined}
       */
      this.game = new Game(this.client, data.game);
    }

    if ("giveaway" in data) {
      /**
       * Message is a scheduled giveaway, information about the giveaway
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

    if ("invoice" in data) {
      /**
       * Message is an invoice for a payment, information about the invoice. More about payments
       * @type {Invoice | undefined}
       */
      this.invoice = new Invoice(this.client, data.invoice);
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

    return data;
  }
}

module.exports = { ExternalReplyInfo };
