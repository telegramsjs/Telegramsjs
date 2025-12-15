enum ErrorCodes {
  InvalidOptions = "INVALID_OPTIONS",
  MissingUrlParameter = "MISSING_URL_PARAMETER",
  MissingToken = "MISSING_TOKEN",
  WebhookServerCreationFailed = "WEBHOOK_SERVER_CREATION_FAILED",
  InvalidFilterFunction = "INVALID_FILTER_FUNCTION",
  UserIdNotAvailable = "USER_ID_NOT_AVAILABLE",
  MessageIdNotAvailable = "MESSAGE_ID_NOT_AVAILABLE",
  ChatIdNotAvailable = "CHAT_ID_NOT_AVAILABLE",
  FileRetrievalFailed = "FILE_RETRIEVAL_FAILED",
  FileDownloadFailed = "FILE_DOWNLOAD_FAILED",
  FileWriteInvalidType = "FILE_WRITE_INVALID_TYPE",
  InvalidUserId = "INVALID_USER_ID",
  InvalidChatId = "INVALID_CHAT_ID",
  InvalidClientId = "INVALID_CLIENT_ID",
  InvalidFileName = "INVALID_FILE_NAME",
<<<<<<< HEAD
=======
  LoginTimeout = "LOGIN_TIMEOUT",
>>>>>>> v4
}

const ErrorMessages = {
  [ErrorCodes.InvalidOptions]: "The provided options are invalid.",
  [ErrorCodes.MissingUrlParameter]:
    "The 'url' parameter is required but was not provided.",
  [ErrorCodes.MissingToken]:
    "A token must be specified to receive updates from Telegram.",
  [ErrorCodes.WebhookServerCreationFailed]:
    "The webhook server could not be created.",
  [ErrorCodes.InvalidFilterFunction]:
    "The provided 'options.filter' is not a function.",
  [ErrorCodes.UserIdNotAvailable]:
    "The user ID related to this message is not available.",
  [ErrorCodes.MessageIdNotAvailable]:
    "The message ID related to this message is not available.",
  [ErrorCodes.ChatIdNotAvailable]:
    "The chat ID related to this message is not available.",
  [ErrorCodes.FileRetrievalFailed]:
    "Failed to retrieve the file from the path: <file_path>.",
  [ErrorCodes.FileDownloadFailed]:
    "Failed to download the file. Error: ${err}.",
  [ErrorCodes.FileWriteInvalidType]:
    "Invalid file write type specified. Available types: 'stream' or 'promise'.",
  [ErrorCodes.InvalidUserId]:
    "The provided ID is invalid for retrieving user information; it does not correspond to a valid user ID.",
  [ErrorCodes.InvalidChatId]:
    "The provided ID is invalid for retrieving chat information; it does not correspond to a valid chat ID.",
  [ErrorCodes.InvalidClientId]:
    "The bot ID is not available. Please check if the bot has been initialized",
  [ErrorCodes.InvalidFileName]:
    "The name file is not valid. Please open issue https://github.com/telegramsjs/Telegramsjs/issues",
<<<<<<< HEAD
=======
  [ErrorCodes.LoginTimeout]:
    "Failed to connect to Telegram BotAPI: connection timeout exceeded",
>>>>>>> v4
} as const;

export { ErrorCodes, ErrorMessages };
