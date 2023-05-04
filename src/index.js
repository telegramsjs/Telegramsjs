exports.TelegramBot = require("./TelegramBot.js");
exports.Collection = require("./collection.js");
exports.Button = require("./button.js");
//exports.Input = require("./Input.js");

exports.Events = require("./events.js");
exports.IntentsBitField = require("./IntentsBitField.js"). IntentsBitField;
exports.IntentBits = require("./IntentsBitField.js").IntentBits;
exports.TelegramIntentBits = require("./IntentsBitField.js").TelegramIntentBits;
exports.decodeIntents = require("./IntentsBitField.js").decodeIntents;

exports.html = require("./formatters/html.js");
exports.markdownv = require("./formatters/markdownv.js");

exports.version = require("../package.json").version;