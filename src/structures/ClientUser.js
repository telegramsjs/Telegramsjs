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

  async setCommands(commands, score, language) {
    return await this.client.setMyCommands({
      commands,
      score,
      language,
    });
  }

  async getCommands(score, language) {
    return await this.client.getMyCommands(score, language);
  }

  async deleteCommands(score, language) {
    return await this.client.deleteMyCommands(score, language);
  }

  async setName(name, language) {
    return await this.client.setMyName(name, language);
  }

  async getName(language) {
    return await this.client.getMyName(language);
  }

  async setDescription(description, language) {
    return await this.client.setMyDescription(description, language);
  }

  async getDescription(language) {
    return await this.client.getMyDescription(language);
  }

  async setShortDescription(description, language) {
    return await this.client.setMyShortDescription(description, language);
  }

  async getShortDescription(language) {
    return await this.client.getMyShortDescription(language);
  }

  async setAdministratorRights(rights, forChannels) {
    return await this.client.setMyAdministratorRights(rights, forChannels);
  }

  async getAdministratorRigths(forChannels) {
    return await this.client.getMyAdministratorRights(forChannels);
  }
}

module.exports = { ClientUser };
