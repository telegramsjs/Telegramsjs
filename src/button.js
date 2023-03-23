/**
 * Класс, представляющий кнопку в Telegram Bot API.
 * 
 * @class
 * @param {Object} [options={}] - Настройки кнопки.
 * @param {string} [options.text] - Текст на кнопке.
 * @param {string} [options.action] - Действие кнопки, которое будет передано обработчику событий.
 * @param {string} [options.type='callback_data'] - Тип действия кнопки. По умолчанию используется тип 'callback_data'.
 */
class Button {
  constructor(options = {}) {
    this.text = options.text;
    this.action = options.action;
    this.type = options.type || 'callback_data';
  }

  /**
   * Устанавливает тип действия кнопки.
   * 
   * @param {string} type - Тип действия кнопки.
   * @returns {Button} Возвращает экземпляр объекта Button для цепочки вызовов.
   */
  setType(type) {
    this.type = type;
    return this;
  }
  
  /**
   * Устанавливает действие кнопки.
   * 
   * @param {string} action - Действие кнопки, которое будет передано обработчику событий.
   * @returns {Button} Возвращает экземпляр объекта Button для цепочки вызовов.
   */
  setAction(action) {
    this.action = action;
    return this;
  }
  
  /**
   * Устанавливает текст на кнопке.
   * 
   * @param {string} text - Текст на кнопке.
   * @returns {Button} Возвращает экземпляр объекта Button для цепочки вызовов.
   */
  setText(text) {
    this.text = text;
    return this;
  }
  
  /**
   * Возвращает объект кнопки в формате, который ожидает Telegram Bot API.
   * 
   * @returns {Object} Возвращает объект кнопки в формате, который ожидает Telegram Bot API.
   */
  toJSON() {
    const button = {
      text: this.text
    };
    button[this.type] = this.action;
    return button;
  }
}

module.exports = Button;