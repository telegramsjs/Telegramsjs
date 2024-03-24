const DefaultParameters = {
  offset: 0,
  limit: 1,
  timeout: 0,
  allowed_updates: [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "inline_query",
    "chosen_inline_result",
    "callback_query",
    "shipping_query",
    "pre_checkout_query",
    "poll",
    "poll_answer",
    "my_chat_member",
    "chat_join_request",
    "chat_boost",
    "removed_chat_boost",
    "chat_member",
    "message_reaction",
    "message_reaction_count",
  ],
} as const;

const ReactionTypeEmoji = {
  ThumbsUp: "👍",
  ThumbsDown: "👎",
  Heart: "❤",
  Fire: "🔥",
  ClappingHands: "👏",
  SmilingFaceWithOpenMouthAndSmilingEyes: "😁",
  ThinkingFace: "🤔",
  ExplodingHead: "🤯",
  FaceScreamingInFear: "😱",
  FaceWithSymbolsOnMouth: "🤬",
  CryingFace: "😢",
  PartyPopper: "🎉",
  StarStruck: "🤩",
  FaceVomiting: "🤮",
  PileOfPoo: "💩",
  FoldedHands: "🙏",
  OKHand: "👌",
  Dove: "🕊",
  ClownFace: "🤡",
  YawningFace: "🥱",
  FaceWithUnevenEyesAndWavyMouth: "🥴",
  HeartEyes: "😍",
  SpoutingWhale: "🐳",
  HeartOnFire: "❤‍🔥",
  NewMoonFace: "🌚",
  HotDog: "🌭",
  HundredPoints: "💯",
  RollingOnTheFloorLaughing: "🤣",
  HighVoltage: "⚡",
  Banana: "🍌",
  Trophy: "🏆",
  BrokenHeart: "💔",
  FaceWithRaisedEyebrow: "🤨",
  NeutralFace: "😐",
  Strawberry: "🍓",
  BottleWithPoppingCork: "🍾",
  KissMark: "💋",
  MiddleFinger: "🖕",
  SmilingFaceWithHorns: "😈",
  SleepingFace: "😴",
  LoudlyCryingFace: "😭",
  NerdFace: "🤓",
  Ghost: "👻",
  ManTechnologist: "👨‍💻",
  Eyes: "👀",
  JackOLantern: "🎃",
  SeeNoEvilMonkey: "🙈",
  SmilingFaceWithHalo: "😇",
  FearfulFace: "😨",
  Handshake: "🤝",
  WritingHand: "✍",
  HuggingFace: "🤗",
  Brain: "🫡",
  SantaClaus: "🎅",
  ChristmasTree: "🎄",
  Snowman: "☃",
  NailPolish: "💅",
  ZanyFace: "🤪",
  Moai: "🗿",
  CoolButton: "🆒",
  HeartWithArrow: "💘",
  HearNoEvilMonkey: "🙉",
  Unicorn: "🦄",
  FaceBlowingAKiss: "😘",
  Pill: "💊",
  SpeakNoEvilMonkey: "🙊",
  SmilingFaceWithSunglasses: "😎",
  AlienMonster: "👾",
  ManShrugging: "🤷‍♂️",
  Shrug: "🤷",
  WomanShrugging: "🤷‍♀️",
  PoutingFace: "😡",
} as const;

const AccentColors = {
  RedLight: "E15052",
  RedDark: "FF9380",
  OrangeLight: "E0802B",
  OrangeDark: "ECB04E",
  PurpleVioletLight: "A05FF3",
  PurpleVioletDark: "C697FF",
  GreenLight: "27A910",
  GreenDark: "A7EB6E",
  CyanLight: "27ACCE",
  CyanDark: "40D8D0",
  BlueLight: "3391D4",
  BlueDark: "52BFFF",
  PinkLight: "DD4371",
  PinkDark: "FF86A6",
  Custom1Light: "247BED",
  Custom1Dark: "3FA2FE",
  Custom2Light: "D67722",
  Custom2Dark: "FF905E",
  Custom3Light: "179E42",
  Custom3Dark: "66D364",
  Custom4Light: "2894AF",
  Custom4Dark: "22BCE2",
  Custom5Light: "0C9AB3",
  Custom5Dark: "22BCE2",
  Custom6Light: "7757D6",
  Custom6Dark: "9791FF",
  Custom7Light: "1585CF",
  Custom7Dark: "3DA6EB",
} as const;

const ProfileAccentColors = {
  Color0Light: "BA5650",
  Color0Dark: "9C4540",
  Color1Light: "C27C3E",
  Color1Dark: "945E2C",
  Color2Light: "956AC8",
  Color2Dark: "715099",
  Color3Light: "49A355",
  Color3Dark: "33713B",
  Color4Light: "3E97AD",
  Color4Dark: "387E87",
  Color5Light: "5A8FBB",
  Color5Dark: "477194",
  Color6Light: "B85378",
  Color6Dark: "944763",
  Color7Light: "7F8B95",
  Color7Dark: "435261",
  Color8Light: "C9565D",
  Color8Dark: "994343",
  Color9Light: "CF7244",
  Color9Dark: "8F552F",
  Color10Light: "9662D4",
  Color10Dark: "634691",
  Color11Light: "3D9755",
  Color11Dark: "296A43",
  Color12Light: "3D95BA",
  Color12Dark: "306C7C",
  Color13Light: "538BC2",
  Color13Dark: "38618C",
  Color14Light: "B04F74",
  Color14Dark: "884160",
  Color15Light: "637482",
  Color15Dark: "53606E",
};

export {
  DefaultParameters,
  ReactionTypeEmoji,
  AccentColors,
  ProfileAccentColors,
};