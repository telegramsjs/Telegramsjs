export class TextQuote {
    /**
     * @param {import("@telegram.ts/types").TextQuote} data - Data about the contains information about the quoted part of a message that is replied to by the given message
     */
    constructor(data: import("@telegram.ts/types").TextQuote);
    /** Text of the quoted part of a message that is replied to by the given message */
    text: string;
    /** Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are kept in quotes. */
    entities: MessageEntities | undefined;
    /** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
    position: number;
    /** True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server. */
    manual: true | undefined;
}
import { MessageEntities } from "../message/MessageEntities";
//# sourceMappingURL=TextQuote.d.ts.map