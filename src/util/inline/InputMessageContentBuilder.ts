import type {
  InputContactMessageContent,
  InputInvoiceMessageContent,
  InputLocationMessageContent,
  InputTextMessageContent,
  InputVenueMessageContent,
} from "../../client/interfaces/Inline";

class InputMessageContentBuilder {
  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a text message to be sent as the result of an inline query.
   * @param text - Text of the message to be sent, 1-4096 characters.
   * @param options - out parameters.
   */
  static text(
    text: InputTextMessageContent["message_text"],
    options?: Omit<InputTextMessageContent, "message_text">,
  ): InputTextMessageContent {
    return { message_text: text, ...options };
  }

  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a location message to be sent as the result of an inline query.
   * @param latitude - Latitude of the location in degrees.
   * @param longitude - Longitude of the location in degrees.
   * @param options - out parameters.
   */
  static location(
    latitude: number,
    longitude: number,
    options?: Omit<InputLocationMessageContent, "latitude" | "longitude">,
  ): InputLocationMessageContent {
    return { latitude, longitude, ...options };
  }

  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a venue message to be sent as the result of an inline query.
   * @param latitude - Latitude of the venue in degrees.
   * @param longitude - Longitude of the venue in degrees.
   * @param options - out parameters.
   */
  static venue(
    latitude: number,
    longitude: number,
    options?: Omit<InputVenueMessageContent, "latitude" | "longitude">,
  ): InputLocationMessageContent {
    return { latitude, longitude, ...options };
  }

  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a contact message to be sent as the result of an inline query.
   * @param phoneNumber - Contact's phone number.
   * @param firstName - Contact's first name.
   * @param options - out parameters.
   */
  static contact(
    phoneNumber: string,
    firstName: string,
    options?: Omit<InputContactMessageContent, "phone_number" | "first_name">,
  ): InputContactMessageContent {
    return { phone_number: phoneNumber, first_name: firstName, ...options };
  }

  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of an invoice message to be sent as the result of an inline query.
   * @param options - out parameters.
   */
  static invoice(
    options: InputInvoiceMessageContent,
  ): InputInvoiceMessageContent {
    return options;
  }
}

export { InputMessageContentBuilder };
