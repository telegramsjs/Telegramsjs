"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUsername = exports.checkUsername = exports.checkGroup = exports.checkLink = exports.checkChannel = exports.checkBot = exports.extractUsernameFromLink = exports.checkSticker = exports.checkEmoji = exports.checkGroupOrChannel = exports.extractUserIdFromLink = exports.checkPhoneNumber = exports.checkHashtags = exports.checkUserMentions = exports.checkLocation = exports.extractHashtags = exports.extractUserMentions = exports.checkMessageLinks = void 0;
/**
 * Checks if a message contains any links.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains links, otherwise false.
 */
function checkMessageLinks(message) {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const links = message.match(linkRegex);
    return links !== null && links.length > 0;
}
exports.checkMessageLinks = checkMessageLinks;
/**
 * Extracts user mentions from a message.
 * @param {string} message - The message to extract mentions from.
 * @returns {string[]} - An array of user mentions found in the message.
 */
function extractUserMentions(message) {
    const mentionRegex = /@\w+/g;
    const mentions = message.match(mentionRegex);
    return mentions !== null ? mentions : [];
}
exports.extractUserMentions = extractUserMentions;
/**
 * Extracts hashtags from a message.
 * @param {string} message - The message to extract hashtags from.
 * @returns {string[]} - An array of hashtags found in the message.
 */
function extractHashtags(message) {
    const hashtagRegex = /#[^\s#]+/g;
    const hashtags = message.match(hashtagRegex);
    return hashtags !== null ? hashtags : [];
}
exports.extractHashtags = extractHashtags;
/**
 * Checks if a location object is valid.
 * @param {object} location - The location object to check.
 * @param {string|number} location.latitude - The latitude of the location.
 * @param {string|number} location.longitude - The longitude of the location.
 * @returns {boolean} - Returns true if the location object is valid, otherwise false.
 */
function checkLocation(location) {
    if (typeof location === "object" &&
        location.hasOwnProperty("latitude") &&
        location.hasOwnProperty("longitude")) {
        const latitude = typeof location.latitude === "number"
            ? location.latitude
            : parseFloat(location.latitude);
        const longitude = typeof location.longitude === "number"
            ? location.longitude
            : parseFloat(location.longitude);
        if (!isNaN(latitude) &&
            !isNaN(longitude) &&
            Math.abs(latitude) <= 90 &&
            Math.abs(longitude) <= 180) {
            return true;
        }
    }
    return false;
}
exports.checkLocation = checkLocation;
/**
 * Checks if a message contains any user mentions.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains user mentions, otherwise false.
 */
function checkUserMentions(message) {
    const mentionRegex = /@\w+/g;
    const mentions = message.match(mentionRegex);
    return mentions !== null && mentions.length > 0;
}
exports.checkUserMentions = checkUserMentions;
/**
 * Checks if a message contains any hashtags.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains hashtags, otherwise false.
 */
function checkHashtags(message) {
    const hashtagRegex = /#[^\s#]+/g;
    const hashtags = message.match(hashtagRegex);
    return hashtags !== null && hashtags.length > 0;
}
exports.checkHashtags = checkHashtags;
/**
 * Checks if a phone number is valid.
 * @param {string} phoneNumber - The phone number to check.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
function checkPhoneNumber(phoneNumber) {
    const telegramPhoneRegex = /^\+[1-9]\d{10,14}$/;
    return telegramPhoneRegex.test(phoneNumber);
}
exports.checkPhoneNumber = checkPhoneNumber;
/**
 * Extracts the user ID from a Telegram link.
 * @param {string} link - The Telegram link to extract the user ID from.
 * @returns {string|null} - The extracted user ID, or null if not found.
 */
function extractUserIdFromLink(link) {
    const telegramLinkRegex = /(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]{5,32})/i;
    const match = telegramLinkRegex.exec(link);
    if (match && match[3]) {
        return match[3];
    }
    return null;
}
exports.extractUserIdFromLink = extractUserIdFromLink;
/**
 * Checks if a message contains a Telegram group or channel link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a group or channel link, otherwise false.
 */
