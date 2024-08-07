export class Location extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Location} data - Data about the represents a point on the map
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Location);
    /** Latitude as defined by sender */
    latitude: number;
    /** Longitude as defined by sender */
    longitude: number;
    /** The radius of uncertainty for the location, measured in meters; 0-1500 */
    horizontalAccuracy: number | undefined;
    /** Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only */
    livePeriod: number | undefined;
    /** The direction in which user is moving, in degrees; 1-360. For active live locations only */
    heading: number | undefined;
    /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only */
    proximityAlertRadius: number | undefined;
}
import { Base } from "../Base";
//# sourceMappingURL=Location.d.ts.map