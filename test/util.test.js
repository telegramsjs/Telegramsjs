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
} = require("../dist/index");

describe("Message Functions", () => {
  test("checkMessageLinks should detect links in a message", () => {
    const messageTrue = "Check out this website: https://google.com";
    const messageFalse = "Chech out this discord: @user";
    const result1 = checkMessageLinks(messageTrue);
    const result2 = checkMessageLinks(messageFalse);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("extractUserMentions should extract user mentions from a message", () => {
    const messageMentions = "Hey @john and @jane, how are you?";
    const messageNoMentions = "Are you really human?";
    const result1 = extractUserMentions(messageMentions);
    const result2 = extractUserMentions(messageNoMentions);
    expect(result1).toEqual(["@john", "@jane"]);
    expect(result2).toEqual([]);
  });

  test("extractHashtags should extract hashtags from a message", () => {
    const messageHashtag = "This post is about #programming and #coding";
    const messageNoHashtag = "This post does not contain hashtags";
    const result1 = extractHashtags(messageHashtag);
    const result2 = extractHashtags(messageNoHashtag);
    expect(result1).toEqual(["#programming", "#coding"]);
    expect(result2).toEqual([]);
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
    const mentionMessage = "Hey @john, did you see @jane's message?";
    const nonMentionMessage = "Hello there!";

    const mentionResult = checkUserMentions(mentionMessage);
    const nonMentionResult = checkUserMentions(nonMentionMessage);

    expect(mentionResult).toBe(true);
    expect(nonMentionResult).toBe(false);
  });

  test("checkHashtags should detect hashtags in a message", () => {
    const hashtagMessage = "I love #coding and #programming";
    const nonHashtagMessage = "Hello there!";

    const hashtagResult = checkHashtags(hashtagMessage);
    const nonHashtagResult = checkHashtags(nonHashtagMessage);

    expect(hashtagResult).toBe(true);
    expect(nonHashtagResult).toBe(false);
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
    const groupOrChannelMessage =
      "Join our group: https://t.me/joinchat/group123";
    const nonGroupOrChannelMessage = "Hello there!";

    const groupOrChannelResult = checkGroupOrChannel(groupOrChannelMessage);
    const nonGroupOrChannelResult = checkGroupOrChannel(
      nonGroupOrChannelMessage,
    );

    expect(groupOrChannelResult).toBe(true);
    expect(nonGroupOrChannelResult).toBe(false);
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
    const botMessage = "Hey @mytelegram_bot, how are you?";
    const nonBotMessage = "Hello there!";

    const botResult = checkBot(botMessage);
    const nonBotResult = checkBot(nonBotMessage);

    expect(botResult).toBe(true);
    expect(nonBotResult).toBe(false);
  });

  test("checkChannel should check if a message contains a Telegram channel link", () => {
    const messageTrue = "Join our channel: https://t.me/mychannel";
    const messageFalse = "Join our channel: https://user";
    const result1 = checkChannel(messageTrue);
    const result2 = checkChannel(messageFalse);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("checkLink should check if a message contains a Telegram link", () => {
    const messageTrue = "Check out this link: https://t.me/mychannel";
    const messageFalse = "Check out this link: https://t.me";
    const result1 = checkLink(messageTrue);
    const result2 = checkLink(messageFalse);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("checkGroup should check if a message contains a Telegram group link", () => {
    const messageTrue = "Join our group: https://t.me/joinchat/group123";
    const messageFalse = "Join our group: https://google.com";
    const result1 = checkGroup(messageTrue);
    const result2 = checkGroup(messageFalse);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
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
    const linkTrue = "https://t.me/johndoe";
    const linkFalse = "https://google.com/johndoe";
    const result1 = extractUsername(linkTrue);
    const result2 = extractUsername(linkFalse);
    expect(result1).toBe("johndoe");
    expect(result2).toBe(null);
  });
});
