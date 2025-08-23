// @ts-check
module.exports.Base = require("./Base.js").Base;
module.exports.CallbackQuery = require("./CallbackQuery.js").CallbackQuery;
module.exports.ChatBoostRemoved =
  require("./ChatBoostRemoved.js").ChatBoostRemoved;
module.exports.ChatBoostUpdated =
  require("./ChatBoostUpdated.js").ChatBoostUpdated;
module.exports.ChatJoinRequest =
  require("./ChatJoinRequest.js").ChatJoinRequest;
module.exports.ChatMemberUpdated =
  require("./ChatMemberUpdated.js").ChatMemberUpdated;
module.exports.ChosenInlineResult =
  require("./ChosenInlineResult.js").ChosenInlineResult;
module.exports.InlineQuery = require("./InlineQuery.js").InlineQuery;
module.exports.MessageReactionCountUpdated =
  require("./MessageReactionCountUpdated.js").MessageReactionCountUpdated;
module.exports.MessageReactionUpdated =
  require("./MessageReactionUpdated.js").MessageReactionUpdated;
module.exports.PaidMediaPurchased =
  require("./PaidMediaPurchased.js").PaidMediaPurchased;
module.exports.PollAnswer = require("./PollAnswer.js").PollAnswer;
module.exports.PreCheckoutQuery =
  require("./PreCheckoutQuery.js").PreCheckoutQuery;
module.exports.ShippingQuery = require("./ShippingQuery.js").ShippingQuery;
module.exports.ChatBoost = require("./boost/ChatBoost.js").ChatBoost;
module.exports.ChatBoostSource =
  require("./boost/ChatBoostSource.js").ChatBoostSource;
module.exports.UserChatBoosts =
  require("./boost/UserChatBoosts.js").UserChatBoosts;
module.exports.BusinessConnection =
  require("./business/BusinessConnection.js").BusinessConnection;
module.exports.BusinessMessagesDeleted =
  require("./business/BusinessMessagesDeleted.js").BusinessMessagesDeleted;
module.exports.BackgroundFill =
  require("./chat/BackgroundFill.js").BackgroundFill;
module.exports.BackgroundType =
  require("./chat/BackgroundType.js").BackgroundType;
module.exports.Chat = require("./chat/Chat.js").Chat;
module.exports.ChatAdministratorRights =
  require("./chat/ChatAdministratorRights.js").ChatAdministratorRights;
module.exports.ChatBackground =
  require("./chat/ChatBackground.js").ChatBackground;
module.exports.ChatFullInfo = require("./chat/ChatFullInfo.js").ChatFullInfo;
module.exports.ChatInviteLink =
  require("./chat/ChatInviteLink.js").ChatInviteLink;
module.exports.ChatMember = require("./chat/ChatMember.js").ChatMember;
module.exports.VideoChatParticipantsInvited =
  require("./chat/VideoChatParticipantsInvited.js").VideoChatParticipantsInvited;
module.exports.VideoChatScheduled =
  require("./chat/VideoChatScheduled.js").VideoChatScheduled;
module.exports.Checklist = require("./checklist/Checklist.js").Checklist;
module.exports.ChecklistTask =
  require("./checklist/ChecklistTask.js").ChecklistTask;
module.exports.ChecklistTasksAdded =
  require("./checklist/ChecklistTasksAdded.js").ChecklistTasksAdded;
module.exports.ChecklistTasksDone =
  require("./checklist/ChecklistTasksDone.js").ChecklistTasksDone;
module.exports.InputChecklistTask =
  require("./checklist/InputChecklistTask.js").InputChecklistTask;
module.exports.Forum = require("./forum/Forum.js").Forum;
module.exports.ForumTopic = require("./forum/ForumTopic.js").ForumTopic;
module.exports.Game = require("./game/Game.js").Game;
module.exports.GameHighScore = require("./game/GameHighScore.js").GameHighScore;
module.exports.Gift = require("./gift/Gift.js").Gift;
module.exports.GiftInfo = require("./gift/GiftInfo.js").GiftInfo;
module.exports.Gifts = require("./gift/Gifts.js").Gifts;
module.exports.OwnedGiftRegular =
  require("./gift/OwnedGiftRegular.js").OwnedGiftRegular;
module.exports.OwnedGiftUnique =
  require("./gift/OwnedGiftUnique.js").OwnedGiftUnique;
module.exports.OwnedGifts = require("./gift/OwnedGifts.js").OwnedGifts;
module.exports.UniqueGift = require("./gift/UniqueGift.js").UniqueGift;
module.exports.UniqueGiftInfo =
  require("./gift/UniqueGiftInfo.js").UniqueGiftInfo;
module.exports.Giveaway = require("./giveaway/Giveaway.js").Giveaway;
module.exports.GiveawayCompleted =
  require("./giveaway/GiveawayCompleted.js").GiveawayCompleted;
module.exports.GiveawayWinners =
  require("./giveaway/GiveawayWinners.js").GiveawayWinners;
