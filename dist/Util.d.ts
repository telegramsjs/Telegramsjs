/**
 * Checks if a message contains any links.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains links, otherwise false.
 */
declare function checkMessageLinks(message: string): boolean;
/**
 * Extracts user mentions from a message.
 * @param {string} message - The message to extract mentions from.
 * @returns {string[]} - An array of user mentions found in the message.
 */
declare function extractUserMentions(message: string): string[];
/**
 * Extracts hashtags from a message.
 * @param {string} message - The message to extract hashtags from.
 * @returns {string[]} - An array of hashtags found in the message.
 */
declare function extractHashtags(message: string): string[];
/**
 * Checks if a location object is valid.
 * @param {object} location - The location object to check.
 * @param {string|number} location.latitude - The latitude of the location.
 * @param {string|number} location.longitude - The longitude of the location.
 * @returns {boolean} - Returns true if the location object is valid, otherwise false.
 */
declare function checkLocation(location: {
    latitude: string | number;
    longitude: string | number;
}): boolean;
/**
 * Checks if a message contains any user mentions.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains user mentions, otherwise false.
 */
declare function checkUserMentions(message: string): boolean;
/**
 * Checks if a message contains any hashtags.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains hashtags, otherwise false.
 */
declare function checkHashtags(message: string): boolean;
/**
 * Checks if a phone number is valid.
 * @param {string} phoneNumber - The phone number to check.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
declare function checkPhoneNumber(phoneNumber: string): boolean;
/**
 * Extracts the user ID from a Telegram link.
 * @param {string} link - The Telegram link to extract the user ID from.
 * @returns {string|null} - The extracted user ID, or null if not found.
 */
declare function extractUserIdFromLink(link: string): string | null;
/**
 * Checks if a message contains a Telegram group or channel link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a group or channel link, otherwise false.
 */
declare function checkGroupOrChannel(message: string): boolean;
/**
 * Checks if a message contains only emoji characters.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains only emoji characters, otherwise false.
 */
declare function checkEmoji(message: string): boolean;
/**
 * Checks if a message contains only a Telegram sticker.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains only a Telegram sticker, otherwise false.
 */
declare function checkSticker(message: string): boolean;
/**
 * Extracts the username from a Telegram link.
 * @param {string} link - The Telegram link to extract the username from.
 * @returns {string|null} - The extracted username, or null if not found.
 */
declare function extractUsernameFromLink(link: string): string | null;
/**
 * Checks if a message contains a Telegram bot username.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram bot username, otherwise false.
 */
declare function checkBot(message: string): boolean;
/**
 * Checks if a message contains a Telegram channel link (excluding usernames).
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram channel link, otherwise false.
 */
declare function checkChannel(message: string): boolean;
/**
 * Checks if a message contains a Telegram link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram link, otherwise false.
 */
declare function checkLink(message: string): boolean;
/**
 * Checks if a message contains a Telegram group link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram group link, otherwise false.
 */
declare function checkGroup(message: string): boolean;
/**
 * Checks if a username is valid.
 * @param {string} username - The username to check.
 * @returns {boolean} - Returns true if the username is valid, otherwise false.
 */
declare function checkUsername(username: string): boolean;
/**
 * Extracts the username from a Telegram link.
 * @param {string} link - The Telegram link to extract the username from.
 * @returns {string|null} - The extracted username, or null if not found.
 */
declare function extractUsername(link: string): string | null;
export { checkMessageLinks, extractUserMentions, extractHashtags, checkLocation, checkUserMentions, checkHashtags, checkPhoneNumber, extractUserIdFromLink, checkGroupOrChannel, checkEmoji, checkSticker, extractUsernameFromLink, checkBot, checkChannel, checkLink, checkGroup, checkUsername, extractUsername, };
//# sourceMappingURL=Util.d.ts.map