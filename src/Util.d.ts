/**
 * Checks if a message contains any links.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains links, otherwise false.
 */
export function checkMessageLinks(message: string): boolean;
/**
 * Extracts user mentions from a message.
 * @param {string} message - The message to extract mentions from.
 * @returns {string[]} - An array of user mentions found in the message.
 */
export function extractUserMentions(message: string): string[];
/**
 * Extracts hashtags from a message.
 * @param {string} message - The message to extract hashtags from.
 * @returns {string[]} - An array of hashtags found in the message.
 */
export function extractHashtags(message: string): string[];
/**
 * Checks if a location object is valid.
 * @param {object} location - The location object to check.
 * @param {string|number} location.latitude - The latitude of the location.
 * @param {string|number} location.longitude - The longitude of the location.
 * @returns {boolean} - Returns true if the location object is valid, otherwise false.
 */
export function checkLocation(location: {
    latitude: string | number;
    longitude: string | number;
}): boolean;
/**
 * Checks if a message contains any user mentions.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains user mentions, otherwise false.
 */
export function checkUserMentions(message: string): boolean;
/**
 * Checks if a message contains any hashtags.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains hashtags, otherwise false.
 */
export function checkHashtags(message: string): boolean;
/**
 * Checks if a phone number is valid.
 * @param {string} phoneNumber - The phone number to check.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
export function checkPhoneNumber(phoneNumber: string): boolean;
/**
 * Extracts the user ID from a Telegram link.
 * @param {string} link - The Telegram link to extract the user ID from.
 * @returns {string|null} - The extracted user ID, or null if not found.
 */
export function extractUserIdFromLink(link: string): string | null;
/**
 * Checks if a message contains a Telegram group or channel link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a group or channel link, otherwise false.
 */
export function checkGroupOrChannel(message: string): boolean;
/**
 * Checks if a message contains only emoji characters.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains only emoji characters, otherwise false.
 */
export function checkEmoji(message: string): boolean;
/**
 * Checks if a message contains only a Telegram sticker.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains only a Telegram sticker, otherwise false.
 */
export function checkSticker(message: string): boolean;
/**
 * Extracts the username from a Telegram link.
 * @param {string} link - The Telegram link to extract the username from.
 * @returns {string|null} - The extracted username, or null if not found.
 */
export function extractUsernameFromLink(link: string): string | null;
/**
 * Checks if a message contains a Telegram bot username.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram bot username, otherwise false.
 */
export function checkBot(message: string): boolean;
/**
 * Checks if a message contains a Telegram channel link (excluding usernames).
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram channel link, otherwise false.
 */
export function checkChannel(message: string): boolean;
/**
 * Checks if a message contains a Telegram link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram link, otherwise false.
 */
export function checkLink(message: string): boolean;
/**
 * Checks if a message contains a Telegram group link.
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message contains a Telegram group link, otherwise false.
 */
export function checkGroup(message: string): boolean;
/**
 * Checks if a username is valid.
 * @param {string} username - The username to check.
 * @returns {boolean} - Returns true if the username is valid, otherwise false.
 */
export function checkUsername(username: string): boolean;
/**
 * Extracts the username from a Telegram link.
 * @param {string} link - The Telegram link to extract the username from.
 * @returns {string|null} - The extracted username, or null if not found.
 */
export function extractUsername(link: string): string | null;
