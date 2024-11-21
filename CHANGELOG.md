# Changelog

# **4.5.0 - (2024-11-20)**

## **Bug Fixes**
- **InputFile:** fixed field names and argument validation ([f05bf32](https://github.com/telegramsjs/Telegramsjs/commit/f05bf32f1093c9c5fa18e169a21adea279918abb)).
- **WebhookClient:** resolved duplicate triggering of the "ready" event ([a820d97](https://github.com/telegramsjs/Telegramsjs/commit/a820d975a5cadf7a74c3df77677b1d372b382f8f)).
- **getStarTransactions:** typings returned value `StarTransactions` ([165eb5c](https://github.com/telegramsjs/Telegramsjs/commit/165eb5cc975c9f7202cfeb24ee9315bc24d69ae2)).
- **InlineKeyboardBuilder:** at least one optional field is required ([fc38ccb](https://github.com/telegramsjs/Telegramsjs/commit/fc38ccbcd34362f24cf66046b9c728f2e01ea97b)).
- **Version:** missing type annotations ([d48f78f](https://github.com/telegramsjs/Telegramsjs/commit/d48f78fd4a80cb056c0bad1ee0014447b37eae1c)).

## **Features**
- **VideoChatParticipantsInvited:** add `Symbol.iterator` for users ([84ed997](https://github.com/telegramsjs/Telegramsjs/commit/84ed997669b78818b99f54e0f9bf1335b3574c52)).
- **GiveawayWinners:** add `Symbol.iterator` for winners ([7a566e2](https://github.com/telegramsjs/Telegramsjs/commit/7a566e274ef1fe0a65c616201712553d8ff2ce94)).
- **StarTransactions:** add `Symbol.iterator` for transactions ([4dea43e](https://github.com/telegramsjs/Telegramsjs/commit/4dea43ed366e434cae987d5534eb162faa7795ff)).
- **Chat:** add `getUserBoosts` method ([d48d0ca](https://github.com/telegramsjs/Telegramsjs/commit/d48d0ca5824c515f268d25153bc67405c27ae7e4)).
- **User:** add `getChatBoosts` method ([2d70754](https://github.com/telegramsjs/Telegramsjs/commit/2d707542d780987e21420f693ac9b4eda1c51b22)).
- **ClientUser:** add `fetchStarTransactions` method ([d106fbc](https://github.com/telegramsjs/Telegramsjs/commit/d106fbc5261168606bee753e45e65257b16a4f8c)).
- **ChatShared:** add new methods ([de09b20](https://github.com/telegramsjs/Telegramsjs/commit/de09b2075a328082ce3dce5f12e712e6e6e87c50)).
- **SharedUser:** add `fetch`, `send`, `sendGift`, `saveInlineMessage`, `setStarSubscription`, `getChatBoosts` and `equals` method ([28117c1](https://github.com/telegramsjs/Telegramsjs/commit/28117c1f8364f21307ef612e8e74a7d7c3abc8fe))
- **fetch:** add `fullInfo` options ([8da3c51](https://github.com/telegramsjs/Telegramsjs/commit/8da3c51abb1cc1b84c74c8314a0a1833cf26d72f)).
- **ClientUser:** add fetch options ([23ac1ae](https://github.com/telegramsjs/Telegramsjs/commit/23ac1ae8a013c8cc3b17f15c9be9374ea5417349)).
- **InputFile:** add `fetch` method ([1a1456b](https://github.com/telegramsjs/Telegramsjs/commit/1a1456b4dc6dad0bc583ea2352c71aee16edb2a8)).

## **Refactor**
- **Array:** converted some fields to `Collections` for improved data handling of large arrays ([9fc6037](https://github.com/telegramsjs/Telegramsjs/commit/9fc6037dad2233978ba71ab132a0a6800a6b9c43)).
- **Collection:** introduced `ReadonlyCollection` to prevent mutation of essential data ([73a76f4](https://github.com/telegramsjs/Telegramsjs/commit/73a76f41271deae303e5cd53bc2bbb1105950bd2)).
- **TelegramClient:** `user` field now supports `null` values ([cb49cf3](https://github.com/telegramsjs/Telegramsjs/commit/cb49cf37f9b1919dba66d3562baf95acd1b9b4d4)).
- **disconnect:** now triggers even when using the error event ([86186ce](https://github.com/telegramsjs/Telegramsjs/commit/86186ce42288f7c317b186a483f7118518159692)).
- **errorHandler:** update error handling logic ([f47e03b](https://github.com/telegramsjs/Telegramsjs/commit/f47e03bb2f12d78c8bc0a0119aca4fb893fac5ea)).
- **Fetch data**: data retrieval logic ([3b978ee](https://github.com/telegramsjs/Telegramsjs/commit/3b978eed6a528d17743f584ef7688f30ad36cd1d)).
- **Prefix names:** all methods for struct classes prefixed with 'get' have been changed to 'fetch' ([5619dd1](https://github.com/telegramsjs/Telegramsjs/commit/5619dd1b87370ec6a21803e28b0ed2e1abe6ab8f)).

## **Updates**
- Support for API 8.0 ([cec95aa](https://github.com/telegramsjs/Telegramsjs/commit/cec95aad043575dbebb653a2262558e0f8aa5283)).
- **InputFile:** fix handling for download parameters to use class instances ([f32fb75](https://github.com/telegramsjs/Telegramsjs/commit/f32fb755fd564f3b224a190d8a9602a1384bd2d7)).
- **InputFile:** add fallback to fetch if `filePath` is missing ([1ac66f2](https://github.com/telegramsjs/Telegramsjs/commit/1ac66f23bf65d47d8941d5d8d8d525f79f7355ab)).
- Bump version of `@telegram.ts/types` to `1.18.2` ([04d68de](https://github.com/telegramsjs/Telegramsjs/commit/04d68de607fcf3a5544bc3f705b9d83df039df18)).

----

# **4.4.0 - (2024-11-01)**

## **Bug Fixes**
- Request params for `fetch` ([6d2f5cd](https://github.com/telegramsjs/Telegramsjs/commit/6d2f5cdd56484791ad0dca212da4e8baf89d9cf9))
- Array media to send https ([2957827](https://github.com/telegramsjs/Telegramsjs/commit/29578271c3c687fde71691047895d2823e3125ca), [6589ee2](https://github.com/telegramsjs/Telegramsjs/commit/6589ee2cbedd4cd4ea0f2d0f62ec2bffbc086b4e))
- **Collector:** returns value for `asyncIterator` ([184070e](https://github.com/telegramsjs/Telegramsjs/commit/184070e23844dc4d1491498b50a6e08ca9170af4))
- **ChosenInlineResult:** `inlineMessageId` optional. Remove `answerQuery` ([35780d5](https://github.com/telegramsjs/Telegramsjs/commit/35780d5c39b788bb83b7b80951c4379f6dafac6e))
- **MediaData:** JSON fields parsing ([5e021fc](https://github.com/telegramsjs/Telegramsjs/commit/5e021fc31e8a19fd0e2be7a7f55699382bca8121))

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
