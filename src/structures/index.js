// @ts-check
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
module.exports.PaidMediaPurchased =
  require("./PaidMediaPurchased").PaidMediaPurchased;
module.exports.PollAnswer = require("./PollAnswer").PollAnswer;
module.exports.PreCheckoutQuery =
  require("./PreCheckoutQuery").PreCheckoutQuery;
module.exports.ShippingQuery = require("./ShippingQuery").ShippingQuery;
module.exports.ChatBoost = require("./boost/ChatBoost").ChatBoost;
module.exports.ChatBoostSource =
  require("./boost/ChatBoostSource").ChatBoostSource;
module.exports.UserChatBoosts =
  require("./boost/UserChatBoosts").UserChatBoosts;
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
module.exports.Checklist = require("./checklist/Checklist").Checklist;
module.exports.ChecklistTask =
  require("./checklist/ChecklistTask").ChecklistTask;
module.exports.ChecklistTasksAdded =
  require("./checklist/ChecklistTasksAdded").ChecklistTasksAdded;
module.exports.ChecklistTasksDone =
  require("./checklist/ChecklistTasksDone").ChecklistTasksDone;
module.exports.InputChecklistTask =
  require("./checklist/InputChecklistTask").InputChecklistTask;
module.exports.Forum = require("./forum/Forum").Forum;
module.exports.ForumTopic = require("./forum/ForumTopic").ForumTopic;
module.exports.Game = require("./game/Game").Game;
module.exports.GameHighScore = require("./game/GameHighScore").GameHighScore;
module.exports.Gift = require("./gift/Gift").Gift;
module.exports.GiftInfo = require("./gift/GiftInfo").GiftInfo;
module.exports.Gifts = require("./gift/Gifts").Gifts;
module.exports.OwnedGiftRegular =
  require("./gift/OwnedGiftRegular").OwnedGiftRegular;
module.exports.OwnedGiftUnique =
  require("./gift/OwnedGiftUnique").OwnedGiftUnique;
module.exports.OwnedGifts = require("./gift/OwnedGifts").OwnedGifts;
module.exports.UniqueGift = require("./gift/UniqueGift").UniqueGift;
module.exports.UniqueGiftInfo = require("./gift/UniqueGiftInfo").UniqueGiftInfo;
module.exports.Giveaway = require("./giveaway/Giveaway").Giveaway;
module.exports.GiveawayCompleted =
  require("./giveaway/GiveawayCompleted").GiveawayCompleted;
module.exports.GiveawayWinners =
  require("./giveaway/GiveawayWinners").GiveawayWinners;
module.exports.AffiliateInfo = require("./invoice/AffiliateInfo").AffiliateInfo;
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
module.exports.SuggestedPostApprovalFailed =
  require("./invoice/SuggestedPostApprovalFailed").SuggestedPostApprovalFailed;
module.exports.SuggestedPostApproved =
  require("./invoice/SuggestedPostApproved").SuggestedPostApproved;
module.exports.SuggestedPostDeclined =
  require("./invoice/SuggestedPostDeclined").SuggestedPostDeclined;
module.exports.SuggestedPostInfo =
  require("./invoice/SuggestedPostInfo").SuggestedPostInfo;
module.exports.SuggestedPostPaid =
  require("./invoice/SuggestedPostPaid").SuggestedPostPaid;
module.exports.SuggestedPostPrice =
  require("./invoice/SuggestedPostPrice").SuggestedPostPrice;
module.exports.SuggestedPostRefunded =
  require("./invoice/SuggestedPostRefunded").SuggestedPostRefunded;
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
module.exports.StickerSet = require("./media/StickerSet").StickerSet;
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
module.exports.PreparedInlineMessage =
  require("./misc/PreparedInlineMessage").PreparedInlineMessage;
module.exports.ReactionCount = require("./misc/ReactionCount").ReactionCount;
module.exports.ReactionType = require("./misc/ReactionType").ReactionType;
module.exports.SharedUser = require("./misc/SharedUser").SharedUser;
module.exports.StarAmount = require("./misc/StarAmount").StarAmount;
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
module.exports.Story = require("./story/Story").Story;
module.exports.PaidMedia = require("./media/paid/PaidMedia").PaidMedia;
module.exports.PaidMediaInfo =
  require("./media/paid/PaidMediaInfo").PaidMediaInfo;
