export = GroupStatus;
/**
 * Enum representing the status of a group member.
 */
type GroupStatus = string;
declare namespace GroupStatus {
    const Administrator: string;
    const Left: string;
    const Member: string;
    const Creator: string;
}
