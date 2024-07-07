const { Base } = require("./Base");
const { LinkPreviewOptions } = require("./LinkPreviewOptions");
const { Animation } = require("./media/Animation");
const { Audio } = require("./media/Audio");
const { Document } = require("./media/Document");
const { Photo } = require("./media/Photo");
const { Sticker } = require("./media/Sticker");
const { Story } = require("./Story");
const { Video } = require("./media/Video");
const { VideoNote } = require("./media/VideoNote");
const { Contact } = require("./media/Contact");
const { Dice } = require("./media/Dice");
const { Game } = require("./Game");
const { Giveaway } = require("./Giveaway");
const { GiveawayWinners } = require("./GiveawayWinners");
const { Invoice } = require("./invoice/Invoice");
const { Location } = require("./Location");
const { Poll } = require("./media/Poll");
const { Venue } = require("./Venue");
const { MessageOrigin } = require("./MessageOrigin");

class ExternalReplyInfo extends Base {
  constructor(client, data) {
    super(client, data);

    this.origin = new MessageOrigin(client, data);

    this._patch(data);
  }

  _patch(data) {
    if ("chat" in data) {
      this.chat = new Chat(this.client, data.chat);
    }

    if ("message_id" in data) {
      this.messageId = data.message_id;
    }

    if ("link_preview_options" in data) {
      this.linkPreviewOpts = new LinkPreviewOptions(data.link_preview_options);
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

    if ("sticker" in data) {
      this.sticker = new Sticker(this.client, data.sticker);
    }

    if ("story" in data) {
      this.story = new Story(this.client, data.story);
    }

    if ("video" in data) {
      this.video = new Video(this.client, data.video);
    }

    if ("video_note" in data) {
      this.videoNote = new VideoNote(this.client, data.video_note);
    }

    if ("has_media_spoiler" in data) {
      this.mediaSpoiler = data.has_media_spoiler;
    }

    if ("contact" in data) {
      this.contact = new Contact(data.contact);
    }

    if ("dice" in data) {
      this.dice = new Dice(data.dice);
    }

    if ("game" in data) {
      this.game = new Game(this.client, data.game);
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

    if ("invoice" in data) {
      this.invoice = new Invoice(data.invoice);
    }

    if ("location" in data) {
      this.location = new Location(this.client, data.location);
    }

    if ("poll" in data) {
      this.poll = new Poll(this.client, data.poll);
    }

    if ("venue" in data) {
      this.venue = new Venue(this.client, data.venue);
    }
  }
}

module.exports = { ExternalReplyInfo };
