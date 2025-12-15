import { InlineQueryResultCachedBuilder } from "./InlineQueryResultCachedBuilder";
import type {
  InlineQueryResultArticle,
  InlineQueryResultAudio,
  InlineQueryResultContact,
  InlineQueryResultDocument,
  InlineQueryResultGame,
  InlineQueryResultGif,
  InlineQueryResultLocation,
  InlineQueryResultMpeg4Gif,
  InlineQueryResultPhoto,
  InlineQueryResultVenue,
  InlineQueryResultVideo,
  InlineQueryResultVoice,
  InputMessageContent,
} from "../../client/interfaces/Inline";

class InlineQueryResultBuilder {
  /** Cached result of InlineQuery builder */
  static cached = InlineQueryResultCachedBuilder;

  /**
   * Represents a link to an article or web page.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title of the result.
   * @param inputMessageContent - Content of the message to be sent.
   * @param options - out parameters.
   */
  static article(
    id: string,
    title: string,
    inputMessageContent: InputMessageContent,
    options?: Omit<
      InlineQueryResultArticle,
      "type" | "title" | "id" | "input_message_content"
    >,
  ): InlineQueryResultArticle {
    return {
      type: "article",
      id,
      title,
      input_message_content: inputMessageContent,
      ...options,
    };
  }

  /**
   * Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title.
   * @param audioUrl - A valid URL for the audio file.
   * @param options - out parameters.
   */
  static audio(
    id: string,
    title: string,
    audioUrl: string,
    options?: Omit<
      InlineQueryResultAudio,
      "type" | "title" | "id" | "audio_url"
    >,
  ): InlineQueryResultAudio {
    return {
      type: "audio",
      id,
      title,
      audio_url: audioUrl,
      ...options,
    };
  }

  /**
   * Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the contact.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param phoneNumber - Contact's phone number.
   * @param firstName - Contact's first name
   * @param options - out parameters.
   */
  static contact(
    id: string,
    phoneNumber: string,
    firstName: string,
    options?: Omit<
      InlineQueryResultContact,
      "type" | "phone_number" | "id" | "first_name"
    >,
  ): InlineQueryResultContact {
    return {
      type: "contact",
      id,
      first_name: firstName,
      phone_number: phoneNumber,
      ...options,
    };
  }

  /**
   * Represents a [Game](https://core.telegram.org/bots/api/#games).
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param gameShortName - Short name of the game.
   * @param replyMarkup - Inline keyboard attached to the message.
   */
  static game(
    id: string,
    gameShortName: string,
    replyMarkup?: InlineQueryResultGame["reply_markup"],
  ): InlineQueryResultGame {
    return {
      type: "game",
      id,
      game_short_name: gameShortName,
      ...(replyMarkup && { reply_markup: replyMarkup }),
    };
  }

  /**
   * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title for the result.
   * @param url - A valid URL for the file.
   * @param options - out parameters.
   */
  static documentPdf(
    id: string,
    title: string,
    url: string,
    options?: Omit<
      InlineQueryResultDocument,
      "type" | "mime_type" | "id" | "title" | "document_url"
    >,
  ): InlineQueryResultDocument {
    return {
      type: "document",
      id,
      title: title,
      document_url: url,
      mime_type: "application/pdf",
      ...options,
    };
  }

  /**
   * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title for the result.
   * @param url - A valid URL for the file.
   * @param options - out parameters.
   */
  static documentZip(
    id: string,
    title: string,
    url: string,
    options?: Omit<
      InlineQueryResultDocument,
      "type" | "mime_type" | "id" | "title" | "document_url"
    >,
  ): InlineQueryResultDocument {
    return {
      type: "document",
      id,
      title: title,
      document_url: url,
      mime_type: "application/zip",
      ...options,
    };
  }

