# Changelog

# **4.4.0 - (2024-11-01)**

## **Bug Fixes**
- Request params for `fetch` ([6d2f5cd](https://github.com/telegramsjs/Telegramsjs/commit/6d2f5cdd56484791ad0dca212da4e8baf89d9cf9))
- Array media to send https ([2957827](https://github.com/telegramsjs/Telegramsjs/commit/29578271c3c687fde71691047895d2823e3125ca), [6589ee2](https://github.com/telegramsjs/Telegramsjs/commit/6589ee2cbedd4cd4ea0f2d0f62ec2bffbc086b4e))
- **Collector:** returns value for `asyncIterator` ([184070e](https://github.com/telegramsjs/Telegramsjs/commit/184070e23844dc4d1491498b50a6e08ca9170af4))
- **ChosenInlineResult:** `inlineMessageId` optional. Remove `answerQuery` ([35780d5](https://github.com/telegramsjs/Telegramsjs/commit/35780d5c39b788bb83b7b80951c4379f6dafac6e))
- **MediaData:** JSON fields parsing ([5e021fc](https://github.com/telegramsjs/Telegramsjs/commit/5e021fc31e8a19fd0e2be7a7f55699382bca8121))
- 

## **Features**
- Add events `rawUpdates` ([e92e0f1](https://github.com/telegramsjs/Telegramsjs/commit/e92e0f1de1a50eb1827b8542aa68c3e58b28cc21))
- Add send media parameters for `send` method ([014c3a3](https://github.com/telegramsjs/Telegramsjs/commit/014c3a3432d4c790b4d6a2a5336463c328f2f8c3))
- **Poll:** add `close` ([9a676ad](https://github.com/telegramsjs/Telegramsjs/commit/9a676ad82ba6c71730c55eb77522b08a5af9e0e2))
- **TelegramClient:** add `Symbol.asyncDisponse` ([37a5a6a](https://github.com/telegramsjs/Telegramsjs/commit/37a5a6a2b70f4a92e5e3192ae34107556c64f618))
- **BusinessConnection:** add `send` ([bfa535d](https://github.com/telegramsjs/Telegramsjs/commit/bfa535db577e533709e1161e05dbddc72016985e))
- **BaseManager:** add filter for cache ([10a9178](https://github.com/telegramsjs/Telegramsjs/commit/10a91786bce728806a0def7ea605ee4e19934902))
- **InlineQuery:** add `answerQuery` ([35780d5](https://github.com/telegramsjs/Telegramsjs/commit/35780d5c39b788bb83b7b80951c4379f6dafac6e))
- **Collector:** events car now acept asynchronous functions ([96aaea6](https://github.com/telegramsjs/Telegramsjs/commit/96aaea668eb62dd80114c00f2f8cf8fdb1f39636))
- **ReactionCollector:** the `users` fields must now be an array ([96aaea6](https://github.com/telegramsjs/Telegramsjs/commit/96aaea668eb62dd80114c00f2f8cf8fdb1f39636))
- **KeyboardBuilder, InlineKeyboardBuilder:** Add `combine`, `toJSON` ([969333c](https://github.com/telegramsjs/Telegramsjs/commit/969333cdfa3a589be9e46c6a0673a44154cf31dd))
- **KeyboardBuilder:** add now check `equals` ([969333c](https://github.com/telegramsjs/Telegramsjs/commit/969333cdfa3a589be9e46c6a0673a44154cf31dd))
- **KeyboardBuilder:** some fields became optional ([e2d3ea5](https://github.com/telegramsjs/Telegramsjs/commit/e2d3ea553ba883d3e0919cbfe0670456cd324082))
- Add helpers classes `InputMessageContentBuilder`, `InlineQueryResultBuilder`, `InlineQueryResultCachedBuilder` ([b1520f3](https://github.com/telegramsjs/Telegramsjs/commit/b1520f3ec9360e90ef32099ebc3bec5ec7fc36ac))

## **Refactor**
- Support api 7.11 ([7169314](https://github.com/telegramsjs/Telegramsjs/commit/716931437f15b5a630f6c8c162d4375e3b58bf8d))
- Convert individual parameters to object structure ([a772144](https://github.com/telegramsjs/Telegramsjs/commit/a7721447d7450bb20eba9266944731b62f35d26b))
- `Symbol.iterator` to some classes ([e7f0193](https://github.com/telegramsjs/Telegramsjs/commit/e7f01933f06897d7f98ff4f51e98424dfdf406d5))
- Add `languageCode` type ([9d8c19f](https://github.com/telegramsjs/Telegramsjs/commit/9d8c19f7351a2b0ac00d94c99565365cff9a23f7))
- `InlineKeyboard` renamed `InlineKeyboardBuilder` and `Keyboard` renamed `KeyboardBuilder` ([b1520f3](https://github.com/telegramsjs/Telegramsjs/commit/b1520f3ec9360e90ef32099ebc3bec5ec7fc36ac))

## **Typings**
- Fix parameters for `linkPreviewOptions` ([e756585](https://github.com/telegramsjs/Telegramsjs/commit/e756585e7a8ed4afb8b518ec7f0f3cbeb4442f34))
