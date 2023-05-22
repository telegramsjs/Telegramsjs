const Keyboard = require('../src/Keyboard');
//const Button = require('./Button');

// Создание объекта Keyboard
const keyboard = new Keyboard();

// Создание кнопок
const button1 = new Keyboard('Button 1');
const button2 = new Keyboard('Button 2');
const button3 = new Keyboard('Button 3');

// Добавление кнопок к клавиатуре
keyboard.addButtons([button1, button2, button3]);

console.log(keyboard);

// Преобразование клавиатуры в формат reply клавиатуры
const replyKeyboard = keyboard.toReplyKeyboard({
  resize_keyboard: true,
  one_time_keyboard: false,
  selective: false
});

console.log(replyKeyboard);

// Преобразование клавиатуры в формат inline клавиатуры
const inlineKeyboard = keyboard.toInlineKeyboard();

console.log(inlineKeyboard);
// Очистка клавиатуры
keyboard.clear();
