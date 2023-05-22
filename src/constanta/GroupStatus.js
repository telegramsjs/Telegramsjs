/**
 * Enum representing the status of a group member.
 * @readonly
 * @enum {string}
 */
const GroupStatus = {
  /**
   * The user is an administrator of the group.
   */
  Administrator: 'administrator',

  /**
   * The user has left the group.
   */
  Left: 'left',

  /**
   * The user is a regular member of the group.
   */
  Member: 'member',

  /**
   * The user is the creator of the group.
   */
  Creator: 'creator'
};

module.exports = GroupStatus;