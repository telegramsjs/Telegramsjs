// @ts-check
const { Base } = require("../Base");
const { Photo } = require("../media/Photo");
const { Chat } = require("../chat/Chat");
const { UserPermissions } = require("../../util/permission/UserPermissions");
const { isDeepStrictEqual } = require("../../util/Utils");

class ChatShared extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").ChatShared} data - Data about the contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button
   */
  constructor(client, data) {
    super(client);

    /** Identifier of the shared chat. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
    this.id = data.chat_id;

    /** Identifier of the request */
    this.requestId = data.request_id;

    if ("title" in data) {
      /** Title of the chat, if the title was requested by the bot. */
      this.title = data.title;
    }

    if ("username" in data) {
      /** Username of the chat, if the username was requested by the bot and available. */
      this.username = data.username;
    }

    if ("photo" in data) {
      /** Available sizes of the chat photo, if the photo was requested by the bot */
      this.photo = data.photo.map((photo) => new Photo(client, photo));
    }
  }

  /**
   * Retrieves the permissions of a specific member in the chat.
   * @param {import("../chat/ChatMember").ChatMember|string} member - The member object to check permissions for.
   * @param {boolean} [checkAdmin] - A flag to check if the member is an admin or creator.
   * @returns {Promise<UserPermissions|null>} The permissions object of the member or null if not available.
   */
  async memberPermissions(member, checkAdmin) {
    if (
      checkAdmin &&
      typeof member !== "string" &&
      member.status === "creator"
    ) {
      const permissions = Object.fromEntries(
        Object.entries(UserPermissions.Flags).map(([key]) => [key, true]),
      );
      return new UserPermissions(permissions);
    }

    const memberId = typeof member === "string" ? member : member.id;
    if (!memberId) return null;

    const fetchMember = await this.client
      .getChatMember(this.id, memberId)
      .catch(() => null);

    if (fetchMember && fetchMember.permissions) {
      if (Object.keys(fetchMember.permissions).length === 0) {
        return this.memberPermissions(fetchMember, checkAdmin);
      }
      return fetchMember.permissions;
    }

    return null;
  }

  /**
   * Checks if this chat is equal to another chat.
   * @param {ChatShared} other - The other object to compare with.
   * @returns {boolean} True if both objects are instances of ChatShared and are equal based on key properties, otherwise false.
   */
  equals(other) {
    if (!other || !(other instanceof ChatShared)) return false;

    return (
      this.id === other.id &&
      this.requestId === other.requestId &&
      this.title === other.title &&
      this.username === other.username &&
      isDeepStrictEqual(this.photo, other.photo)
    );
  }
}

/**
 * @param {import("../../managers/BaseManager").Constructable<any>} structure - class for apply.
 * @returns {void}
 */
function applyToClass(structure) {
  const props = [
    "me",
    "fetch",
    "createMessageCollector",
    "awaitMessages",
    "createReactionCollector",
    "awaitReactions",
    "createMessageComponentCollector",
    "send",
    "leave",
    "verify",
    "removeVerification",
    "fetchAdmins",
    "membersCount",
    "fetchUserBoosts",
    "forwardMessages",
    "copyMessages",
    "deleteMessage",
    "deleteMessages",
    "setMenuButton",
    "pinMessage",
    "unpinMessage",
    "unpinAllMessages",
    "approveSuggestedPost",
    "declineSuggestedPost",
    "sendPhoto",
    "sendAudio",
    "sendPaidMedia",
    "sendDocument",
    "sendVideo",
    "sendAnimation",
    "sendVoice",
    "sendVideoNote",
    "sendMediaGroup",
    "sendLocation",
    "sendVenue",
    "sendContact",
    "sendPoll",
    "sendChecklist",
    "sendDice",
    "sendAction",
    "sendSticker",
    "sendInvoice",
    "sendGame",
  ];

  for (const prop of props) {
    Object.defineProperty(
      structure.prototype,
      prop,
      Object.getOwnPropertyDescriptor(Chat.prototype, prop) || {},
    );
  }
}

applyToClass(ChatShared);

module.exports = { ChatShared };
