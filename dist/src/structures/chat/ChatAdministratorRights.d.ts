export class ChatAdministratorRights {
    /**
     * @param {import("@telegram.ts/types").ChatAdministratorRights} data - Data about the rights of administrator in a chat
     */
    constructor(data: import("@telegram.ts/types").ChatAdministratorRights);
    /** True, if the user's presence in the chat is hidden */
    anonymous: boolean;
    /** Represents the rights of an administrator in a chat */
    permissions: ChatPermissions;
}
import { ChatPermissions } from "../../util/ChatPermissions";
//# sourceMappingURL=ChatAdministratorRights.d.ts.map