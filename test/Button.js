const { Button } = require("../src/index.js");

const button = new Button();
button.setText('Press me!');
button.setAction('button_pressed');
button.setType('callback_data');

console.log(button.toJSON()); // { text: 'Press me!', callback_data: 'button_pressed' }
console.log(button.toString()); // '{"text":"Press me!","callback_data":"button_pressed"}'

const buttonObj = { text: 'Press me again!', type: 'callback_data', action: 'button'};
const newButton = Button.fromJSON(buttonObj);

console.log(newButton.toJSON()); // { text: 'Press me again!', callback_data: 'button' }
console.log(newButton.toString()); // '{"text":"Press me again!","callback_data":"button"}'


bot.on('privateMessageCreate', (m) => {
  if (!m.isCommand) return;
  if (m.text === '/button') {
    m.reply({
      text: 'Button',
      replyMarkup: JSON.stringify({
        inline_keyboard: [[button.toJSON()]]
      })
    })
  }
})

bot.on('interactionCreate',  async (i) => {
  await i.defer()
  if (i.data === 'button_pressed') {
    i.reply('Hello!');
    i.chat.send('Hello!')
  }
})