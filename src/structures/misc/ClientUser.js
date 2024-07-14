const { User } = require("./User");

class ClientUser extends User {
  _patch(data) {
    super._patch(data);

    this.bot = data.is_bot;
    this.username = data.username;
    this.joinGroups = data.can_join_groups;
    this.readAllGroupMessages = data.can_read_all_group_messages;

    if ("can_connect_to_business" in data) {
      this.connectBusiness = data.can_connect_to_business;
    }
  }

  fetch() {
    return this.client.fetchApplication();
  }

  setCommands(commands, score, language) {
    return this.client.setMyCommands({
      commands,
      score,
      language,
    });
  }

  getCommands(score, language) {
    return this.client.getMyCommands(score, language);
  }

  deleteCommands(score, language) {
    return this.client.deleteMyCommands(score, language);
  }

  setName(name, language) {
    return this.client.setMyName(name, language);
  }

  getName(language) {
    return this.client.getMyName(language);
  }

  setDescription(description, language) {
    return this.client.setMyDescription(description, language);
  }

  getDescription(language) {
    return this.client.getMyDescription(language);
  }

  setShortDescription(description, language) {
    return this.client.setMyShortDescription(description, language);
  }

  getShortDescription(language) {
    return this.client.getMyShortDescription(language);
  }

  setAdministratorRights(rights, forChannels) {
    return this.client.setMyAdministratorRights(rights, forChannels);
  }

  getAdministratorRigths(forChannels) {
    return this.client.getMyAdministratorRights(forChannels);
  }
}

module.exports = { ClientUser };
