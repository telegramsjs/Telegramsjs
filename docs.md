# Telegramsjs@0.6.0

## Исправлено
- В функции `underline` класса `Markdown` использовался тег для `html`.
- С новой механикой `offset` бот больше не будет читать или реагировать на старые сообщения или взаимодействия (тестовая).

## Удалено
- Все события типа `privateMessageCreate` были удалены.

## Добавлено
- Добавлены события `message`, `edited_message`, `channel_post`, `edited_channel_post`, `inline_query`, `chosen_inline_result`, `callback_query`, `shipping_query`, `pre_checkout_query`, `poll`, `poll_answer`, `chat_member`, `my_chat_member`, `chat_join_request`, `reply_message`. Прошлые события не надежны.
- В класс `TelegramBot` был добавлен параметр `queryString` для набора типов строк запроса к API (необязательный).
- В класс `Markup` (`Button`) были добавлены методы:
  - `inlineKeyboard(inline: array)`: возвращает объект встроенной клавиатуры в формате, ожидаемом Telegram Bot API.
  - `setRemove(remove: boolean)`: устанавливает параметр `remove_keyboard`, чтобы удалить клавиатуру после того, как пользователь нажмет кнопку.
  - `addMarkupArray(markupArray: array, arrayLength: number)`: создает строку `JSON`, представляющую объект разметки ответа со встроенной клавиатурой.
  - `setWebApp(url: string)`: устанавливает URL для веб-приложения.
  - `setForceReply(forceReply: boolean)`: устанавливает опцию `force_reply` для клавиатуры ответа.
  - В конструкторе были добавлены параметры `removeKeyboard`, `forceReply` и `webApp`.
- Добавлен класс `Keyboard` для создания новых объектов клавиатуры.
- Добавлена константа `ChatActionType`, содержащая все типы для отправки.
- Добавлена константа `EntityType` для разных типов сущностей.
- Добавлена константа `QueryString`, представляющая набор типов строк запроса.
- Добавлена константа `GroupPermission`, содержащая групповые разрешения.
- Добавлена константа `DocumentTypes`, содержащая типи документов.
- Добавлена константа `GroupStatus`, представляющая статус члена группы.
- Добавлены функции `checkMessageLinks`, `extractUserMentions`, `extractHashtags`, `checkLocation`, `checkUserMentions`, `checkHashtags`, `checkPhoneNumber`, `extractUserIdFromLink`, `checkGroupOrChannel`, `checkEmoji`, `checkSticker`, `extractUsernameFromLink`, `checkBot`, `checkChannel`, `checkLink`, `checkGroup`, `checkUsername`, `extractUsername`.
- Добавлен метод `typing`, для обэкта `chat`.
- Добавлены файлы `d.ts` для всех модулей. Инструменты статического анализа автоматически используют эти файлы объявлений для обеспечения правильной типизации и предоставления подсказок при работе с библиотекой. (пока-что тестовая)
- Добавлены методы в `Collection` - `keyAt`, `randomKey`, `reverse`, `sweep`, `partition`, `flatMap`, `mapValues`, `equals`, `concat`, `intersect`, `subtract`, `difference`

## Изменено
- В объекте `client` менше информации.
- Добавлена опция `offSetType`, по умолчанию установлена в `default`. Эта опция предназначена для новой механики `offset`. Если указывать другие значения, они применяются только в классе, унаследованном от `Map`. Пока-что это тестовая штука, в дальнейшем вы можете использовать эту фичу, или же сами это настраивать под себя как у `telegraf.js` (следующие обновления)
- Класс `Button` переименован в `Markup`.
- Константа `ChatRight` переименована в `ChatPermission`.
- Константа `Events` изменена под новые события.
- В ошибках `TelegramApiError` сообщения об ошибке теперь начинаются с маленькой буквы. Также изменен вид сообщений об ошибке.
- Класс `BaseClient` теперь можно импортировать из самой библиотеки, что позволяет создать свою собственную интересную библиотеку или реализовать свою систему событий и т.д.
- Класс `Request` теперь можно импортировать из самой библиотеки, что позволяет самостоятельно использовать запросы к API и создавать собственные приложения по-своему.

## Самое главное и интересное
- Класс `Collection` теперь является отдельной библиотекой "`@telegram.ts/collection`" от `telegramsjs`. Однако вам не нужно устанавливать ее вручную, она по-прежнему будет работать в `telegramsjs`.
- Функции для форматирования теперь являются отдельной библиотекой "`@telegram.ts/formatters`" от `telegramsjs`. Однако вам не нужно устанавливать ее вручную, она по-прежнему будет работать в `telegramsjs`.