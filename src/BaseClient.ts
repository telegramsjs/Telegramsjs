import * as https from "https";
import { Request } from "./request.js";
import { TelegramApiError } from "./errorcollection.js";

type TelegramApiResponse = {
	error_code?: number;
	description?: string;
	ok?: boolean;
	result?: object | undefined;
};

export class BaseClient extends Request {
	token: string = "";
	intents?: string[] | number[] | null | undefined = null;
	parseMode?: string;
	chatId?: string | number;
	queryString?: string | undefined;
	offSetType?: any;
	/**
	 * Creat method Telegram Api
	 * @param {string} token - The Telegram Bot API token.
	 * @param {string | array | number} [intents] - The client intents.
	 * @param {string} [parseMode] - The parse mode for message formatting.
	 * @param {string | number} [chatId] - The default chat ID for sending messages.
	 * @param {string} [queryString] - The default query string for API requests.
	 * @param {string | object} [offSetType] - The type of offset to use for updates.
	 * @param {string} [options.parseMode] - The parse mode for message formatting.
	 */
	constructor(
		token: string,
		intents?: readonly string[] | number[] | null,
		parseMode?: string,
		chatId?: string | number,
		queryString?: string,
		offSetType?: any,
	) {
		super(token, intents, queryString, offSetType, parseMode);
		this.parseMode = parseMode;
		this.chatId = chatId;
	}