  /**
   * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param gifUrl - A valid URL for the GIF file. File size must not exceed 1MB.
   * @param thumbnailUrl - URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result.
   * @param options - out parameters.
   */
  static gif(
    id: string,
    gifUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultGif,
      "type" | "gif_url" | "id" | "thumbnail_url"
    >,
  ): InlineQueryResultGif {
    return {
      type: "gif",
      id,
      gif_url: gifUrl,
      thumbnail_url: thumbnailUrl,
      ...options,
    };
  }

  /**
   * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the location.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param latitude - Location latitude in degrees.
   * @param longitude - Location longitude in degrees.
   * @param title - Location title.
   * @param options - out parameters
   */
  static location(
    id: string,
    latitude: number,
    longitude: number,
    title: string,
    options?: Omit<
      InlineQueryResultLocation,
      "type" | "latitude" | "id" | "longitude" | "title"
    >,
  ): InlineQueryResultLocation {
    return {
      type: "location",
      id,
      latitude,
      longitude,
      title,
      ...options,
    };
  }

  /**
   * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param mpeg4Url - A valid URL for the MPEG4 file. File size must not exceed 1MB.
   * @param thumbnailUrl - URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result.
   * @param options - out parameters.
   */
  static mpeg4Gif(
    id: string,
    mpeg4Url: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultMpeg4Gif,
      "type" | "mpeg4_url" | "id" | "thumbnail_url"
    >,
  ): InlineQueryResultMpeg4Gif {
    return {
      type: "mpeg4_gif",
      id,
      mpeg4_url: mpeg4Url,
      thumbnail_url: thumbnailUrl,
      ...options,
    };
  }

  /**
   * Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param photoUrl - A valid URL of the photo. Photo must be in jpeg format. Photo size must not exceed 5MB.
   * @param thumbnailUrl - URL of the thumbnail for the photo.
   * @param options - out parameters.
   */
  static photo(
    id: string,
    photoUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultPhoto,
      "type" | "photo_url" | "id" | "thumbnail_url"
    >,
  ): InlineQueryResultPhoto {
    return {
      type: "photo",
      id,
      photo_url: photoUrl,
      thumbnail_url: thumbnailUrl,
      ...options,
    };
  }

  /**
   * Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the venue.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param options - out parameters.
   */
  static venue(
    id: string,
    options: Omit<InlineQueryResultVenue, "type" | "id">,
  ): InlineQueryResultVenue {
    return { type: "venue", id, ...options };
  }

  /**
   * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
   *
   * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param videoUrl - A valid URL for the embedded video player or video file.
   * @param thumbnailUrl - URL of the thumbnail (JPEG only) for the video.
   * @param options - out parameters.
   */
  static videoHtml(
    id: string,
    title: string,
    videoUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultVideo,
      "type" | "video_url" | "id" | "thumbnail_url" | "mime_type" | "title"
    >,
  ): InlineQueryResultVideo {
    return {
      type: "video",
      id,
      title,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      mime_type: "text/html",
      ...options,
    };
  }

  /**
   * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
   *
   * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param videoUrl - A valid URL for the embedded video player or video file.
   * @param thumbnailUrl - URL of the thumbnail (JPEG only) for the video.
   * @param options - out parameters.
   */
  static videoMp4(
    id: string,
    title: string,
    videoUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultVideo,
      "type" | "video_url" | "id" | "thumbnail_url" | "mime_type" | "title"
    >,
  ): InlineQueryResultVideo {
    return {
      type: "video",
      id,
      title,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      mime_type: "video/mp4",
      ...options,
    };
  }

  /**
   * Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the the voice message.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Recording title.
   * @param url - A valid URL for the voice recording.
   * @param options - out parameters.
   */
  static voice(
    id: string,
    title: string,
    url: string,
    options?: Omit<
      InlineQueryResultVoice,
      "type" | "voice_url" | "id" | "title"
    >,
  ): InlineQueryResultVoice {
    return {
      type: "voice",
      id,
      title,
      voice_url: url,
      ...options,
    };
  }
}

export { InlineQueryResultBuilder };
