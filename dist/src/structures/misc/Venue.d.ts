export class Venue extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Venue} data - Data about the represents a venue
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Venue);
    /** Venue location. Can't be a live location */
    location: Location;
    /** Name of the venue */
    title: string;
    /** Address of the venue */
    address: string;
    /** Foursquare identifier of the venue */
    foursquareId: string | undefined;
    /** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
    foursquareType: string | undefined;
    /** Google Places identifier of the venue */
    googlePlaceId: string | undefined;
    /** Google Places type of the venue. (See supported types.) */
    googlePlaceType: string | undefined;
}
import { Base } from "../Base";
import { Location } from "./Location";
//# sourceMappingURL=Venue.d.ts.map