Telegramjs@0.2.0

 Добавлено
 События
- `groupBroadcastInvited` - отслеживает приглашения пользователя при видеовызове в группе.

 Методы для `Events`
- `isCommand(checkAllEntities=false)` - проверяет, есть ли в сообщении команда в первом объекте `entities`. Если вы хотите, чтобы он искал по всем объектам `entities`, установите значение `true`.
- `isPhoto()` - проверка, есть ли в сообщении фотография.
- `isDocument()` - проверка, есть ли в сообщении документ.
- `isAudio()` - проверка, есть ли в сообщении аудио.
- `isVideoNote()` - проверка, есть ли в сообщении круговая видеозаметка.
- `isVoice()` - проверка, есть ли в сообщении голосовое сообщение.
- `isSticker()` - проверка, есть ли в сообщении стикер.
- `isContact()` - проверка, есть ли в сообщении контакт.
- `isPoll()` - проверка, есть ли в сообщении голосование.
- `isLocation()` - проверка, есть ли в сообщении локация.
- `defer(interactionId?)` - отвечает на взаимодействия кнопки, то есть вместо `bot.answerCallbackQuery(..)` вы можете использовать `interaction.defer()`.

 Методы для `Button`
- `fromJSON(jsonButton)` - создает новый объект Button из объекта кнопки в формате, ожидаемом в Telegram Bot API.
- `toString()` - возвращает текстовое представление объекта кнопки в формате, ожидаемом в Telegram Bot API.

 Методы для `Collection`
- `keys()` - возвращает итератор, содержащий все ключи элементов коллекции.
- `values()` - возвращает итератор, который содержит все значения элементов в коллекции.
- `keyArray()` - возвращает массив, содержащий все ключи коллекции в порядке вставки.
- `entries()` - возвращает новый объект Iterator, содержащий пары [ключ, значение] для каждого элемента в коллекции.
- `toArrayByKey()` - возвращает массив, содержащий все значения элементов коллекции, сгруппированные по ключам.
- `merge(otherCollection)` - объединяет данную коллекцию с другой коллекцией.
- `clone()` - создает копию этой коллекции.
- `toMap()` - возвращает экземпляр класса `Map`, который содержит все элементы данной коллекции.

 Константы
- `TelegramIntentBits` - содержит все события, которые можно отслеживать.
- `IntentBits` - константы `IntentBits` для класса `IntentsBitField`.
- `version` - текущая версия `Telegramjs`.

 Класс IntentsBitField
Данный класс определяет `IntentsBitField`, который является реализацией битового поля для хранения намерений (intents или же getUpdates)


 Изменения
- `bot.start()` теперь является  `bot.login()`, что напоминает о `Discord.js` и главной фишки `Telegramsjs`

 Фикс функций
- `reopenForumTopic`, `closeForumTopic`, `createForumTopic`, `editForumTopic`, `getForumTopicIconStickers`, `deleteChatStickerSet`, `setChatStickerSet`, `getChatMember`, `pinChatMessage`, `setChatDescription`, `setChatTitle`, `deleteChatPhoto`, `setChatPhoto`, `revokeChatInviteLink`, `editChatInviteLink`, `createChatInviteLink`, `portChatInviteLink` - добавлена проверка на ошибку "TelegramApiError", также теперь эти функции асинхронние
- обэкт в `interactionCreate` был исправлен, тоесть ошибка была в `interaction.message.chat.send()`, теперь это `interaction.chat.send()`