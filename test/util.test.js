const {
  checkMessageLinks,
  extractUserMentions,
  extractHashtags,
  checkLocation,
  checkUserMentions,
  checkHashtags,
  checkPhoneNumber,
  extractUserIdFromLink,
  checkGroupOrChannel,
  checkEmoji,
  checkSticker,
  extractUsernameFromLink,
  checkBot,
  checkChannel,
  checkLink,
  checkGroup,
  checkUsername,
  extractUsername,
} = require("../dist/cjs/index");

describe("Message Functions", () => {
  test("checkMessageLinks should detect links in a message", () => {
    const message = "Check out this website: https://example.com";
    const result = checkMessageLinks(message);
    expect(result).toBe(true);
  });

  test("extractUserMentions should extract user mentions from a message", () => {
    const message = "Hey @john and @jane, how are you?";
    const result = extractUserMentions(message);
    expect(result).toEqual(["@john", "@jane"]);
  });

  test("extractHashtags should extract hashtags from a message", () => {
    const message = "This post is about #programming and #coding";
    const result = extractHashtags(message);
    expect(result).toEqual(["#programming", "#coding"]);
  });

  test("checkLocation should validate a location object", () => {
    const validLocation = { latitude: 51.5074, longitude: -0.1278 };
    const invalidLocation = { lat: 51.5074, lon: -0.1278 };
    const result1 = checkLocation(validLocation);
    const result2 = checkLocation(invalidLocation);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("checkUserMentions should detect user mentions in a message", () => {
    const message = "Hey @john, did you see @jane's message?";
    const result = checkUserMentions(message);
    expect(result).toBe(true);
  });

  test("checkHashtags should detect hashtags in a message", () => {
    const message = "I love #coding and #programming";
    const result = checkHashtags(message);
    expect(result).toBe(true);
  });
});

describe("Telegram Functions", () => {
  test("checkPhoneNumber should validate a phone number", () => {
    const validPhoneNumber = "+380986246787";
    const invalidPhoneNumber = "1234567890";
    const result1 = checkPhoneNumber(validPhoneNumber);
    const result2 = checkPhoneNumber(invalidPhoneNumber);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("extractUserIdFromLink should extract the user ID from a Telegram link", () => {
    const link = "https://t.me/johndoe";
    const result = extractUserIdFromLink(link);
    expect(result).toBe("johndoe");
  });

  test("checkGroupOrChannel should detect group or channel links in a message", () => {
    const message = "Join our group: https://t.me/joinchat/group123";
    const result = checkGroupOrChannel(message);
    expect(result).toBe(true);
  });

  test("checkEmoji should check if a message contains only emoji characters", () => {
    const emoji = "😀😎🥳";
    const nonEmoji = "Hello, world!";
    const result1 = checkEmoji(emoji);
    const result2 = checkEmoji(nonEmoji);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("checkSticker should check if a message contains only a Telegram sticker", () => {
    const sticker = "👍";
    const nonSticker = "Hello, world!";
    const result1 = checkSticker(sticker);
    const result2 = checkSticker(nonSticker);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("extractUsernameFromLink should extract the username from a Telegram link", () => {
    const link = "https://t.me/johndoe";
    const result = extractUsernameFromLink(link);
    expect(result).toBe("johndoe");
  });

  test("checkBot should check if a message contains a Telegram bot username", () => {
    const message = "Hey @mytelegram_bot, how are you?";
    const result = checkBot(message);
    expect(result).toBe(true);
  });

  test("checkChannel should check if a message contains a Telegram channel link", () => {
    const message = "Join our channel: https://t.me/mychannel";
    const result = checkChannel(message);
    expect(result).toBe(true);
  });

  test("checkLink should check if a message contains a Telegram link", () => {
    const message = "Check out this link: https://t.me/mychannel";
    const result = checkLink(message);
    expect(result).toBe(true);
  });

  test("checkGroup should check if a message contains a Telegram group link", () => {
    const message = "Join our group: https://t.me/joinchat/group123";
    const result = checkGroup(message);
    expect(result).toBe(true);
  });

  test("checkUsername should validate a Telegram username", () => {
    const validUsername = "@johndoe";
    const invalidUsername = "johndoe1";
    const result1 = checkUsername(validUsername);
    const result2 = checkUsername(invalidUsername);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("extractUsername should extract the username from a Telegram link", () => {
    const link = "https://t.me/johndoe";
    const result = extractUsername(link);
    expect(result).toBe("johndoe");
  });
});
