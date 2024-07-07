const { Base } = require("./Base");
const { Photo } = require("./media/Photo");
const { Animation } = require("./media/Animation");
const { MessageEntities } = require("./MessageEntities");

class Game extends Base {
  constructor(client, data) {
    super(client, data);

    this.title = data.title;

    this.description = data.description;

    this.photo = data.photo.map((photo) => new Photo(client, photo));

    this.text = data.text;

    this.entities = new MessageEntities(data.text, data.text_entities);

    this.animation = new Animation(client, data.animation);
  }
}

module.exports = { Game };
