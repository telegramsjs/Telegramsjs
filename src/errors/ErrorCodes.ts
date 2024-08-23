enum ErrorCodes {
  InvalidOptions = "INVALID_OPTIONS",
  MissingUrlParameter = "MISSING_URL_PARAMETER",
  MissingToken = "MISSING_TOKEN",
  WebhookServerCreationFailed = "WEBHOOK_SERVER_CREATION_FAILED",
  InvalidFilterFunction = "INVALID_FILTER_FUNCTION",
  InvalidCamelCaseFormat = "INVALID_CAMEL_CASE_FORMAT",
  UserIdNotAvailable = "USER_ID_NOT_AVAILABLE",
  MessageIdNotAvailable = "MESSAGE_ID_NOT_AVAILABLE",
  ChatIdNotAvailable = "CHAT_ID_NOT_AVAILABLE",
  FileRetrievalFailed = "FILE_RETRIEVAL_FAILED",
  FileDownloadFailed = "FILE_DOWNLOAD_FAILED",
  FileWriteInvalidType = "FILE_WRITE_INVALID_TYPE",
}

const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.InvalidOptions]: "The provided options are invalid.",
  [ErrorCodes.MissingUrlParameter]:
    "The 'url' parameter is required but was not provided.",
  [ErrorCodes.MissingToken]:
    "A token must be specified to receive updates from Telegram.",
  [ErrorCodes.WebhookServerCreationFailed]:
    "The webhook server could not be created.",
  [ErrorCodes.InvalidFilterFunction]:
    "The provided 'options.filter' is not a function.",
  [ErrorCodes.InvalidCamelCaseFormat]:
    "The provided string '${key}' does not follow camelCase format.",
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
} as const;

export { ErrorCodes, ErrorMessages };