module.exports.AffiliateInfo =
  require("./invoice/AffiliateInfo.js").AffiliateInfo;
module.exports.Invoice = require("./invoice/Invoice.js").Invoice;
module.exports.OrderInfo = require("./invoice/OrderInfo.js").OrderInfo;
module.exports.RefundedPayment =
  require("./invoice/RefundedPayment.js").RefundedPayment;
module.exports.RevenueWithdrawalState =
  require("./invoice/RevenueWithdrawalState.js").RevenueWithdrawalState;
module.exports.StarTransaction =
  require("./invoice/StarTransaction.js").StarTransaction;
module.exports.StarTransactions =
  require("./invoice/StarTransactions.js").StarTransactions;
module.exports.SuccessfulPayment =
  require("./invoice/SuccessfulPayment.js").SuccessfulPayment;
module.exports.SuggestedPostApprovalFailed =
  require("./invoice/SuggestedPostApprovalFailed.js").SuggestedPostApprovalFailed;
module.exports.SuggestedPostApproved =
  require("./invoice/SuggestedPostApproved.js").SuggestedPostApproved;
module.exports.SuggestedPostDeclined =
  require("./invoice/SuggestedPostDeclined.js").SuggestedPostDeclined;
module.exports.SuggestedPostInfo =
  require("./invoice/SuggestedPostInfo.js").SuggestedPostInfo;
module.exports.SuggestedPostPaid =
  require("./invoice/SuggestedPostPaid.js").SuggestedPostPaid;
module.exports.SuggestedPostPrice =
  require("./invoice/SuggestedPostPrice.js").SuggestedPostPrice;
module.exports.SuggestedPostRefunded =
  require("./invoice/SuggestedPostRefunded.js").SuggestedPostRefunded;
module.exports.TransactionPartner =
  require("./invoice/TransactionPartner.js").TransactionPartner;
module.exports.Animation = require("./media/Animation.js").Animation;
module.exports.Audio = require("./media/Audio.js").Audio;
module.exports.Contact = require("./media/Contact.js").Contact;
module.exports.Dice = require("./media/Dice.js").Dice;
module.exports.Document = require("./media/Document.js").Document;
module.exports.Photo = require("./media/Photo.js").Photo;
module.exports.Poll = require("./media/Poll.js").Poll;
module.exports.Sticker = require("./media/Sticker.js").Sticker;
module.exports.StickerSet = require("./media/StickerSet.js").StickerSet;
module.exports.Video = require("./media/Video.js").Video;
module.exports.VideoNote = require("./media/VideoNote.js").VideoNote;
module.exports.Voice = require("./media/Voice.js").Voice;
module.exports.Message = require("./message/Message.js").Message;
module.exports.MessageEntities =
  require("./message/MessageEntities.js").MessageEntities;
module.exports.MessageOrigin =
  require("./message/MessageOrigin.js").MessageOrigin;
module.exports.ChatShared = require("./misc/ChatShared.js").ChatShared;
module.exports.ClientUser = require("./misc/ClientUser.js").ClientUser;
module.exports.ExternalReplyInfo =
  require("./misc/ExternalReplyInfo.js").ExternalReplyInfo;
module.exports.InputFile = require("./misc/InputFile.js").InputFile;
module.exports.LinkPreviewOptions =
  require("./misc/LinkPreviewOptions.js").LinkPreviewOptions;
module.exports.Location = require("./misc/Location.js").Location;
module.exports.MenuButton = require("./misc/MenuButton.js").MenuButton;
module.exports.PreparedInlineMessage =
  require("./misc/PreparedInlineMessage.js").PreparedInlineMessage;
module.exports.ReactionCount = require("./misc/ReactionCount.js").ReactionCount;
module.exports.ReactionType = require("./misc/ReactionType.js").ReactionType;
module.exports.SharedUser = require("./misc/SharedUser.js").SharedUser;
module.exports.StarAmount = require("./misc/StarAmount.js").StarAmount;
module.exports.TextQuote = require("./misc/TextQuote.js").TextQuote;
module.exports.User = require("./misc/User.js").User;
module.exports.UserProfilePhotos =
  require("./misc/UserProfilePhotos.js").UserProfilePhotos;
module.exports.UsersShared = require("./misc/UsersShared.js").UsersShared;
module.exports.Venue = require("./misc/Venue.js").Venue;
module.exports.WebhookInfo = require("./misc/WebhookInfo.js").WebhookInfo;
module.exports.EncryptedPassportElement =
  require("./passport/EncryptedPassportElement.js").EncryptedPassportElement;
module.exports.PassportData =
  require("./passport/PassportData.js").PassportData;
module.exports.PassportFile =
  require("./passport/PassportFile.js").PassportFile;
module.exports.Story = require("./story/Story.js").Story;
module.exports.PaidMedia = require("./media/paid/PaidMedia.js").PaidMedia;
module.exports.PaidMediaInfo =
  require("./media/paid/PaidMediaInfo.js").PaidMediaInfo;