function checkGroupOrChannel(message) {
    const telegramGroupRegex = /(https?:\/\/)?(www\.)?t\.me\/joinchat\/([a-zA-Z0-9_-]+)/i;
    const telegramChannelRegex = /(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]{5,32})/i;
    return telegramGroupRegex.test(message) || telegramChannelRegex.test(message);
}
exports.checkGroupOrChannel = checkGroupOrChannel;
/**
 * Checks if a message contains only emoji characters.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains only emoji characters, otherwise false.
 */
function checkEmoji(message) {
    const telegramEmojiRegex = /^[\uD83C-\uDBFF\uDC00-\uDFFF]{1,}$/;
    return telegramEmojiRegex.test(message);
}
exports.checkEmoji = checkEmoji;
/**
 * Checks if a message contains only a Telegram sticker.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains only a Telegram sticker, otherwise false.
 */
function checkSticker(message) {
    const telegramStickerRegex = /^[\uD83C-\uDBFF\uDC00-\uDFFF]{1,}$/;
    return telegramStickerRegex.test(message);
}
exports.checkSticker = checkSticker;
/**
 * Extracts the username from a Telegram link.
 * @param {string} link - The Telegram link to extract the username from.
 * @returns {string|null} - The extracted username, or null if not found.
 */
function extractUsernameFromLink(link) {
    const telegramUsernameRegex = /(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]{5,32})/i;
    const match = telegramUsernameRegex.exec(link);
    if (match && match[3]) {
        return match[3];
    }
    return null;
}
exports.extractUsernameFromLink = extractUsernameFromLink;
/**
 * Checks if a message contains a Telegram bot username.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram bot username, otherwise false.
 */
function checkBot(message) {
    const telegramBotRegex = /^@[a-zA-Z0-9_]{5,32}$/i;
    return telegramBotRegex.test(message);
}
exports.checkBot = checkBot;
/**
 * Checks if a message contains a Telegram channel link (excluding usernames).
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram channel link, otherwise false.
 */
function checkChannel(message) {
    const telegramChannelRegex = /(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]{5,32})/i;
    const channelRegex = /^@[a-zA-Z0-9_]{5,32}$/i;
    return telegramChannelRegex.test(message) && !channelRegex.test(message);
}
exports.checkChannel = checkChannel;
/**
 * Checks if a message contains a Telegram link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram link, otherwise false.
 */
function checkLink(message) {
    const telegramRegex = /(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]{5,32})/i;
    return telegramRegex.test(message);
}
exports.checkLink = checkLink;
/**
 * Checks if a message contains a Telegram group link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram group link, otherwise false.
 */
function checkGroup(message) {
    const telegramGroupRegex = /(https?:\/\/)?(www\.)?t\.me\/joinchat\/([a-zA-Z0-9_-]+)/i;
    return telegramGroupRegex.test(message);
}
exports.checkGroup = checkGroup;
/**
 * Checks if a username is valid.
 * @param {string} username - The username to check.
 * @returns {boolean} - Returns true if the username is valid, otherwise false.
 */
function checkUsername(username) {
    const telegramUsernameRegex = /^@?([a-zA-Z0-9_]{5,32})$/;
    return telegramUsernameRegex.test(username);
}
exports.checkUsername = checkUsername;
/**
 * Extracts the username from a Telegram link.
 * @param {string} link - The Telegram link to extract the username from.
 * @returns {string|null} - The extracted username, or null if not found.
 */
function extractUsername(link) {
    const telegramUsernameRegex = /(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]{5,32})/i;
    const match = telegramUsernameRegex.exec(link);
    if (match && match[3]) {
        return match[3];
    }
    return null;
}
exports.extractUsername = extractUsername;
