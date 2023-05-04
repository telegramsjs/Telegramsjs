# Telegramsjs@0.4.0

## Добавлено:
- Добавлена проверка `TelegramApiError` для функций `setMyCommands`, `deleteMyCommands`, `getMyCommands`.
- Новые функции Telegram API 6.7: `getMyName` и `setMyName`.
- Добавлен новый параметр `button` в функцию `answerInlineQuery`.
- Объект `client` теперь доступен во всех событиях. Добавлены новые функции: `getShortDescription`, `setShortDescription`, `getDescription`, `setDescription`, `deleteCommands`, `getCommands`, `setCommands`, `getName` и `setName`.
- В объект `chat` был добавлен метод `leave`.
- В классе `TelegramBot` вы можете указать параметры `parseMode` и `chatId` по умолчанию для всех функций.
- Добавлена функция `decodeIntents`.
- В класс `TelegramBot` был добавлен метод `uptime`, который показывает время запуска бота.

## Изменено:
- Методы `send`, `reply` и `update` теперь принимают два параметра. Пример: `send('text', {parseMode: 'HTML})`.
- В функциях `getFile`, `downloadFile`, `portChatInviteLink`, `deleteChatPhoto`, `unpinAllChatMessage`, `leaveChat`, `getChat`, `getChatAdministrators`, `getChatMemberCount`, `deleteChatStickerSet`, `closeGeneralForumTopic`, `reopenGeneralForumTopic`, `hideGeneralForumTopic`, `deleteStickerForomSet`, `deleteStickerSet`, `unhideGeneralForumTopic`, `getMyDescription`, `getMyShortDescription`, `getChatMenuButton`, `getMyDefaulfAdministratorRights`, `getStickerSet`, `getCustomEmojiSticers` теперь принимается только один параметр.
- В функциях `html` и `markdownv` вылетит ошибка в консоль, если не указать необходимые параметры.
- В ошибке `TelegramApiError` текст стал более аккуратным.
- Функция `defer` была переименована в `deferUpdate`.

## Исправлено:
- В функциях `addStickerToSet`, `setPassportDataErrors`, `createNewStickerSet`, `sendPoll`, `setChatPermissions` исправлен вызов и параметры, которые по умолчанию использовали `JSON.stringify`.
- Исправлен вызов и параметры в функциях `portChatInviteLink` и `getForumTopicIconSticker`.

## Документация:
Написана документация для данной библиотеки, а также добавлены примеры для некоторых классов! (Во втрой части добавится примеры)