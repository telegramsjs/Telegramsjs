module.exports.Base = require("./Base").Base;
module.exports.CallbackQuery = require("./CallbackQuery").CallbackQuery;
module.exports.ChatBoostRemoved =
  require("./ChatBoostRemoved").ChatBoostRemoved;
module.exports.ChatBoostUpdated =
  require("./ChatBoostUpdated").ChatBoostUpdated;
module.exports.ChatJoinRequest = require("./ChatJoinRequest").ChatJoinRequest;
module.exports.ChatMemberUpdated =
  require("./ChatMemberUpdated").ChatMemberUpdated;
module.exports.ChosenInlineResult =
  require("./ChosenInlineResult").ChosenInlineResult;
module.exports.InlineQuery = require("./InlineQuery").InlineQuery;
module.exports.MessageReactionCountUpdated =
  require("./MessageReactionCountUpdated").MessageReactionCountUpdated;
module.exports.MessageReactionUpdated =
  require("./MessageReactionUpdated").MessageReactionUpdated;
module.exports.PollAnswer = require("./PollAnswer").PollAnswer;
module.exports.PreCheckoutQuery =
  require("./PreCheckoutQuery").PreCheckoutQuery;
module.exports.ShippingQuery = require("./ShippingQuery").ShippingQuery;
module.exports.index = require("./index").index;
module.exports.ChatBoost = require("./boots/ChatBoost").ChatBoost;
module.exports.ChatBoostSource =
  require("./boots/ChatBoostSource").ChatBoostSource;
module.exports.UserChatBoosts =
  require("./boots/UserChatBoosts").UserChatBoosts;
module.exports.BusinessConnection =
  require("./business/BusinessConnection").BusinessConnection;
module.exports.BusinessMessagesDeleted =
  require("./business/BusinessMessagesDeleted").BusinessMessagesDeleted;
module.exports.BackgroundFill = require("./chat/BackgroundFill").BackgroundFill;
module.exports.BackgroundType = require("./chat/BackgroundType").BackgroundType;
module.exports.Chat = require("./chat/Chat").Chat;
module.exports.ChatAdministratorRights =
  require("./chat/ChatAdministratorRights").ChatAdministratorRights;
module.exports.ChatBackground = require("./chat/ChatBackground").ChatBackground;
module.exports.ChatFullInfo = require("./chat/ChatFullInfo").ChatFullInfo;
module.exports.ChatInviteLink = require("./chat/ChatInviteLink").ChatInviteLink;
module.exports.ChatMember = require("./chat/ChatMember").ChatMember;
module.exports.VideoChatParticipantsInvited =
  require("./chat/VideoChatParticipantsInvited").VideoChatParticipantsInvited;
module.exports.VideoChatScheduled =
  require("./chat/VideoChatScheduled").VideoChatScheduled;
module.exports.Forum = require("./forum/Forum").Forum;
module.exports.ForumTopic = require("./forum/ForumTopic").ForumTopic;
module.exports.Game = require("./game/Game").Game;
module.exports.GameHighScore = require("./game/GameHighScore").GameHighScore;
module.exports.Giveaway = require("./giveaway/Giveaway").Giveaway;
module.exports.GiveawayCompleted =
  require("./giveaway/GiveawayCompleted").GiveawayCompleted;
module.exports.GiveawayWinners =
  require("./giveaway/GiveawayWinners").GiveawayWinners;
module.exports.Invoice = require("./invoice/Invoice").Invoice;
module.exports.OrderInfo = require("./invoice/OrderInfo").OrderInfo;
module.exports.RefundedPayment =
  require("./invoice/RefundedPayment").RefundedPayment;
module.exports.RevenueWithdrawalState =
  require("./invoice/RevenueWithdrawalState").RevenueWithdrawalState;
module.exports.StarTransaction =
  require("./invoice/StarTransaction").StarTransaction;
module.exports.StarTransactions =
  require("./invoice/StarTransactions").StarTransactions;
module.exports.SuccessfulPayment =
  require("./invoice/SuccessfulPayment").SuccessfulPayment;
module.exports.TransactionPartner =
  require("./invoice/TransactionPartner").TransactionPartner;
module.exports.Animation = require("./media/Animation").Animation;
module.exports.Audio = require("./media/Audio").Audio;
module.exports.Contact = require("./media/Contact").Contact;
module.exports.Dice = require("./media/Dice").Dice;
module.exports.Document = require("./media/Document").Document;
module.exports.Photo = require("./media/Photo").Photo;
module.exports.Poll = require("./media/Poll").Poll;
module.exports.Sticker = require("./media/Sticker").Sticker;
module.exports.Video = require("./media/Video").Video;
module.exports.VideoNote = require("./media/VideoNote").VideoNote;
module.exports.Voice = require("./media/Voice").Voice;
module.exports.Message = require("./message/Message").Message;
module.exports.MessageEntities =
  require("./message/MessageEntities").MessageEntities;
module.exports.MessageOrigin = require("./message/MessageOrigin").MessageOrigin;
module.exports.ChatShared = require("./misc/ChatShared").ChatShared;
module.exports.ClientUser = require("./misc/ClientUser").ClientUser;
module.exports.ExternalReplyInfo =
  require("./misc/ExternalReplyInfo").ExternalReplyInfo;
module.exports.InputFile = require("./misc/InputFile").InputFile;
module.exports.LinkPreviewOptions =
  require("./misc/LinkPreviewOptions").LinkPreviewOptions;
module.exports.Location = require("./misc/Location").Location;
module.exports.MenuButton = require("./misc/MenuButton").MenuButton;
module.exports.ReactionType = require("./misc/ReactionType").ReactionType;
module.exports.SharedUser = require("./misc/SharedUser").SharedUser;
module.exports.Story = require("./misc/Story").Story;
module.exports.TextQuote = require("./misc/TextQuote").TextQuote;
module.exports.User = require("./misc/User").User;
module.exports.UserProfilePhotos =
  require("./misc/UserProfilePhotos").UserProfilePhotos;
module.exports.UsersShared = require("./misc/UsersShared").UsersShared;
module.exports.Venue = require("./misc/Venue").Venue;
module.exports.WebhookInfo = require("./misc/WebhookInfo").WebhookInfo;
module.exports.EncryptedPassportElement =
  require("./passport/EncryptedPassportElement").EncryptedPassportElement;
module.exports.PassportData = require("./passport/PassportData").PassportData;
module.exports.PassportFile = require("./passport/PassportFile").PassportFile;
module.exports.PaidMedia = require("./media/paid/PaidMedia").PaidMedia;
module.exports.PaidMediaInfo =
  require("./media/paid/PaidMediaInfo").PaidMediaInfo;
