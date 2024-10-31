import type {
  InlineQueryResultCachedAudio,
  InlineQueryResultCachedDocument,
  InlineQueryResultCachedGif,
  InlineQueryResultCachedMpeg4Gif,
  InlineQueryResultCachedPhoto,
  InlineQueryResultCachedSticker,
  InlineQueryResultCachedVideo,
  InlineQueryResultCachedVoice,
} from "../../client/interfaces/Inline";

class InlineQueryResultCachedBuilder {
  /**
   * Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier for the audio file.
   * @param options - out parameters.
   */
  static audio(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedAudio,
      "type" | "audio_file_id" | "id"
    >,
  ): InlineQueryResultCachedAudio {
    return { type: "audio", id, audio_file_id: fileId, ...options };
  }

  /**
   * Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param fileId - A valid file identifier for the file.
   * @param options - out parameters.
   */
  static document(
    id: string,
    title: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedDocument,
      "type" | "document_file_id" | "id" | "title"
    >,
  ): InlineQueryResultCachedDocument {
    return {
      type: "document",
      id,
      title,
      document_file_id: fileId,
      ...options,
    };
  }

  /**
   * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier for the GIF file.
   * @param options - out parameters.
   */
  static gif(
    id: string,
    fileId: string,
    options?: Omit<InlineQueryResultCachedGif, "type" | "gif_file_id" | "id">,
  ): InlineQueryResultCachedGif {
    return { type: "gif", id, gif_file_id: fileId, ...options };
  }

  /**
   * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier for the GIF file.
   * @param options - out parameters.
   */
  static mpeg4Gif(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedMpeg4Gif,
      "type" | "mpeg4_file_id" | "id"
    >,
  ): InlineQueryResultCachedMpeg4Gif {
    return { type: "mpeg4_gif", id, mpeg4_file_id: fileId, ...options };
  }

  /**
   * Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier of the photo.
   * @param options - out parameters.
   */
  static photo(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedPhoto,
      "type" | "photo_file_id" | "id"
    >,
  ): InlineQueryResultCachedPhoto {
    return { type: "photo", id, photo_file_id: fileId, ...options };
  }

  /**
   * Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the sticker.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier of the sticker.
   * @param options - out parameters.
   */
  static sticker(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedSticker,
      "type" | "sticker_file_id" | "id"
    >,
  ): InlineQueryResultCachedSticker {
    return { type: "sticker", id, sticker_file_id: fileId, ...options };
  }

  /**
   * Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param fileId - A valid file identifier for the video file.
   * @param options - out parameters.
   */
  static video(
    id: string,
    title: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedVideo,
      "type" | "video_file_id" | "id" | "title"
    >,
  ): InlineQueryResultCachedVideo {
    return {
      type: "video",
      id,
      title,
      video_file_id: fileId,
      ...options,
    };
  }

  /**
   * Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the voice message.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Voice message title.
   * @param fileId - A valid file identifier for the voice message.
   * @param options - out parameters.
   */
  static voice(
    id: string,
    title: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedVoice,
      "type" | "voice_file_id" | "id" | "title"
    >,
  ): InlineQueryResultCachedVoice {
    return {
      type: "voice",
      id,
      title,
      voice_file_id: fileId,
      ...options,
    };
  }
}

export { InlineQueryResultCachedBuilder };