	/**
  * Get information about the bot itself.
  *
  * @async
  
  * @returns {Promise<object | undefined>} Returns a Promise that resolves with an object containing information about the bot.
  * @throws {TelegramApiError} Throws an error if the response is empty or if there is an error returned by the Telegram API.
  */
	async getMe(): Promise<object | undefined> {
		const method = "getMe";
		const response: TelegramApiResponse = await this.request(method);
		if (!response) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Delete the webhook.
	 * @async
	 * @param {object} options - Options to configure the webhook deletion.
	 * @param {boolean} options.dropPendingUpdates - Pass true to drop pending updates while deleting the webhook.
	 * @returns {Promise<object | undefined>} - Returns the response object containing the result of the deletion request.
	 * @throws {TelegramApiError} - Throws an error if the webhook deletion fails.
	 */
	async deleteWebhook(options: {
		dropPendingUpdates: boolean;
	}): Promise<object | undefined> {
		const method = "deleteWebhook";
		const params = {
			drop_pending_updates: options?.dropPendingUpdates,
		};
		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Get current webhook status.
 * @async
 
 * @returns {Promise<object | undefined>} An object representing the current webhook status.
 * @throws {TelegramApiError} If an error occurs while fetching the webhook status.
 */
	async getWebhookInfo(): Promise<object | undefined> {
		const method = "getWebhookInfo";
		const response: TelegramApiResponse = await this.request(method);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Send a message to a chat.
	 * @async
	 * @param {object} options - object containing options for the message
	 * @param {number|string} [options.chatId=this.chatId] - Unique identifier for the target chat or username of the target channel
	 * @param {string} options.text - Text of the message to be sent.
	 * @param {string} [options.replyMarkup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @param {boolean} [options.allowReply] - Pass `true` if the message should be sent even if the specified replied-to message is not found
	 * @param {boolean} [options.notification] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.content] - Pass `true` if the message should be encrypted.
	 * @param {number} [options.threadId] - Unique identifier for the target message thread.
	 * @param {number} [options.replyToMessageId] - If the message is a reply, the ID of the original message.
	 * @param {string} [options.parseMode=this.parseMode] - Send `'Markdown'` or `'HTML'` if you want Telegram apps to show bold, italic, fixed-width text, or inline URLs in your bot's message.
	 * @returns {Promise<object | undefined>} Returns the sent message.
	 * @throws {TelegramApiError} Throws an error if there is a problem with the Telegram API request.
	 */
	async sendMessage(options: {
		chatId: string | number;
		text: string;
		replyMarkup?: string;
		allowReply?: boolean;
		notification?: boolean;
		content?: boolean | undefined;
		threadId?: number;
		replyToMessageId?: number;
		parseMode?: string;
	}): Promise<object | undefined> {
		const method = "sendMessage";
		const params: Record<
			string,
			| string
			| number
			| boolean
			| readonly string[]
			| readonly number[]
			| readonly boolean[]
			| null
		> = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			text: options.text,
			reply_markup: options.replyMarkup as string | null,
			allow_sending_without_reply: options.allowReply as boolean | null,
			disable_notification: options.notification as boolean | null,
			protect_content: options.content as boolean | null,
			message_thread_id: options.threadId as number | null,
			reply_to_message_id: options.replyToMessageId as number | null,
			parse_mode: options.parseMode
				? options.parseMode
				: (this.parseMode as string | null),
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a photo to the chat.
	 * @async
	 * @param {object} options - The options object.
	 * @param {number} options.chatId=this.chatId - The ID of the chat where the photo will be sent.
	 * @param {number} [options.threadId] - The ID of the thread message.
	 * @param {any} options.photo - The photo to be sent. Can be a string URL or Buffer.
	 * @param {string} options.caption - The photo caption.
	 * @param {string} [options.parseMode] - The parse mode of the caption. Can be "MarkdownV2" or "HTML".
	 * @param {Array<object>} options.captionEntities - The special entities of the caption.
	 * @param {boolean} [options.hasSpoiler] - If the photo should be marked as a spoiler.
	 * @param {boolean} [options.notification] - If notifications should be disabled for the message.
	 * @param {boolean} [options.content] - If the message should be protected by the "new forwarded messages privacy mode".
	 * @param {number} [options.replyToMessageId] - The ID of the message being replied to.
	 * @param {boolean} [options.allowReply] - If the message can be sent without a reply to another message.
	 * @param {object} [options.replyMarkup] - The reply markup object.
	 * @returns {Promise<object | undefined>} - The sent photo object.
	 * @throws {TelegramApiError} - If an error occurs while sending the photo.
	 */
	async sendPhoto(options: any): Promise<object | undefined> {
		const method = "sendPhoto";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.threadId,
			photo: options.photo,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			has_spoiler: options.hasSpoiler,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
    * Sends an audio message to the chat.
    * @async
    
    * @param {object} options - The options to configure the audio message.
    * @param {string} [options.chatId=this.chatId] - The chat ID of the recipient.
    * @param {string} [options.threadId] - The message thread ID.
    * @param {any} options.audio - The audio file to send.
    * @param {string} [options.caption] - The caption of the audio message.
    * @param {string} [options.parseMode=this.parseMode] - The parsing mode of the caption
    * @param {Array} [options.captionEntities] - The special entities in the caption.
    * @param {number} [options.duration] - The duration of the audio message.
    * @param {string} [options.performer] - The performer of the audio file.
    * @param {string} [options.title] - The title of the audio file.
    * @param {any} [options.thumbnail] - The thumbnail of the audio message.
    * @param {boolean} [options.notification=true] - If true, sends the message silently.
    * @param {boolean} [options.content=false] - If true, protects the audio file from unauthorized access.
    * @param {number} [options.replyToMessageId] - The ID of the message to reply to.
    * @param {boolean} [options.allowReply=false] - If true, allows the message to be sent without replying to a message.
    * @param {object | string} [options.replyMarkup] - The reply markup of the message.
    * @throws {TelegramApiError} If there is an error sending the message.
    * @returns {Promise<object | undefined>} The sent audio message object.
    */
	async sendAudio(options: any): Promise<object | undefined> {
		const method = "sendAudio";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.threadId,
			audio: options.audio,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			duration: options.duration,
			performer: options.performer,
			title: options.title,
			thumbnail: options.thumbnail,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a document to the chat.
	 * @async
	 * @param {object} options - Options for sending the document.
	 * @param {number} [options.chatId] - Unique identifier for the target chat or username of the target channel.
	 * @param {number} [options.threadId] - Identifier of the message thread.
	 * @param {any} options.document - File path or Stream for the document to send.
	 * @param {any} [options.thumbnail] - File path or Stream for the document's thumbnail.
	 * @param {string} [options.caption] - Caption for the document.
	 * @param {string} [options.parseMode] - The mode for parsing entities in the document caption. One of "Markdown" or "HTML".
	 * @param {Array} [options.captionEntities] - List of special entities to highlight in the document caption.
	 * @param {boolean} [options.disableContentTypeDetection] - Disables automatic content type detection for uploaded files.
	 * @param {boolean} [options.notification] - Sends the message silently if true.
	 * @param {boolean} [options.content] - If the document should be protected by a password.
	 * @param {number} [options.replyToMessageId] - Identifier of the message being replied to.
	 * @param {boolean} [options.allowReply] - Pass true to enable sending the message without a reply.
	 * @param {object | string} [options.replyMarkup] - InlineKeyboardMarkup or ReplyKeyboardMarkup for the sent message.
	 * @throws {TelegramApiError} When the request to the Telegram API fails.
	 * @returns {Promise<object | undefined>} The sent message object.
	 */
	async sendDocument(options: any): Promise<object | undefined> {
		const method = "sendDocument";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.threadId,
			document: options.document,
			thumbnail: options.thumbnail,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			disable_content_type_detection: options.disableContentTypeDetection,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
   * Sends a video message to a chat.
   * @async
   
   * @param {object} options - Options for the video message.
   * @param {string|number} options.chatId - Unique identifier for the target chat or username of the target channel.
   * @param {any} options.video - Video to send. Can be a string path or a stream.
   * @param {number} [options.duration] - Duration of the video in seconds.
   * @param {number} [options.width] - Width of the video.
   * @param {number} [options.height] - Height of the video.
   * @param {string} [options.thumbnail] - Thumbnail of the video. Can be a string path or a stream.
   * @param {string} [options.caption] - Caption for the video.
   * @param {string} [options.parseMode] - Mode for parsing entities in the video caption.
   * @param {Array} [options.captionEntities] - List of special entities that appear in the video caption.
   * @param {boolean} [options.hasSpoiler] - Pass true, if a spoiler for the media message is needed.
   * @param {boolean} [options.supportsStreaming] - Pass true, if the uploaded video is suitable for streaming.
   * @param {boolean} [options.notification] - Sends the message silently. Users will receive a notification with no sound.
   * @param {boolean} [options.content] - Pass true, if the video should be encrypted.
   * @param {number} [options.replyToMessageId] - The ID of the message to reply to.
   * @param {boolean} [options.allowReply] - Pass true, if the message should be sent even if the specified replied-to message is not found.
   * @param {object | string} [options.replyMarkup] - Additional interface options for the message.
   * @returns {Promise<object | undefined>} Returns a Promise that resolves to the sent video message object on success.
   * @throws {TelegramApiError} Throws an error if the API response returns an error code.
   */
	async sendVideo(options: any): Promise<object | undefined> {
		const method = "sendVideo";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			video: options.video,
			duration: options.duration,
			width: options.width,
			height: options.height,
			thumbnail: options.thumbnail,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			has_spoiler: options.hasSpoiler,
			supports_streaming: options.supportsStreaming,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
   * Sends an animation message to a specified chat or channel.
   * @async
   
   * @param {object} options - The options for sending the animation message.
   * @param {string} [options.chatId] - The chat or channel id to send the animation message to.
   * @param {string} options.animation - The animation to be sent.
   * @param {number} [options.duration] - The duration of the animation.
   * @param {number} [options.width] - The width of the animation.
   * @param {number} [options.height] - The height of the animation.
   * @param {string} [options.thumbnail] - The thumbnail of the animation.
   * @param {string} [options.caption] - The caption of the animation.
   * @param {string} [options.parseMode] - The parse mode of the animation.
   * @param {Array} [options.captionEntities] - The caption entities of the animation.
   * @param {boolean} [options.hasSpoiler] - Whether the animation has a spoiler.
   * @param {boolean} [options.notification] - Whether the notification for the message should be disabled.
   * @param {boolean} [options.content] - Whether the message content should be protected.
   * @param {number} [options.replyToMessageId] - The message id to reply to.
   * @param {boolean} [options.allowReply] - Whether the message can be sent without a reply.
   * @param {object | string} [options.replyMarkup] - The reply markup for the message.
   * @param {string} [options.threadId] - The id of the message thread to send the animation to.
   * @returns {Promise<object | undefined>} - The response object from the Telegram API.
   * @throws {TelegramApiError} - If there was an error while sending the animation message.
   */
	async sendAnimation(options: any): Promise<object | undefined> {
		const method = "sendAnimation";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			animation: options.animation,
			duration: options.duration,
			width: options.width,
			height: options.height,
			thumbnail: options.thumbnail,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			has_spoiler: options.hasSpoiler,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
			message_thread_id: options.threadId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a voice message to the specified chat.
	 * @async
	 * @param {object} options - Options for sending the voice message.
	 * @param {string} options.voice - The voice file to send.
	 * @param {string|number} [options.chatId] - The chat ID to send the voice message to. Defaults to the chat ID of the current context if not provided.
	 * @param {string} [options.caption] - Caption for the voice message, 0-1024 characters.
	 * @param {string} [options.parseMode] - The parse mode of the message caption. Defaults to the parse mode of the current context if not provided.
	 * @param {Array} [options.captionEntities] - Additional entities to specify for message caption.
	 * @param {number} [options.duration] - Duration of the voice message in seconds.
	 * @param {boolean} [options.notification] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.content] - Pass true if the uploaded voice message is a file protected with a password.
	 * @param {number} [options.replyToMessageId] - The message ID to reply to.
	 * @param {boolean} [options.allowReply] - Pass true if sending the message without reply is allowed.
	 * @param {object | string} [options.replyMarkup] - InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply. Additional interface options for the message.
	 * @param {string} [options.threadId] - Unique identifier for the target chat thread.
	 * @returns {Promise<object | undefined>} On success, the sent Message is returned.
	 * @throws {TelegramApiError} If an error occurs while sending the voice message.
	 */
	async sendVoice(options: any): Promise<object | undefined> {
		const method = "sendVoice";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			voice: options.voice,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			duration: options.duration,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
			message_thread_id: options.threadId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a video note message to a chat.
	 * @async
	 * @param {object} options - The options object.
	 * @param {string|number} options.chatId - The chat ID to send the message to.
	 * @param {string} options.videoNote - The video note file to send. Pass a file ID or a URL to the video note file.
	 * @param {number} [options.duration] - Duration of the video note in seconds.
	 * @param {number} [options.length] - File size of the video note.
	 * @param {object} [options.thumbnail] - Optional thumbnail (image file to use as the thumbnail) for the video note.
	 * @param {boolean} [options.notification] - Sends the message silently if true, otherwise with sound (default).
	 * @param {boolean} [options.content] - True, if the video note should be protected by a password.
	 * @param {number} [options.threadId] - Message thread ID.
	 * @param {number} [options.replyToMessageId] - ID of the original message when sending a reply.
	 * @param {boolean} [options.allowReply] - Pass true, if the message should be sent even without a reply message.
	 * @param {object | string} [options.replyMarkup] - Additional interface options (JSON-serialized object).
	 * @throws {TelegramApiError} Throws an error if the response contains an error_code property.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the sent message object.
	 */
	async sendVideoNote(options: any): Promise<object | undefined> {
		const method = "sendVideoNote";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			video_note: options.videoNote,
			duration: options.duration,
			length: options.length,
			thumbnail: options.thumbnail,
			disable_notification: options.notification,
			protect_content: options.content,
			message_thread_id: options.threadId,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a media group to the specified chat.
	 * @async
	 * @param {object} options - An object containing the options for the media group.
	 * @param {number} options.chatId=this.chatId - The ID of the chat to send the media group to.
	 * @param {boolean} [options.notification=false] - Pass true to disable notification for the message.
	 * @param {boolean} [options.content=false] - Pass true to protect the content of the media group from being forwarded.
	 * @param {number} [options.threadId] - Send message as a reply to a message thread.
	 * @param {number} [options.replyToMessageId] - The ID of the message being replied to.
	 * @param {boolean} [options.allowReply=false] - Pass true to allow sending the media group without replying to a message.
	 * @param {object[]} options.media - An array of media objects to be sent in the media group.
	 * @param {string} options.media[].type - Type of the media (photo, video, etc.).
	 * @param {string | any} options.media[].media - The media to send (as a string).
	 * @param {string} [options.media[].caption] - Caption of the media (0-1024 characters).
	 * @param {string} [options.media[].parseMode] - The parse mode of the caption (Markdown, HTML).
	 * @param {number} [options.media[].width] - The width of the media (for videos and photos).
	 * @param {number} [options.media[].height] - The height of the media (for videos and photos).
	 * @param {number} [options.media[].duration] - Duration of the video/audio (in seconds).
	 * @param {boolean} [options.media[].supportsStreaming] - Pass true if the uploaded video supports streaming.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the sent media group object on success.
	 * @throws {TelegramApiError} Throws an error if the response contains an error code.
	 */
	async sendMediaGroup(options: any): Promise<object | undefined> {
		const method = "sendMediaGroup";
		const params: any = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			disable_notification: options.notification,
			protect_content: options.content,
			message_thread_id: options.threadId,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			media: {
				type: options?.media?.type,
				media: options?.media?.media,
				caption: options?.media?.caption,
				parse_mode: options?.media?.parseMode,
				width: options?.media?.width,
				height: options?.media?.height,
				duration: options?.media?.duration,
				supports_streaming: options?.media?.supportsStreaming,
			},
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sends a location message to a chat.
 *
 * @async
  sendLocation
 * @param {object} options - An object containing the options for sending the location message.
 * @param {number} options.latitude - The latitude of the location.
 * @param {number} options.longitude - The longitude of the location.
 * @param {number} [options.accuracy] - The horizontal accuracy of the location.
 * @param {number} [options.livePeriod] - The duration in seconds for which the location will be updated.
 * @param {number} [options.heading] - The direction in which the user is moving, in degrees. Must be between 1 and 360.
 * @param {number} [options.proximityRadius] - The radius of the proximity alert for the location, in meters.
 * @param {boolean} [options.notification=true] - Sends the message silently. Users will receive a notification with no sound.
 * @param {boolean} [options.content=false] - Passes the message content through the Telegram content provider.
 * @param {number} [options.threadId] - The ID of the message thread.
 * @param {number} [options.replyToMessageId] - The ID of the message to which this message is a reply.
 * @param {boolean} [options.allowReply=true] - Pass true if the message should be sent even if the specified reply_to_message_id is not found.
 * @param {object | string} [options.replyMarkup] - A JSON-serialized object for an inline keyboard or custom reply keyboard.
 * @returns {Promise<object | undefined>} The sent location message object.
 * @throws {TelegramApiError} If the Telegram API returns an error.
 */
	async sendLocation(options: any): Promise<object | undefined> {
		const method = "sendLocation";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.threadId,
			latitude: options.latitude,
			longitude: options.longitude,
			horizontal_accuracy: options.accuracy,
			live_period: options.livePeriod,
			heading: options.heading,
			proximity_alert_radius: options.proximityRadius,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a venue message to the chat.
	 * @async
	 * @param {object} options - The options to send the message.
	 * @param {string} [options.chatId] - The chat id where to send the message.
	 * @param {number} [options.threadId] - Unique identifier for the target chat thread.
	 * @param {number} options.latitude - Latitude of the venue.
	 * @param {number} options.longitude - Longitude of the venue.
	 * @param {string} options.title - Name of the venue.
	 * @param {string} options.address - Address of the venue.
	 * @param {string} [options.foursquareId] - Foursquare identifier of the venue.
	 * @param {string} [options.foursquareType] - Foursquare type of the venue, if known.
	 * @param {string} [options.googlePlaceId] - Google Places identifier of the venue.
	 * @param {string} [options.googlePlaceType] - Google Places type of the venue, if known.
	 * @param {boolean} [options.notification] - Sends the message silently.
	 * @param {boolean} [options.content] - For messages forwarded from channels, sets the channel as protected.
	 * @param {number} [options.replyToMessageId] - Id of the message to reply to.
	 * @param {boolean} [options.allowReply] - Pass True, if the message should be sent even if the specified replied-to message is not found.
	 * @param {object | string} [options.replyMarkup] - Additional interface options. An object for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
	 * @returns {Promise<object | undefined>} On success, the sent Message is returned.
	 * @throws {TelegramApiError} When there's an error sending the message.
	 */
	async sendVenue(options: any): Promise<object | undefined> {
		const method = "sendVenue";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.threadId,
			latitude: options.latitude,
			longitude: options.longitude,
			title: options.title,
			address: options.address,
			foursquare_id: options.foursquareId,
			foursquare_type: options.foursquareType,
			google_place_id: options.googlePlaceId,
			google_place_type: options.googlePlaceType,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Forward a message to a chat.
	 *
	 * @async
	 * @param {object} options - The options to use for forwarding the message.
	 * @param {number} options.chatId=this.chatId - The chat ID of the recipient chat. Required if `this.chatId` is not set.
	 * @param {number} options.fromChatId - The chat ID of the chat where the message to forward is located.
	 * @param {number} options.messageId - The message ID of the message to forward.
	 * @param {number} options.threadId - The ID of the message thread. Optional.
	 * @param {boolean} options.notification - Pass `true` to disable notification for the message. Optional.
	 * @param {boolean} options.content - Pass `true` to protect forwarded message from being copied. Optional.
	 * @throws {TelegramApiError} If an error occurs while forwarding the message.
	 * @returns {Promise<object | undefined>} The forwarded message object.
	 */
	async forwardMessage(options: any): Promise<object | undefined> {
		const method = "forwardMessage";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			from_chat_id: options.fromChatId,
			message_id: options.messageId,
			message_thread_id: options.threadId,
			disable_notification: options.notification,
			protect_content: options.content,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Copy a message from one chat to another.
 *
 * @async
 
 * @param {object} options - The options for copying the message.
 * @param {string} options.fromChatId - The chat ID of the chat where the original message is located.
 * @param {string} options.messageId - The message ID of the message to copy.
 * @param {string} [options.threadId] - The message thread ID.
 * @param {string} [options.chatId=this.chatId] - The chat ID of the chat where the message will be copied to. If not provided, uses the chat ID set in the constructor.
 * @param {string} [options.caption] - The caption of the message to be copied.
 * @param {string} [options.parseMode=this.parseMode] - The parsing mode of the message caption. If not provided, uses the parse mode set in the constructor.
 * @param {object[]} [options.captionEntities] - The entities in the message caption.
 * @param {boolean} [options.notification] - Sends the message silently. Users will receive a notification with no sound.
 * @param {boolean} [options.content] - Pass true to protect the content of the message from being forwarded without permission.
 * @param {string} [options.replyToMessageId] - The message ID being replied to.
 * @param {boolean} [options.allowSendingWithoutReply] - Pass true to allow sending the message without a reply.
 * @param {object | string} [options.replyMarkup] - The inline keyboard markup for the message.
 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error.
 * @returns {Promise<object | undefined>} Returns the copied message object.
 */
	async copyMessage(options: any): Promise<object | undefined> {
		const method = "copyMessage";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			from_chat_id: options.fromChatId,
			message_id: options.messageId,
			message_thread_id: options.threadId,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowSendingWithoutReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a contact to the chat.
	 *
	 * @async
	 * @param {object} options - Options for sending the contact.
	 * @param {number} options.chatId=this.chatId - ID of the chat where the contact should be sent.
	 * @param {string} options.phoneNumber - Phone number of the contact.
	 * @param {string} options.firstName - First name of the contact.
	 * @param {string} [options.lastName] - Last name of the contact.
	 * @param {string} [options.vcard] - Additional vCard data about the contact.
	 * @param {boolean} [options.notification=true] - Sends the message silently if true.
	 * @param {boolean} [options.content=true] - Protects the contact's content if true.
	 * @param {number} [options.threadId] - Thread ID for the message.
	 * @param {number} [options.replyToMessageId] - ID of the message being replied to.
	 * @param {boolean} [options.allowReply=true] - Allows sending the message without a reply if true.
	 * @param {object | string} [options.replyMarkup] - Additional options for reply markup.
	 * @returns {Promise<object | undefined>} - Result of the sent contact message.
	 * @throws {TelegramApiError} - Throws an error if the API request fails.
	 */
	async sendContact(options: any): Promise<object | undefined> {
		const method = "sendContact";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			phone_number: options.phoneNumber,
			first_name: options.firstName,
			last_name: options.lastName,
			vcard: options.vcard,
			disable_notification: options.notification,
			protect_content: options.content,
			message_thread_id: options.threadId,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a poll to the chat with the given options.
	 *
	 * @async
	 * @param {object} options - An object containing the poll options.
	 * @param {number} [options.chatId] - The ID of the chat to send the poll to.
	 * @param {string} options.question - The question of the poll.
	 * @param {string[]} options.options - An array of strings representing the answer options for the poll.
	 * @param {boolean} options.isAnonymous - Whether the poll is anonymous or not.
	 * @param {string} options.type - The type of the poll. Can be "quiz" or "regular".
	 * @param {boolean} options.allowsMultipleAnswers - Whether the poll allows multiple answers or not.
	 * @param {number} options.correctOptionId - The correct answer option ID for the quiz type poll.
	 * @param {string} options.explanation - The explanation for the correct answer option in the quiz type poll.
	 * @param {string} options.explanationParseMode - The parse mode for the explanation message.
	 * @param {object[]} options.explanationEntities - An array of message entities in the explanation message.
	 * @param {number} options.openPeriod - The amount of time in seconds the poll will be open for.
	 * @param {number} options.closeDate - The date when the poll will be automatically closed.
	 * @param {boolean} options.isClosed - Whether the poll is closed or not.
	 * @param {boolean} options.notification - Whether to disable notifications for the message or not.
	 * @param {boolean} options.content - Whether to protect the poll content from being copied or not.
	 * @param {number} options.threadId - The message thread ID.
	 * @param {number} options.replyToMessageId - The ID of the message being replied to.
	 * @param {boolean} options.allowReply - Whether to allow sending the poll without replying to a message or not.
	 * @param {object} options.replyMarkup - The reply markup for the message.
	 * @throws {TelegramApiError} If an error occurs while sending the poll.
	 * @returns {Promise<object | undefined>} The response from the Telegram API.
	 */
	async sendPoll(options: any): Promise<object | undefined> {
		const method = "sendPoll";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			question: options.question,
			options: options.options,
			is_anonymous: options.isAnonymous,
			type: options.type,
			allows_multiple_answers: options.allowsMultipleAnswers,
			correct_option_id: options.correctOptionId,
			explanation: options.explanation,
			explanation_parse_mode: options.explanationParseMode,
			explanation_entities: options.explanationEntities,
			open_period: options.openPeriod,
			close_date: options.closeDate,
			is_closed: options.isClosed,
			disable_notification: options.notification,
			protect_content: options.content,
			message_thread_id: options.threadId,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a dice animation to the chat.
	 *
	 * @async
	 * @param {object} options - The options for the dice animation.
	 * @param {number} [options.chatId] - The ID of the chat where to send the message.
	 * @param {string} options.emoji - The emoji to use for the dice animation.
	 * @param {boolean} [options.notification=false] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.content=false] - Pass True, if the message contains a game.
	 * @param {number} [options.threadId] - Unique identifier for the target chat or username of the target channel (in the format @channelusername) of the thread to send a reply to.
	 * @param {number} [options.replyToMessageId] - The ID of the message to reply to.
	 * @param {boolean} [options.allowReply=false] - Pass True, if the message should be sent even if the specified replied-to message is not found.
	 * @param {object | string} [options.replyMarkup] - Additional interface options for sending the message.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the sent message object on success.
	 * @throws {TelegramApiError} Throws an error when there is an error in the request.
	 */
	async sendDice(options: any): Promise<object | undefined> {
		const method = "sendDice";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			emoji: options.emoji,
			disable_notification: options.notification,
			protect_content: options.content,
			message_thread_id: options.threadId,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a chat action to indicate the bot is performing an action (typing, uploading a photo etc.) to the user.
	 * @async
	 * @param {object} options - The options object for sending the chat action.
	 * @param {string} [options.chatId=this.chatId] - The chat ID to send the chat action to. If `this.chatId` is set, it will be used by default.
	 * @param {string} options.action - The type of action to send to the user (typing, upload_photo, record_video, upload_video, record_audio, upload_audio, upload_document, find_location, record_video_note, upload_video_note).
	 * @param {string} options.threadId - Unique identifier for the target chat message thread.
	 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error code.
	 * @returns {Promise<object | undefined>} The response object from the Telegram API containing information about the sent chat action.
	 */
	async sendChatAction(options: any): Promise<object | undefined> {
		const method = "sendChatAction";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			action: options.action,
			message_thread_id: options.threadId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Returns user profile photos.
 *
 * @async
 
 * @param {object} options - The options object.
 * @param {number} options.userId - Unique identifier of the target user.
 * @param {number} [options.offset] - Sequential number of the first photo to be returned. By default, all photos are returned.
 * @param {number} [options.limit] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error.
 * @returns {Promise<object | undefined>} On success, an object containing the user profile photos is returned.
 */
	async getUserProfilePhotos(options: any): Promise<object | undefined> {
		const method = "getUserProfilePhotos";
		const params = {
			user_id: options.userId,
			offset: options.offset,
			limit: options.limit,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Get information about a file on the Telegram server
	 *
	 * @async
	 * @param {string} fileId - ID of the file to fetch information for
	 * @throws {TelegramApiError} If the Telegram API returns an error
	 * @returns {Promise<object | undefined>} An object containing information about the file
	 */
	async getFile(fileId: string): Promise<object | undefined> {
		const method = "getFile";
		const params = {
			file_id: fileId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Downloads a file from the Telegram servers.
	 * @async
	 * @param {string} filePath - The path of the file to download.
	 * @returns {Promise<any>} - A Promise that resolves with the downloaded file as a Buffer, or rejects with an error.
	 * @throws {Error} - If the HTTP response status code is not 200.
	 */
	async downloadFile(filePath: string): Promise<Buffer> {
		const fileUrl = `https://api.telegram.org/file/bot${this.token}/${filePath}`;
		return new Promise<Buffer>((resolve, reject) => {
			https
				.get(fileUrl, res => {
					if (res.statusCode !== 200) {
						reject(new Error(`Failed to download file: ${res.statusCode}`));
						return;
					}
					const chunks: Buffer[] = [];
					res.on("data", (chunk: Buffer) => chunks.push(chunk));
					res.on("end", () => resolve(Buffer.concat(chunks)));
				})
				.on("error", reject);
		});
	}

	/**
	 * Ban a chat member in the Telegram chat.
	 * @async
	 * @param {object} options - The options for banning a chat member.
	 * @param {string} [options.chatId=this.chatId] - The ID of the chat where the user is to be banned.
	 * @param {number} options.userId - The ID of the user to be banned.
	 * @param {number} options.untilDate - Date when the user will be unbanned, unix time.
	 * @param {boolean} options.revokeMessages - Pass True to delete all messages from the chat for the user that is being removed.
	 * @returns {Promise<object | undefined>} - On success, returns True.
	 * @throws {TelegramApiError} - If an error occurs while executing the request.
	 */
	async banChatMember(options: any): Promise<object | undefined> {
		const method = "banChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
			until_date: options.untilDate,
			revoke_messages: options.revokeMessages,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Unban a previously banned chat member in a Telegram chat.
 * @async
 
 * @param {object} options - Options for unbanning a chat member.
 * @param {string|number} options.userId - Unique identifier of the chat member to unban.
 * @param {string|number} [options.chatId] - Unique identifier of the target chat. If not specified, defaults to the chat associated with the bot instance.
 * @param {boolean} [options.onlyIfBanned=false] - If `true`, only unban the chat member if they are currently banned. Otherwise, unban the chat member regardless of their current ban status.
 * @returns {Promise<object | undefined>} - Promise which resolves to the result of the Telegram API request.
 * @throws {TelegramApiError} - If the request to the Telegram API fails or returns an error.
 */
	async unbanChatMember(options: any): Promise<object | undefined> {
		const method = "unbanChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
			only_if_banned: options.onlyIfBanned,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Restricts a chat member's permissions.
 * @async
  restrictChatMember
 * @param {object} options - The options to restrict the chat member.
 * @param {number} options.userId - The ID of the chat member to restrict.
 * @param {object} options.permissions - The new permissions to restrict the chat member to.
 * @param {boolean} [options.useIndependentChatPermissions] - Pass true to use the chat member's own permissions instead of the default permissions.
 * @param {number} [options.untilDate] - The date when the restrictions will be lifted.
 * @returns {Promise<object | undefined>} The updated ChatMember object.
 * @throws {TelegramApiError} Throws an error if the API response contains an error.
 */
	async restrictChatMember(options: any): Promise<object | undefined> {
		const method = "restrictChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
			permissions: options.permissions,
			use_independent_chat_permissions: options.useIndependentChatPermissions,
			until_date: options.untilDate,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Promotes a user in a chat with additional privileges.
	 * @async
	 * @param {object} options - The options object.
	 * @param {number} options.userId - The ID of the user to promote.
	 * @param {number} [options.chatId=this.chatId] - The ID of the chat where the user will be promoted. Defaults to the chat ID set in the instance.
	 * @param {boolean} [options.isAnonymous] - Pass true to promote the user anonymously.
	 * @param {boolean} [options.canManageChat] - Pass true to allow the user to manage the chat.
	 * @param {boolean} [options.canPostMessages] - Pass true to allow the user to post messages in the chat.
	 * @param {boolean} [options.canEditMessages] - Pass true to allow the user to edit messages of other users.
	 * @param {boolean} [options.canDeleteMessages] - Pass true to allow the user to delete messages of other users.
	 * @param {boolean} [options.canManageVideoChats] - Pass true to allow the user to manage voice chats.
	 * @param {boolean} [options.canRestrictMembers] - Pass true to allow the user to restrict members in the chat.
	 * @param {boolean} [options.canPromoteMembers] - Pass true to allow the user to promote other members in the chat.
	 * @param {boolean} [options.canChangeInfo] - Pass true to allow the user to change the chat's title, photo, and other settings.
	 * @param {boolean} [options.canInviteUsers] - Pass true to allow the user to invite new users to the chat.
	 * @param {boolean} [options.canPinMessages] - Pass true to allow the user to pin messages in the chat.
	 * @param {boolean} [options.canManageTopics] - Pass true to allow the user to manage chat topics.
	 * @throws {TelegramApiError} Throws an error with the Telegram API description if the response contains an error.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the promoted user object on success.
	 */
	async promoteChatMember(options: any): Promise<object | undefined> {
		const method = "promoteChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
			is_anonymous: options.isAnonymous,
			can_manage_chat: options.canManageChat,
			can_post_messages: options.canPostMessages,
			can_edit_messages: options.canEditMessages,
			can_delete_messages: options.canDeleteMessages,
			can_manage_video_chats: options.canManageVideoChats,
			can_restrict_members: options.canRestrictMembers,
			can_promote_members: options.canPromoteMembers,
			can_change_info: options.canChangeInfo,
			can_invite_users: options.canInviteUsers,
			can_pin_messages: options.canPinMessages,
			can_manage_topics: options.canManageTopics,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets a custom title for a chat administrator.
 * @async
 
 * @param {object} options - The options object.
 * @param {number} options.userId - The user ID of the administrator.
 * @param {number} [options.chatId] - The ID of the chat where the administrator's custom title should be set. If not provided, uses the current chat ID from the instance.
 * @param {string} options.customTitle - The custom title to set for the administrator.
 * @throws {TelegramApiError} If an error occurs while setting the custom title.
 * @returns {Promise<object | undefined>} A promise that resolves with `true` if the custom title was set successfully.
 */
	async setChatAdministratorCustomTitle(
		options: any,
	): Promise<object | undefined> {
		const method = "setChatAdministratorCustomTitle";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
			custom_title: options.customTitle,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Ban a user from sending messages in a chat.
 * @async
 
 * @param {object} options - The options to use for banning the user.
 * @param {string} [options.chatId=this.chatId] - The ID of the chat where the user is banned.
 * @param {number} options.senderChatId - The ID of the user to be banned.
 * @throws {TelegramApiError} If an error occurs while banning the user.
 * @returns {Promise<object | undefined>} The result of the request.
 */
	async banChatSenderChat(options: any): Promise<object | undefined> {
		const method = "banChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.senderChatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Unban a previously kicked chat member from the chat and remove any previous ban on their username.
 *
 * @async
 
 * @param {object} options - Options for unbanning a chat member.
 * @param {number} options.senderChatId - Unique identifier of the target user.
 * @param {number} [options.chatId] - Unique identifier of the target chat, required if `chatId` is not defined in class instance.
 * @throws {TelegramApiError} When an error occurs while unbanning the chat member.
 * @returns {Promise<object | undefined>} On success, the returned object will contain the `ok` field set to `true`.
 */
	async unbanChatSenderChat(options: any): Promise<object | undefined> {
		const method = "unbanChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.senderChatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets chat permissions for a given chat.
 * @async
 
 * @param {object} options - The options for setting chat permissions.
 * @param {string} [options.chatId=this.chatId] - The ID of the chat to set permissions for. If not provided, defaults to the chat ID saved in the instance.
 * @param {object} options.permissions - The chat permissions to set. This should be an object containing key-value pairs where the keys are the names of the permissions and the values are booleans indicating whether the permission should be allowed or not.
 * @param {boolean} [options.independentPermissions=false] - Whether to use independent chat permissions or not.
 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error.
 * @returns {Promise<object | undefined>} Returns a promise which resolves to the result of the API request.
 */
	async setChatPermissions(options: any): Promise<object | undefined> {
		const method = "setChatPermissions";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			permissions: options.permissions,
			use_independent_chat_permissions: options.independentPermissions,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Exports the invite link to a chat. If `chatId` is not defined on the instance, it should be provided in `options`.
	 *
	 * @async
	 * @param {string} chatId - Unique identifier for the target chat.
	 * @throws {TelegramApiError} If an error occurs while exporting the chat invite link.
	 * @returns {Promise<string>} The invite link for the chat.
	 */
	async portChatInviteLink(chatId: string): Promise<object | undefined> {
		const method = "portChatInviteLink";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Creates a new chat invite link with the specified options.
	 * @async
	 * @param {object} options - The options for the chat invite link.
	 * @param {string} [options.chatId] - The ID of the chat where the invite link will be created. If not provided, the ID of the current chat will be used.
	 * @param {string} [options.name] - The name of the chat that will be shown in the invite link preview. If not provided, the chat name will be used.
	 * @param {Date} [options.expireDate] - The date and time when the invite link will expire.
	 * @param {number} [options.memberLimit] - The maximum number of members that can join the chat using the invite link. If not provided, there will be no limit.
	 * @param {boolean} [options.createsJoinRequest] - Determines whether the invite link creates a join request instead of adding the user directly to the chat. Defaults to false.
	 * @returns {Promise<object | undefined>} - The created chat invite link object.
	 * @throws {TelegramApiError} - If the API response contains an error.
	 */
	async createChatInviteLink(options: any): Promise<object | undefined> {
		const method = "createChatInviteLink";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			name: options.name,
			expire_date: options.expireDate,
			member_limit: options.memberLimit,
			creates_join_request: options.createsJoinRequest,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Edits the specified chat invite link. Returns the edited invite link as a ChatInviteLink object.
	 * @async
	 * @param {object} options - Options for editing the chat invite link.
	 * @param {number} [options.chatId] - Unique identifier of the target chat.
	 * @param {string} options.inviteLink - The invite link to edit.
	 * @param {string} [options.name] - New name for the invite link, 1-64 characters.
	 * @param {number} [options.expireDate] - Point in time (Unix timestamp) when the link will expire, in 30-2592000 seconds.
	 * @param {number} [options.memberLimit] - Maximum number of chat members that can join the chat through the link.
	 * @param {boolean} [options.createsJoinRequest] - True, if the link is a primary link for inviting users to a chat.
	 * @returns {Promise<object | undefined>} - The edited chat invite link as a ChatInviteLink object.
	 * @throws {TelegramApiError} - If the response contains an error.
	 */
	async editChatInviteLink(options: any): Promise<object | undefined> {
		const method = "editChatInviteLink";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			invite_link: options.inviteLink,
			name: options.name,
			expire_date: options.expireDate,
			member_limit: options.memberLimit,
			creates_join_request: options.createsJoinRequest,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Revoke a chat invite link.
	 *
	 * @async
	 * @param {object} options - The options to use for the API call.
	 * @param {string} options.inviteLink - The invite link to revoke.
	 * @param {number} [options.chatId] - The ID of the chat where the invite link was generated.
	 * If not provided, the ID of the current chat instance will be used.
	 * @throws {TelegramApiError} If the API call fails, an error with the description of the problem.
	 * @returns {Promise<object | undefined>} The API response object.
	 */
	async revokeChatInviteLink(options: any): Promise<object | undefined> {
		const method = "revokeChatInviteLink";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			invite_link: options.inviteLink,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Approve a join request to a chat.
 * @async
 
 * @param {object} options - The options to approve the chat join request.
 * @param {number} options.userId - The user ID for the join request.
 * @param {number} [options.chatId] - The chat ID for the join request. If not provided, it will use the chatId property of the bot instance.
 * @throws {TelegramApiError} If the response contains an error code.
 * @returns {Promise<object | undefined>} The result of the approveChatJoinRequest method.
 */
	async approveChatJoinRequest(options: any): Promise<object | undefined> {
		const method = "approveChatJoinRequest";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Declines a chat join request from a user.
 *
 * @async
 
 * @param {object} options - Options object.
 * @param {number} options.userId - The user id of the user who sent the join request.
 * @param {number} [options.chatId] - The chat id where the join request was sent. Required if `chatId` was not specified during instance creation.
 * @throws {TelegramApiError} Throws an error if the Telegram API responds with an error.
 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the API response on success.
 */
	async declineChatJoinRequest(options: any): Promise<object | undefined> {
		const method = "declineChatJoinRequest";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets a new profile photo for the chat. The photo can be a local file path or a URL.
 * @async
 
 * @param {object} options - Options for setting the chat photo.
 * @param {number} options.chatId=this.chatId - Required if `this.chatId` is not set. Unique identifier for the target chat.
 * @param {string} options.photo - The photo to set as the chat's new profile photo.
 * @throws {TelegramApiError} If the request to the Telegram API fails or if the response contains an error code.
 * @returns {Promise<object | undefined>} On success, the method returns True.
 */
	async setChatPhoto(options: any): Promise<object | undefined> {
		const method = "setChatPhoto";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			photo: options.photo,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	 * @param {string} options - Optional parameters.
	 * @param {number} chatId=this.chatId - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).
	 * @throws {TelegramApiError} If an error is encountered while processing the request.
	 * @returns {Promise<object | undefined>} On success, returns True.
	 */
	async deleteChatPhoto(chatId: number): Promise<object | undefined> {
		const method = "deleteChatPhoto";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Set a new chat title for a given chat ID.
 * @async
 
 * @param {object} options - The options to set a new chat title.
 * @param {string} [options.chatId=this.chatId] - Unique identifier for the target chat or username of the target channel.
 * @param {string} options.title - New chat title, 1-255 characters.
 * @returns {Promise<object | undefined>} On success, the updated chat object is returned.
 * @throws {TelegramApiError} If the request to set a new chat title fails, this error is thrown.
 */
	async setChatTitle(options: any): Promise<object | undefined> {
		const method = "setChatTitle";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			title: options.title,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets the description of a chat.
 * @async
 
 * @param {object} options - The options object.
 * @param {number} options.chatId=this.chatId - The chat ID to set the description for.
 * @param {string} options.description - The new description for the chat.
 * @throws {TelegramApiError} Throws an error if the request to the Telegram API fails or if the response contains an error.
 * @returns {Promise<object | undefined>} Returns a promise that resolves to the response from the Telegram API.
 */
	async setChatDescription(options: any): Promise<object | undefined> {
		const method = "setChatDescription";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			description: options.description,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Pins a message in a chat.
 * @async
 
 * @param {object} options - The options to pin the message.
 * @param {number} options.messageId - The ID of the message to pin.
 * @param {number} [options.chatId] - The ID of the chat where the message is located. Uses the chatId property of the instance if not provided.
 * @param {boolean} [options.notification] - Pass true to disable notifications for the message. Defaults to false.
 * @throws {TelegramApiError} If an error occurs while attempting to pin the message.
 * @returns {Promise<object | undefined>} On success, the method returns True.
 */
	async pinChatMessage(options: any): Promise<object | undefined> {
		const method = "pinChatMessage";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			disable_notification: options.notification,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Unpins a message in a chat.
	 * @async
	 * @param {object} options - The options for unpinning a message in a chat.
	 * @param {number} options.messageId - The ID of the message to unpin.
	 * @param {number} [options.chatId] - The ID of the chat where the message to unpin is located. If not specified, the chat ID of the instance is used.
	 * @throws {TelegramApiError} Throws an error if the API returns an error response.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the result of the API call.
	 */
	async unpinChatMessage(options: any): Promise<object | undefined> {
		const method = "unpinChatMessage";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Unpins all chat messages in the specified chat.
	 *
	 * @async
	 * @param {number} chatId=this.chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @throws {TelegramApiError} When the API call fails.
	 * @returns {Promise<object | undefined>} On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned.
	 */
	async unpinAllChatMessages(chatId: number): Promise<object | undefined> {
		const method = "unpinAllChatMessages";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Leave a chat.
	 *
	 * @async
	 * @param {number | string} chatId=this.chatId - The chat ID of the chat to leave.
	 * @throws {TelegramApiError} When the response contains an error.
	 * @returns {Promise<object | undefined>} On success, the method returns True.
	 */

	async leaveChat(chatId: number | string): Promise<object | undefined> {
		const method = "leaveChat";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Returns information about a chat.
	 *
	 * @async
	 * @param {string} chatId - The ID of the chat to get information about.
	 * @throws {TelegramApiError} Throws an error if the response contains an error code.
	 * @returns {Promise<object | undefined>} Returns an object containing information about the chat.
	 */

	async getChat(chatId: string): Promise<object | undefined> {
		const method = "getChat";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
	 * @param {number | string} chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
	 * @throws {TelegramApiError} If the request to the Telegram API fails or if the API returns an error
	 * @returns {Promise<Array<any>>} - On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots.
	 */
	async getChatAdministrators(
		chatId: number | string,
	): Promise<object | undefined> {
		const method = "getChatAdministrators";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Retrieves the current number of members in a chat.
	 * @async
	 * @param {number} chatId=this.chatId - The identifier of the chat. If not provided, the chatId property of the TelegramBot instance will be used.
	 * @returns {Promise<object | undefined>} The number of members in the chat.
	 * @throws {TelegramApiError} If there is an error while calling the Telegram API.
	 */
	async getChatMemberCount(chatId: number): Promise<object | undefined> {
		const method = "getChatMemberCount";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Returns information about a member of a chat.
	 *
	 * @async
	 * @param {object} options - An object containing chatId and userId.
	 * @param {number|string} options.chatId - Unique identifier for the target chat or username of the target channel.
	 * @param {number} options.userId - Unique identifier of the target user.
	 * @throws {TelegramApiError} If the request to the Telegram API fails or if there is an error code in the response.
	 * @returns {Promise<object | undefined>} On success, an object containing information about the member.
	 */
	async getChatMember(options: any): Promise<object | undefined> {
		const method = "getChatMember";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			user_id: options.userId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to set a new group sticker set for a supergroup.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
	 * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method.
	 * Returns True on success.
	 *
	 * @param {object} options - An object containing options to pass.
	 * @param {number} options.chatId=this.chatId - Unique identifier for the target chat or username of the target channel.
	 * @param {string} options.stickerSetName - Name of the sticker set to be set as the group's sticker set.
	 * @return {Promise<object | undefined>} Returns True on success.
	 * @throws {TelegramApiError} When the response contains an error.
	 */
	async setChatStickerSet(options: any): Promise<object | undefined> {
		const method = "setChatStickerSet";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			sticker_set_name: options.stickerSetName,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Deletes a chat's sticker set.
	 *
	 * @async
	 * @param {number} chatId=this.chatId - Unique identifier for the target chat or username of the target channel.
	 * @throws {TelegramApiError} If an error occurs while deleting the chat's sticker set.
	 * @returns {Promise<object | undefined>} On success, the deleted chat's sticker set is returned.
	 */
	async deleteChatStickerSet(chatId: number): Promise<object | undefined> {
		const method = "deleteChatStickerSet";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Get a list of stickers corresponding to a forum topic icon
	 * @async
	 * @returns {Promise<object>} An array of sticker objects for the corresponding forum topic icon
	 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error response
	 */
	async getForumTopicIconStickers(): Promise<object | undefined> {
		const method = "getForumTopicIconStickers";
		const response: TelegramApiResponse = await this.request(method);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Creates a forum topic with the specified options.
	 * @async
	 * @param {object} options - The options to use when creating the forum topic.
	 * @param {number} [options.chatId] - The chat ID to use for the forum topic. If not provided, `this.chatId` is used instead.
	 * @param {string} options.name - The name of the forum topic.
	 * @param {string} options.iconColor - The icon color of the forum topic.
	 * @param {string} options.iconCustomEmojiId - The ID of the custom emoji to use as the icon of the forum topic.
	 * @returns {Promise<object | undefined>} - The response from the Telegram API.
	 * @throws {TelegramApiError} - If there was an error creating the forum topic.
	 */
	async createForumTopic(options: any): Promise<object | undefined> {
		const method = "createForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			name: options.name,
			icon_color: options.iconColor,
			icon_custom_emoji_id: options.iconCustomEmojiId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Edits a forum topic.
 * @async
 
 * @param {object} options - The options for editing the forum topic.
 * @param {number} options.chatId=this.chatId - The ID of the chat where the forum topic is located.
 * @param {number} options.messageThreadId - The ID of the forum topic to edit.
 * @param {string} options.name - The new name for the forum topic.
 * @param {string} options.iconCustomEmojiId - The ID of the custom emoji to use as the new icon for the forum topic.
 * @throws {TelegramApiError} If the API response contains an error code.
 * @returns {Promise<object | undefined>} The edited forum topic object.
 */
	async editForumTopic(options: any): Promise<object | undefined> {
		const method = "editForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.messageThreadId,
			name: options.name,
			icon_custom_emoji_id: options.iconCustomEmojiId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
  * Closes a forum topic in the specified chat.
  * @async
  
  * @param {object} options - The options to be passed to the function.
  * @param {number} options.chatId=this.chatId - The chat ID.
  * @param {number} options.messageThreadId - The ID of the message thread to close.
  * @throws {TelegramApiError} If the Telegram API returns an error.
  * @returns {Promise<object | undefined>} Returns a Promise that resolves to the result of the API call.
  */
	async closeForumTopic(options: any): Promise<object | undefined> {
		const method = "closeForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.messageThreadId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Reopens a previously closed discussion thread in a group or a channel. 
 * 
 * @async
 
 * @param {object} options - Options for reopening a discussion thread.
 * @param {string} options.messageThreadId - The identifier of the thread to be reopened.
 * @param {string} [options.chatId] - Unique identifier of the target chat or username of the target channel.
 * @throws {TelegramApiError} Throws error when the API call returns an error.
 */
	async reopenForumTopic(options: any): Promise<object | undefined> {
		const method = "reopenForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.messageThreadId,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response;
	}

	/**
 * Delete a forum topic with the given message thread ID from the specified chat or from the default chat ID of the TelegramBot instance.
 * @async
 
 * @param {object} options - An object containing the options for deleting a forum topic.
 * @param {number} options.messageThreadId - The ID of the message thread to delete.
 * @param {number} [options.chatId] - The ID of the chat from which to delete the message thread. If not specified, uses the default chat ID of the TelegramBot instance.
 * @returns {Promise<object | undefined>} - A Promise which resolves to an object representing the deleted forum topic.
 * @throws {TelegramApiError} - If there is an error with the Telegram API request.
 */
	async deleteForumTopic(options: any): Promise<object | undefined> {
		const method = "deleteForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.messageThreadId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Unpins all messages in a specific message thread in a Telegram chat.
 *
 * @async
 
 * @param {object} options - The options for unpinning messages.
 * @param {number} options.chatId=this.chatId - The ID of the chat where the messages are located.
 * @param {number} options.messageThreadId - The ID of the message thread where the messages are located.
 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error.
 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the API response object.
 */
	async unpinAllForumTopicMessages(options: any): Promise<object | undefined> {
		const method = "unpinAllForumTopicMessages";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.messageThreadId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Edit a general forum topic.
	 *
	 * @async
	 * @param {object} options - The options to edit the forum topic.
	 * @param {number} options.chatId=this.chatId - The chat id of the forum topic.
	 * @param {string} options.name - The new name of the forum topic.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the edited forum topic object on success.
	 * @throws {TelegramApiError} Throws an error if the API call fails.
	 */
	async editGeneralForumTopic(options: any): Promise<object | undefined> {
		const method = "editGeneralForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			name: options.name,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Closes a general forum topic in a Telegram chat.
	 * @async
	 * @param {number} chatId=this.chatId - The ID of the chat where the forum topic is located.
	 * @throws {TelegramApiError} If an error occurs while closing the forum topic.
	 * @returns {Promise<object | undefined>} The result of the API call to the Telegram server.
	 */
	async closeGeneralForumTopic(chatId: number): Promise<object | undefined> {
		const method = "closeGeneralForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Reopens a general forum topic on the chat with the specified chat ID.
	 * @async
	 * @param {string} chatId - The chat ID of the chat where the topic is located. Optional if chat ID is set in the TelegramBot constructor.
	 * @throws {TelegramApiError} Throws an error if the response from the Telegram API contains an error code.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the result of the Telegram API response.
	 */
	async reopenGeneralForumTopic(chatId: string): Promise<object | undefined> {
		const method = "reopenGeneralForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Hides the general forum topic for the specified chat.
	 *
	 * @async
	 * @param {string | number} chatId - The ID of the chat to hide the general forum topic for.
	 * @returns {Promise<object | undefined>} - Returns true if the general forum topic was successfully hidden.
	 * @throws {TelegramApiError} - Throws an error if the response contains an error code.
	 */
	async hideGeneralForumTopic(
		chatId: number | string,
	): Promise<object | undefined> {
		const method = "hideGeneralForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Unhides a previously hidden general forum topic in a Telegram chat.
	 * @async
	 * @param {string | number} chatId - The ID of the chat where the topic is hidden.
	 * @returns {Promise<object | undefined>} - Returns `true` if the topic was successfully unhidden.
	 * @throws {TelegramApiError} - Throws an error if the Telegram API responds with an error.
	 */
	async unhideGeneralForumTopic(
		chatId: string | number,
	): Promise<object | undefined> {
		const method = "unhideGeneralForumTopic";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sends an answer to a callback query sent from an inline keyboard or an inline button.
 * @async
 
 * @param {object} options - The options object.
 * @param {string} options.callbackQueryId - The unique identifier of the callback query to be answered.
 * @param {string} [options.text] - Text of the notification to be sent, 0-200 characters.
 * @param {boolean} [options.showAlert] - If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
 * @param {string} [options.url] - URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @Botfather, specify the URL that opens your game. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
 * @param {number} [options.cacheTime] - The maximum amount of time in seconds that the result of the callback query may be cached client-side. Defaults to 0.
 * @throws {TelegramApiError} Throws an error if the response contains an error_code.
 * @returns {Promise<object | undefined>} Returns true on success.
 */
	async answerCallbackQuery(options: any): Promise<object | undefined> {
		const method = "answerCallbackQuery";
		const params = {
			callback_query_id: options.callbackQueryId,
			text: options.text,
			show_alert: options.showAlert,
			url: options.url,
			cache_time: options.cacheTime,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets the list of commands supported by your bot.
 * @async
 
 * @param {object} options - Options object.
 * @param {Array<object>} options.commands - A list of bot commands.
 * @param {String} [options.scope] - A string representing the bot command scope.
 * @param {String} [options.languageCode] - A string representing the language code for the commands.
 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the API response on success, or throws a TelegramApiError on failure.
 * @throws {TelegramApiError} Throws a TelegramApiError if the API response contains an error code.
 */
	async setMyCommands(options: any): Promise<object | undefined> {
		const method = "setMyCommands";
		const params = {
			commands: options.commands,
			scope: options?.scope,
			language_code: options?.languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to delete the list of the bot's commands for the given scope and user language.
	 * Returns True on success.
	 *
	 * @param {object} options - Optional parameters for deleting bot commands.
	 * @param {string} options.scope - A string, which represent the scope of users. Pass "all_private_chats" to delete commands
	 * in all private chats and groups, or "all_public_chats" to delete commands in all chats.
	 * @param {string} options.languageCode - A string, which represent the user language for which the commands are relevant.
	 *
	 * @returns {Promise<object | undefined>} - On success, returns True.
	 *
	 * @throws {TelegramApiError} - If an error is encountered while deleting bot commands.
	 */
	async deleteMyCommands(options: any): Promise<object | undefined> {
		const method = "deleteMyCommands";
		const params = {
			scope: options?.scope,
			language_code: options?.languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Get the list of commands set by the bot for its users.
	 *
	 * @async
	 * @param {object} options - Additional options for the request.
	 * @param {string} [options.scope] - A JSON-serialized object, describing scope of users.
	 * @param {string} [options.languageCode] - A two-letter ISO 639-1 language code or an empty string.
	 * @returns {Promise<object|undefined>} Returns an array of BotCommand on success.
	 * @throws {TelegramApiError} Throws an error if there is a problem with the request.
	 */
	async getMyCommands(options: any): Promise<object | undefined> {
		const method = "getMyCommands";
		const params = {
			scope: options?.scope,
			language_code: options?.languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Asynchronously sets the name and language code for a Telegram bot.
	 *
	 * @async
	 * @param {object} options - An object containing the name and language code to set.
	 * @param {string} options.name - The name to set for the bot.
	 * @param {string} options.languageCode - The language code to set for the bot.
	 * @returns {Promise<object | undefined>} The result of the API request.
	 * @throws {TelegramApiError} Throws an error if there is an error in the API response.
	 */
	async setMyName(options: any): Promise<object | undefined> {
		const method = "setMyName";
		const params = {
			name: options?.name,
			language_code: options?.languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Asynchronously retrieves the name of the user associated with the current API authentication token.
	 * @async
	 * @param {string} languageCode - An optional parameter to specify the language code in which to retrieve the name.
	 * @throws {TelegramApiError} If there is an error with the Telegram API.
	 * @returns {Promise<object | undefined>} The name of the user associated with the current API authentication token.
	 */
	async getMyName(languageCode: string): Promise<object | undefined> {
		const method = "getMyName";
		const params = {
			language_code: languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Set the description of the bot. This is a new field that is not yet widely available.
	 *
	 * @async
	 * @param {object} options - An object containing the following properties:
	 * @param {string} options.description - The new description of the bot.
	 * @param {string} [options.languageCode] - The IETF language tag of the user's language.
	 * If not specified, the server will use the default language code 'en'.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the updated User object representing the bot.
	 * @throws a TelegramApiError if the bot description could not be set.
	 */
	async setMyDescription(options: any): Promise<object | undefined> {
		const method = "setMyDescription";
		const params = {
			description: options.description,
			language_code: options.languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Get the bot's description, as set by the user.
	 * @async
	 * @param {string} [languageCode] - IETF language tag of the user's language. Defaults to `en`.
	 * @throws {TelegramApiError} If the API returns an error.
	 * @returns {Promise<object | undefined>} A promise that resolves to a string representing the bot's description.
	 */
	async getMyDescription(languageCode: string): Promise<object | undefined> {
		const method = "getMyDescription";
		const params = {
			language_code: languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
   * Sets the bot's short description for the profile.
   * @async
   
   * @param {object} options - Options for setting the short description.
   * @param {string} options.description - The new short description for the bot.
   * @param {string} options.languageCode - The language code of the new short description.
   * @returns {Promise<object | undefined>} - On success, the method returns the bot's updated profile.
   * @throws {TelegramApiError} - If the request was unsuccessful, a TelegramApiError will be thrown with the description of the error.
   */
	async setMyShortDescription(options: any): Promise<object | undefined> {
		const method = "setMyShortDescription";
		const params = {
			short_description: options.description,
			language_code: options.languageCode,
		};
		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Retrieves the bot's short description in the specified language or in English if the language code is not specified.
	 *
	 * @async
	 * @param {string} languageCode - Optional language code to get the short description in a specific language.
	 * @throws {TelegramApiError} When the Telegram API returns an error.
	 * @returns {Promise<object | undefined>} object with the bot's short description.
	 */
	async getMyShortDescription(
		languageCode: string,
	): Promise<object | undefined> {
		const method = "getMyShortDescription";
		const params = {
			language_code: languageCode,
		};

		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets the menu button for a specific chat.
 * @async
 
 * @param {object} options - Options for setting the menu button.
 * @param {number} options.chatId=this.chatId - The ID of the chat where the menu button will be set. If `chatId` is not provided, the instance's `chatId` property will be used.
 * @param {object} options.menuButton - The menu button object to be set. This object should conform to the Telegram Bot API's `InlineKeyboardButton` type.
 * @throws {TelegramApiError} If there is an error in the Telegram API response.
 * @returns {Promise<object | undefined>} The result object from the Telegram API response.
 */
	async setChatMenuButton(options: any): Promise<object | undefined> {
		const method = "setChatMenuButton";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			menu_button: options.menuButton,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Gets the menu button of the chat with the given chat ID or the current chat ID if available.
	 * @async
	 * @param {number | string} [chatId] - The chat ID of the chat to get the menu button for.
	 * @throws {TelegramApiError} Throws an error if the API response contains an error_code.
	 * @returns {Promise<object | undefined>} Returns the menu button of the chat.
	 */
	async getChatMenuButton(
		chatId: number | string,
	): Promise<object | undefined> {
		const method = "getChatMenuButton";
		const params = {
			chat_id: this.chatId ? this.chatId : chatId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Set default administrator rights for the bot in a chat.
 * @async
 
 * @param {object} options - The options object.
 * @param {object} options.rights - New administrator rights of the bot.
 * @param {boolean} options.forChannels - Pass true if the default rights should be set for all groups and channels.
 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the updated rights for the bot.
 * @throws {TelegramApiError} Throws an error if the response contains an error_code.
 */
	async setMyDefaultAdministratorRights(
		options: any,
	): Promise<object | undefined> {
		const method = "setMyDefaultAdministratorRights";
		const params = {
			rights: options.rights,
			for_channels: options.forChannels,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Returns the default admin rights of the bot in a given channel or all channels.
	 *
	 * @async
	 * @param {boolean} forChannels - Pass `true` to return the default admin rights for all channels the bot is an administrator in.
	 * @throws {TelegramApiError} Throws an error if the response contains an error_code.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to an object with the default admin rights of the bot in the specified channel(s).
	 */
	async getMyDefaultAdministratorRights(
		forChannels: boolean,
	): Promise<object | undefined> {
		const method = "getMyDefaultAdministratorRights";
		const params = {
			for_channels: forChannels,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Edits the text of a message sent by the bot or via inline mode.
 * @async
 
 * @param {object} options - Options for editing the message text.
 * @param {string} [options.chatId] - Unique identifier for the target chat or username of the target channel.
 * @param {number} options.messageId - Identifier of the message to edit.
 * @param {string} options.inlineMessageId - Identifier of the inline message to edit.
 * @param {string} options.text - New text of the message.
 * @param {string} [options.parseMode] - Format of the new message text.
 * @param {Array<object>} [options.entities] - List of special entities that appear in message text.
 * @param {boolean} [options.disableWebPagePreview] - Disables link previews for links in the message.
 * @param {object | string} [options.replyMarkup] - Additional interface options for the message.
 * @returns {Promise<object | undefined>} Response object with edited message.
 * @throws {TelegramApiError} If the request was unsuccessful.
 */
	async editMessageText(options: any): Promise<object | undefined> {
		const method = "editMessageText";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			inline_message_id: options.inlineMessageId,
			text: options.text,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			entities: options.entities,
			disable_web_page_preview: options.disableWebPagePreview,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Edits the caption of a message.
	 * @async
	 * @param {object} options - The options for editing the caption.
	 * @param {number} options.messageId - The message ID of the message to edit.
	 * @param {string} [options.inlineMessageId] - Required if the message is an inline message. The inline message ID.
	 * @param {string} [options.caption] - The new caption of the message.
	 * @param {string} [options.parseMode] - The parsing mode of the new caption.
	 * @param {Array} [options.captionEntities] - List of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {object | string} [options.replyMarkup] - The reply markup of the message.
	 * @returns {Promise<object | undefined>} The edited message object.
	 * @throws {TelegramApiError} If there is an error editing the message caption.
	 */
	async editMessageCaption(options: any): Promise<object | undefined> {
		const method = "editMessageCaption";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			inline_message_id: options.inlineMessageId,
			caption: options.caption,
			parse_mode: options.parseMode ? options.parseMode : this.parseMode,
			caption_entities: options.captionEntities,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Edits the media of an existing message sent by the bot or via inline mode.
	 * @async
	 * @param {object} options - The options for editing the message media.
	 * @param {number} options.messageId - The message ID of the message to edit.
	 * @param {string} [options.inlineMessageId] - The inline message ID of the message to edit (if in inline mode).
	 * @param {any} options.media - The new media for the message.
	 * @param {any} [options.replyMarkup] - The new reply markup for the message (if any).
	 * @returns {Promise<object | undefined>} The edited message object.
	 * @throws {TelegramApiError} If there is an error editing the message.
	 */
	async editMessageMedia(options: any): Promise<object | undefined> {
		const method = "editMessageMedia";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			inline_message_id: options.inlineMessageId,
			media: options.media,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Edits the live location of a message sent via the bot (for inline bots) or via the bot in a chat.
 * @async
 
 * @param {object} options - The options to edit the live location message.
 * @param {string} [options.chatId] - Required if `inlineMessageId` is not specified. Unique identifier for the target chat.
 * @param {number} [options.messageId] - Required if `inlineMessageId` is not specified. Identifier of the message to edit.
 * @param {string} [options.inlineMessageId] - Required if `chatId` and `messageId` are not specified. Identifier of the inline message to edit.
 * @param {number} options.latitude - Latitude of new location.
 * @param {number} options.longitude - Longitude of new location.
 * @param {number} [options.horizontalAccuracy] - The radius of uncertainty for the location, measured in meters; 0-1500.
 * @param {number} [options.heading] - Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
 * @param {number} [options.proximityAlertRadius] - Maximum distance for proximity alerts about approaching another chat member, in meters.
 * @param {object | string} [options.replyMarkup] - Additional interface options. An object of the `InlineKeyboardMarkup` type.
 * @throws {TelegramApiError} When an error occurs while editing the message.
 * @returns {Promise<object | undefined>} On success, returns the edited message as a `Message` object.
 */
	async editMessageLiveLocation(options: any): Promise<object | undefined> {
		const method = "editMessageLiveLocation";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			inline_message_id: options.inlineMessageId,
			latitude: options.latitude,
			longitude: options.longitude,
			horizontal_accuracy: options.horizontalAccuracy,
			heading: options.heading,
			proximity_alert_radius: options.proximityAlertRadius,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Stop updating a live location message sent by the bot or via inline mode.
 *
 * @async
 
 * @param {object} options - Options for stopping live location.
 * @param {string|null} [options.chatId=this.chatId] - Unique identifier for the target chat or username of the target channel.
 * @param {number} options.messageId - Identifier of the sent message.
 * @param {string|null} options.inlineMessageId - Identifier of the inline message.
 * @param {object|null} options.replyMarkup - A reply markup object.
 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the stopped live location message object.
 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error.
 */
	async stopMessageLiveLocation(options: any): Promise<object | undefined> {
		const method = "stopMessageLiveLocation";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			inline_message_id: options.inlineMessageId,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Edits the reply markup of a message sent by the bot or via inline mode.
 * @async
 
 * @param {object} options - The options object.
 * @param {string} [options.chatId] - Required if `inlineMessageId` is not specified. The unique identifier of the target chat.
 * @param {number} [options.messageId] - Required if `inlineMessageId` is not specified. Identifier of the message to edit.
 * @param {string} [options.inlineMessageId] - Required if `chatId` and `messageId` are not specified. Identifier of the inline message.
 * @param {object} options.replyMarkup - A new reply markup for the message.
 * @throws {TelegramApiError} If an error occurs while editing the message, an error object will be thrown.
 * @returns {Promise<object | undefined>} On success, the edited Message is returned.
 */
	async editMessageReplyMarkup(options: any): Promise<object | undefined> {
		const method = "editMessageReplyMarkup";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			inline_message_id: options.inlineMessageId,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Stops a poll in a chat.
	 *
	 * @async
	 * @param {object} options - The options to use for stopping the poll.
	 * @param {number} options.messageId - Identifier of the original message with the poll.
	 * @param {object | string} [options.replyMarkup] - A JSON-serialized object for a new message inline keyboard.
	 * @param {number} [options.chatId] - Unique identifier for the target chat or username of the target channel.
	 * @throws {TelegramApiError} If an error occurs while stopping the poll.
	 * @returns {Promise<object | undefined>} On success, the stopped poll is returned.
	 */
	async stopPoll(options: any): Promise<object | undefined> {
		const method = "stopPoll";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a sticker message.
	 * @async
	 * @param {object} options - The options for sending the sticker message.
	 * @param {string|number} [options.chatId] - The ID of the chat where the message will be sent. Required if `this.chatId` is not set.
	 * @param {string} options.sticker - The sticker file ID or URL.
	 * @param {string} [options.emoji] - The emoji corresponding to the sticker.
	 * @param {boolean} [options.notification] - Sends the message silently, without a notification. False by default.
	 * @param {boolean} [options.content] - Pass true to send the sticker as a protected content message. False by default.
	 * @param {string|number} [options.replyToMessageId] - The ID of the message to reply to.
	 * @param {boolean} [options.allowReply] - Pass true to allow sending the message without a reply message. False by default.
	 * @param {object | string} [options.replyMarkup] - Additional interface options for the message.
	 * @param {string|number} [options.threadId] - The ID of the thread where the message will be sent.
	 * @throws {TelegramApiError} Throws an error if the request to the Telegram API fails.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the sent message object on success.
	 */
	async sendSticker(options: any): Promise<object | undefined> {
		const method = "sendSticker";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.threadId,
			sticker: options.sticker,
			emoji: options.emoji,
			disable_notification: options.notification,
			protect_content: options.content,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Get a sticker set by its name.
	 *
	 * @async
	 * @param {string} name - Name of the sticker set.
	 * @returns {Promise<object | undefined>} A Promise that returns an object representing the sticker set on success.
	 * @throws {TelegramApiError} Throws an error if the Telegram API returns an error.
	 */
	async getStickerSet(name: string): Promise<object | undefined> {
		const method = "getStickerSet";
		const params = {
			name: name,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Returns a list of sticker sets containing custom emojis
	 * @async
	 * @param {string[]} customEmojiIds - An array of custom emoji ids to get related sticker sets
	 * @throws {TelegramApiError} Throws an error if the API response contains an error code
	 * @returns {Promise<object | undefined>} Returns an object representing the list of sticker sets containing custom emojis
	 */
	async getCustomEmojiStickers(
		customEmojiIds: string[],
	): Promise<object | undefined> {
		const method = "getCustomEmojiStickers";
		const params = {
			custom_emoji_ids: customEmojiIds,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Uploads a PNG image to create a new sticker file. The file must be less than 512 KB in size.
	 *
	 * @async
	 * @param {object} options - An object containing the following parameters:
	 * @param {number} options.userId - Unique identifier for the target user or bot.
	 * @param {any} options.sticker - The PNG image data to be uploaded.
	 * @param {string} options.stickerFormat - The file extension for the sticker (e.g. 'png').
	 * @throws {TelegramApiError} If there is an error during the API request.
	 * @returns {Promise<object | undefined>} The uploaded sticker file's information.
	 */
	async uploadStickerFile(options: any): Promise<object | undefined> {
		const method = "uploadStickerFile";
		const params = {
			user_id: options.userId,
			sticker: options.sticker,
			sticker_format: options.stickerFormat,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Creates a new sticker set with the specified options.
	 *
	 * @async
	 * @param {object} options - The options object containing the following properties:
	 * @param {number} options.userId - The ID of the user who will create the sticker set.
	 * @param {string} options.name - The unique name of the sticker set, 1-64 characters.
	 * @param {string} options.title - The title of the sticker set, 1-64 characters.
	 * @param {Array<object>} options.stickers - An array of sticker objects containing the following properties:
	 *   - {string} emoji - Emoji corresponding to the sticker.
	 *   - {string} file - File path or URL of the sticker image.
	 * @param {string} options.stickerFormat - The format of the stickers. Supported formats: "png", "webp", "tgs".
	 * @param {string} options.stickerType - The type of the stickers. Supported types: "static" for static stickers, "animated" for animated stickers.
	 * @param {boolean} options.needsRepainting - Whether the sticker set needs to be repainted. Defaults to false.
	 * @throws {TelegramApiError} If there is an error creating the sticker set.
	 * @returns {Promise<object | undefined>} The created sticker set object.
	 */
	async createNewStickerSet(options: any): Promise<object | undefined> {
		const method = "createNewStickerSet";
		const params = {
			user_id: options.userId,
			name: options.name,
			title: options.title,
			stickers: options.stickers,
			sticker_format: options.stickerFormat,
			sticker_type: options.stickerType,
			needs_repainting: options.needsRepainting,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
   * Add a new sticker to a set created by the bot.
   *
   * @async
   
   * @param {object} options - The options to add a sticker to a set.
   * @param {number} options.userId - The user id of the sticker set owner.
   * @param {string} options.name - The name of the sticker set.
   * @param {object} options.sticker - The sticker to add to the set.
   * @param {string} options.sticker.fileId - The file id of the sticker.
   * @param {string} options.sticker.emoji - The emoji associated with the sticker.
   * @param {object} [options.sticker.maskPosition] - The position where the mask should be placed on faces.
   * @param {string} options.sticker.maskPosition.point - The part of the face where the mask should be placed.
   * @param {number} options.sticker.maskPosition.xShift - The horizontal shift in pixels.
   * @param {number} options.sticker.maskPosition.yShift - The vertical shift in pixels.
   * @param {number} options.sticker.maskPosition.scale - The scale of the mask.
   * @returns {Promise<object | undefined>} On success, the added Sticker object is returned.
   * @throws {TelegramApiError} If an error occurs while adding the sticker.
   */
	async addStickerToSet(options: any): Promise<object | undefined> {
		const method = "addStickerToSet";
		const params = {
			user_id: options.userId,
			name: options.name,
			sticker: options.sticker,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Set the position of a sticker in its set. Returns True on success.
 * @async
 
 * @param {object} options - Options for setting the sticker position.
 * @param {string} options.sticker - File identifier of the sticker.
 * @param {number} options.position - New position of the sticker in the set (zero-based).
 * @throws {TelegramApiError} If an error occurs while setting the sticker position.
 * @returns {Promise<object | undefined>} A Promise that resolves to `true` on success.
 */
	async setStickerPositionInSet(options: any): Promise<object | undefined> {
		const method = "setStickerPositionInSet";
		const params = {
			sticker: options.sticker,
			position: options.position,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to delete a sticker from a set created by the bot.
	 * Returns True on success.
	 * @async
	 * @param {string} sticker - File identifier of the sticker to be deleted
	 * @returns {Promise<object | undefined>} On success, True is returned
	 * @throws {TelegramApiError} If there is an error returned by the Telegram API
	 */
	async deleteStickerFromSet(sticker: string): Promise<object | undefined> {
		const method = "deleteStickerFromSet";
		const params = {
			sticker: sticker,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Set the emoji associated with a sticker.
	 * @async
	 * @param {string} options.sticker - The file identifier of the sticker.
	 * @param {Array<string>} options.emojiList - List of emojis corresponding to the sticker.
	 * @throws {TelegramApiError} If there is an error returned from the Telegram API.
	 * @returns {Promise<object | undefined>} On success, the updated sticker object is returned.
	 */
	async setStickerEmoji(options: any): Promise<object | undefined> {
		const method = "setStickerEmoji";
		const params = {
			sticker: options.sticker,
			emoji_list: options.emojiList,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Set the keywords associated with a sticker.
 *
 * @async
 
 * @param {object} options - Options for setting sticker keywords.
 * @param {string} options.sticker - File identifier of the sticker.
 * @param {string[]} options.keywords - An array of strings describing the sticker.
 * @throws {TelegramApiError} If an error occurs while setting sticker keywords.
 * @returns {Promise<object | undefined>} Result of the API call.
 */
	async setStickerKeywords(options: any): Promise<object | undefined> {
		const method = "setStickerKeywords";
		const params = {
			sticker: options.sticker,
			keywords: options.keywords,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sets the position of a sticker in the mask position for subsequent operation mask() calls.
	 * @async
	 * @param {object} options - The options to set the sticker mask position.
	 * @param {string} options.sticker - File identifier of the sticker.
	 * @param {object} options.maskPosition - New mask position for the sticker.
	 * @param {number} options.maskPosition.point_x - The x position where the mask should be placed on the sticker.
	 * @param {number} options.maskPosition.point_y - The y position where the mask should be placed on the sticker.
	 * @param {number} options.maskPosition.scale - The scale of the mask, should be between 0 and 1.
	 * @returns {Promise<object | undefined>} On success, the edited sticker is returned.
	 * @throws {TelegramApiError} If an error occurs while setting the sticker mask position.
	 */
	async setStickerMaskPosition(options: any): Promise<object | undefined> {
		const method = "setStickerMaskPosition";
		const params = {
			sticker: options.sticker,
			mask_position: options.maskPosition,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sets the title of a sticker set.
 *
 * @async
 
 * @param {object} options - Options for setting the sticker set title.
 * @param {string} options.name - Name of the sticker set.
 * @param {string} options.title - New title for the sticker set.
 * @throws {TelegramApiError} If the API call returns an error.
 * @returns {Promise<object | undefined>} On success, the updated sticker set is returned.
 */
	async setStickerSetTitle(options: any): Promise<object | undefined> {
		const method = "setStickerSetTitle";
		const params = {
			name: options.name,
			title: options.title,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Set the thumbnail of a sticker set.
	 * @async
	 * @param {object} options - Options object.
	 * @param {string} options.name - Name of the sticker set.
	 * @param {number} options.userId - Unique identifier of the target user.
	 * @param {any} options.thumbnail - New PNG image of the sticker set as a stream or a string URL-encoded file URL.
	 * @returns {Promise<object | undefined>} On success, the updated sticker set is returned.
	 * @throws {TelegramApiError} If an error occurs while executing the method, an error with a description is thrown.
	 */
	async setStickerSetThumbnail(options: any): Promise<object | undefined> {
		const method = "setStickerSetThumbnail";
		const params = {
			name: options.name,
			user_id: options.userId,
			thumbnail: options.thumbnail,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Set the thumbnail of a sticker set created with a custom emoji.
 *
 * @async
 
 * @param {object} options - The options to set the custom emoji sticker set thumbnail.
 * @param {string} options.name - The name of the sticker set.
 * @param {string} options.customEmojiId - The ID of the custom emoji.
 * @throws {TelegramApiError} When the Telegram API returns an error.
 * @returns {Promise<object | undefined>} The response from the Telegram API containing the result.
 */
	async setCustomEmojiStickerSetThumbnail(
		options: any,
	): Promise<object | undefined> {
		const method = "setCustomEmojiStickerSetThumbnail";
		const params = {
			name: options.name,
			custom_emoji_id: options.customEmojiId,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to delete a sticker set. Use the bot's username and the name of the sticker set.
	 * @async
	 * @param {string} name - object containing the following required parameters
	 * @throws {TelegramApiError} When the request to the Telegram API fails or when the response contains an error.
	 * @returns {Promise<object | undefined>} On success, returns True.
	 */
	async deleteStickerSet(name: string): Promise<object | undefined> {
		const method = "deleteStickerSet";
		const params = {
			name: name,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Answer an inline query.
	 * @async
	 * @param {object} options - The options for answering the inline query.
	 * @param {string} options.inlineQueryId - Identifier of the inline query.
	 * @param {Array<object>} options.results - An array of results for the inline query.
	 * @param {number} [options.cacheTime] - The maximum amount of time in seconds that the result of the inline query may be cached.
	 * @param {boolean} [options.isPersonal=false] - Pass `true`, if the results of the inline query should be kept on the server side.
	 * @param {string} [options.nextOffset] - The offset that a client should send in the next query with the same text to receive more results.
	 * @param {string} [options.switchPmText] - If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter.
	 * @param {string} [options.switchPmParameter] - The parameter for the start message sent to the bot when user presses the switch button.
	 * @returns {Promise<object | undefined>} - A Promise that resolves to the result of the request.
	 * @throws {TelegramApiError} - If the Telegram API returns an error.
	 */
	async answerInlineQuery(options: any): Promise<object | undefined> {
		const method = "answerInlineQuery";
		const params = {
			inline_query_id: options.inlineQueryId,
			results: options.results,
			cache_time: options.cacheTime,
			is_personal: options.isPersonal,
			next_offset: options.nextOffset,
			switch_pm_text: options.switchPmText,
			switch_pm_parameter: options.switchPmParameter,
			button: options.button,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
   * Use this method to answer a callback query sent from a web app.
   * @async
   
   * @param {object} options - An object containing the parameters for the method.
   * @param {string} options.queryId - Unique identifier for the query to be answered.
   * @param {any} options.inlineQueryResult - An array of results for the inline query.
   * @returns {Promise<object | undefined>} On success, the method returns the updated message object.
   * @throws {TelegramApiError} On error, an error object with an error code and description.
   */
	async answerWebAppQuery(options: any): Promise<object | undefined> {
		const method = "answerWebAppQuery";
		const params = {
			web_app_query_id: options.queryId,
			result: options.inlineQueryResult,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Sends an invoice to the specified chat.
 * @async
  sendInvoice
 * @param {object} options - Options for sending the invoice.
 * @param {number} options.chatId=this.chatId - Unique identifier for the target chat.
 * @param {number} options.messageThreadId - Identifier of the message thread.
 * @param {string} options.title - Product name for the invoice.
 * @param {string} options.description - Product description for the invoice.
 * @param {string} options.payload - Bot-defined invoice payload, 1-128 bytes.
 * @param {string} options.providerToken - Payments provider token.
 * @param {string} options.currency - Three-letter ISO 4217 currency code.
 * @param {Array} options.prices - Array of price portions.
 * @param {number} options.maxTipAmount - Maximum accepted amount for tips.
 * @param {Array} options.suggestedTipAmounts - Suggested tip amounts.
 * @param {string} options.startParameter - Bot-defined identifier for the invoice.
 * @param {string} options.providerData - JSON-encoded data about the invoice, which will be shared with the payment provider.
 * @param {string} options.photoUrl - URL of the product photo for the invoice.
 * @param {number} options.photoSize - Size of the product photo for the invoice.
 * @param {number} options.photoWidth - Width of the product photo for the invoice.
 * @param {number} options.photoHeight - Height of the product photo for the invoice.
 * @param {boolean} options.needName - Pass true if the customer's full name should be collected.
 * @param {boolean} options.needPhoneNumber - Pass true if the customer's phone number should be collected.
 * @param {boolean} options.needEmail - Pass true if the customer's email address should be collected.
 * @param {boolean} options.needShippingAddress - Pass true if the customer's shipping address should be collected.
 * @param {boolean} options.sendPhoneNumberToProvider - Pass true if the customer's phone number should be sent to the payment provider.
 * @param {boolean} options.sendEmailToProvider - Pass true if the customer's email address should be sent to the payment provider.
 * @param {boolean} options.isFlexible - Pass true if the final price depends on the shipping method.
 * @param {boolean} options.disableNotification - Pass true if a notification for the invoice message should not be sent.
 * @param {boolean} options.protectContent - Pass true if the invoice message content should be encrypted.
 * @param {number} options.replyToMessageId - Identifier of the message to reply to.
 * @param {boolean} options.allowSendingWithoutReply - Pass true if the message can be sent without a reply.
 * @param {object} options.replyMarkup - Inline keyboard markup object.
 * @returns {Promise<object | undefined>} Result object containing information about the sent invoice.
 * @throws {TelegramApiError} If there was an error sending the invoice.
 */
	async sendInvoice(options: any): Promise<object | undefined> {
		const method = "sendInvoice";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_thread_id: options.messageThreadId,
			title: options.title,
			description: options.description,
			payload: options.payload,
			provider_token: options.providerToken,
			currency: options.currency,
			prices: options.prices,
			max_tip_amount: options.maxTipAmount,
			suggested_tip_amounts: options.suggestedTipAmounts,
			start_parameter: options.startParameter,
			provider_data: options.providerData,
			photo_url: options.photoUrl,
			photo_size: options.photoSize,
			photo_width: options.photoWidth,
			photo_height: options.photoHeight,
			need_name: options.needName,
			need_phone_number: options.needPhoneNumber,
			need_email: options.needEmail,
			need_shipping_address: options.needShippingAddress,
			send_phone_number_to_provider: options.sendPhoneNumberToProvider,
			send_email_to_provider: options.sendEmailToProvider,
			is_flexible: options.isFlexible,
			disable_notification: options.disableNotification,
			protect_content: options.protectContent,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowSendingWithoutReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
 * Creates a payment invoice link for a Telegram bot user.
 * @async
 
 * @param {object} options - The options for creating the payment link.
 * @param {string} options.title - The title of the product or service being purchased.
 * @param {string} options.description - The description of the product or service being purchased.
 * @param {string} options.payload - A developer-defined payload, which will be included in the payment notification.
 * @param {string} options.providerToken - The authentication token provided by the payment provider.
 * @param {string} options.currency - The currency of the payment, in ISO 4217 format.
 * @param {Array<object>} options.prices - An array of price components for the product or service being purchased.
 * @param {number} options.maxTipAmount - The maximum tip amount allowed for the payment.
 * @param {Array<number>} options.suggestedTipAmounts - An array of suggested tip amounts for the payment.
 * @param {string} options.providerData - Additional data to pass to the payment provider, in JSON format.
 * @param {string} options.photoUrl - The URL of a photo for the product or service being purchased.
 * @param {number} options.photoSize - The size of the photo in bytes.
 * @param {number} options.photoWidth - The width of the photo in pixels.
 * @param {number} options.photoHeight - The height of the photo in pixels.
 * @param {boolean} options.needName - Whether the user's name is needed for the payment.
 * @param {boolean} options.needPhoneNumber - Whether the user's phone number is needed for the payment.
 * @param {boolean} options.needEmail - Whether the user's email address is needed for the payment.
 * @param {boolean} options.needShippingAddress - Whether the user's shipping address is needed for the payment.
 * @param {boolean} options.sendPhoneNumberToProvider - Whether to send the user's phone number to the payment provider.
 * @param {boolean} options.sendEmailToProvider - Whether to send the user's email address to the payment provider.
 * @param {boolean} options.isFlexible - Whether the final payment amount can be changed by the user.
 * @throws {TelegramApiError} If there was an error creating the invoice link.
 * @returns {Promise<object | undefined>} The response object, which contains the URL of the payment invoice link.
 */
	async createInvoiceLink(options: any): Promise<object | undefined> {
		const method = "createInvoiceLink";
		const params = {
			title: options.title,
			description: options.description,
			payload: options.payload,
			provider_token: options.providerToken,
			currency: options.currency,
			prices: options.prices,
			max_tip_amount: options.maxTipAmount,
			suggested_tip_amounts: options.suggestedTipAmounts,
			provider_data: options.providerData,
			photo_url: options.photoUrl,
			photo_size: options.photoSize,
			photo_width: options.photoWidth,
			photo_height: options.photoHeight,
			need_name: options.needName,
			need_phone_number: options.needPhoneNumber,
			need_email: options.needEmail,
			need_shipping_address: options.needShippingAddress,
			send_phone_number_to_provider: options.sendPhoneNumberToProvider,
			send_email_to_provider: options.sendEmailToProvider,
			is_flexible: options.isFlexible,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a shipping query answer to the user.
	 * @async
	 * @param {object} options - The options object.
	 * @param {string} options.queryId - The ID of the shipping query.
	 * @param {boolean} options.isDeliveryPossible - Specify true if delivery to the specified address is possible.
	 * @param {Array} [options.shippingOptions] - List of available shipping options.
	 * @param {string} [options.errorMessage] - Error message to display to the user if delivery to the specified address is not possible.
	 * @throws {TelegramApiError} Throws an error if the response contains an error code.
	 * @returns {Promise<object | undefined>} Returns a Promise that resolves to the result object upon successful execution of the method.
	 */
	async answerShippingQuery(options: any): Promise<object | undefined> {
		const method = "answerShippingQuery";
		const params = {
			shipping_query_id: options.queryId,
			ok: options.isDeliveryPossible,
			shipping_options: options.shippingOptions,
			error_message: options.errorMessage,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Use this method to respond to such pre-checkout queries. On success, True is returned.
	 *
	 * @param {object} options - An object containing the response parameters.
	 * @param {string} options.preCheckoutQueryId - Unique identifier for the query to be answered.
	 * @param {boolean} options.ok - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order.
	 * Specify False if there are any problems.
	 * @param {string} [options.errorMessage] - Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout.
	 * @returns {Promise<object | undefined>} On success, True is returned.
	 * @throws {TelegramApiError} On Telegram API error.
	 */
	async answerPreCheckoutQuery(options: any): Promise<object | undefined> {
		const method = "answerPreCheckoutQuery";
		const params = {
			pre_checkout_query_id: options.preCheckoutQueryId,
			ok: options.ok,
			error_message: options.errorMessage,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Set errors in user Passport and revoke the verification of the data.
	 *
	 * @async
	 * @param {object} options - The options to pass.
	 * @param {number} options.userId - Required. Unique identifier of the target user.
	 * @param {Array<object>} options.errors - Required. An array describing the errors.
	 * @param {string} options.errors.source - Required. The section of the user's Telegram Passport which has the error, one of "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration".
	 * @param {string} options.errors.type - Required. Type of element of the Telegram Passport which has the error, one of "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration".
	 * @param {string} options.errors.message - Required. Error message.
	 *
	 * @throws {TelegramApiError} If the response from the API contains an error code.
	 * @returns {Promise<object | undefined>} On success, returns an object with the success status.
	 */
	async setPassportDataErrors(options: any): Promise<object | undefined> {
		const method = "setPassportDataErrors";
		const params = {
			user_id: options.userId,
			errors: options.errors,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Sends a game to the chat.
	 * @async
	 * @param {object} options - Options for sending the game.
	 * @param {number} options.chatId=this.chatId - ID of the chat where the game should be sent.
	 * @param {string} options.gameShortName - Short name of the game to be sent.
	 * @param {boolean} [options.disableNotification=false] - Pass true to disable notification for the message.
	 * @param {boolean} [options.protectContent=false] - Pass true to protect the content of the message from screenshots.
	 * @param {number} [options.messageThreadId] - Identifier of the message thread.
	 * @param {number} [options.replyToMessageId] - Identifier of the message to reply to.
	 * @param {boolean} [options.allowSendingWithoutReply=false] - Pass true to allow sending the message without a reply.
	 * @param {object | string} [options.replyMarkup] - Additional interface options for the message.
	 * @returns {Promise<object | undefined>} A Promise that resolves to the sent game object on success.
	 * @throws {TelegramApiError} If an error occurs while sending the game.
	 */
	async sendGame(options: any): Promise<object | undefined> {
		const method = "sendGame";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			game_short_name: options.gameShortName,
			disable_notification: options.disableNotification,
			protect_content: options.protectContent,
			message_thread_id: options.messageThreadId,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowSendingWithoutReply,
			reply_markup: options.replyMarkup,
		};
		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
	 * Delete a message on Telegram.
	 *
	 * @async
	 * @param {object} options - Options object.
	 * @param {number} options.chatId=this.chatId - Chat ID where the message to be deleted is located.
	 * @param {number} options.messageId - Message ID to be deleted.
	 * @param {boolean} options.revoke - Pass true to delete the message for all chat members. Only used for channels.
	 * @return {object} Returns a Promise which will resolve to a message object if the message was deleted successfully.
	 * @throws {TelegramApiError} Throws an error if the API response contains an error_code.
	 */
	async deleteMessage(options: any): Promise<object | undefined> {
		const method = "deleteMessage";
		const params = {
			chat_id: this.chatId ? this.chatId : options.chatId,
			message_id: options.messageId,
			revoke: options.revoke,
		};

		const response: TelegramApiResponse = await this.request(method, params);

		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}

	/**
  * Creates a new chat with the specified options.
  * @async
   createChat
  * @param {object} options - The options for creating the chat.
  * @param {string} options.type - The type of the chat to create ('private', 'group', or 'supergroup').
  * @param {string} options.title - The title of the chat.
  * @returns {Promise<object | undefined>} - Returns a Promise that resolves to an object representing the created chat.
  * @throws {TelegramApiError} - Throws an error if the Telegram API returns an error.
  */
	async createChat(options: any): Promise<object | undefined> {
		const method = "createChat";
		const params = {
			chat_type: options.type,
			title: options.title,
		};
		const response: TelegramApiResponse = await this.request(method, params);
		if (!!response?.error_code) {
			throw new TelegramApiError(response);
		}
		return response.result;
	}
}
