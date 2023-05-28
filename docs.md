# Telegramsjs@0.7.0

## Fixes
- Renamed the method `deleted` to `remove`.
- Added typings to `d.ts` (not all of them).

## Changes
- The `deleted` method in the `TelegramBot` class has been renamed to `remove`.
- The `offSetType` parameter in the `TelegramBot` class will default to `time`.

## Additions
- Added the method `updateId` to the `TelegramBot` class (and others) - returns the last offset.
- Added the method `lastObject` to the `TelegramBot` class (and others) - returns the last offset object.
- Added the `CashSession` and `SimpleStorage` classes.
- Added the constant `SessionTypes` - types for storing offsets and more. Used for `offSetType`.
- Added the path `require('telegramsjs/session')` - only `SimpleStorage` and `SessionTypes` will be available.

## Under libraries
### @telegram.ts/collection@0.4.0
#### Additions
- Added the methods `equals`, `tap`, `random`, `at`, `lastKey`, `last`, `ensure`.
- [Documentation](https://telegram-ts-collection.surge.sh/)

### @telegram.ts/formatters@0.3.5
#### Additions
- Now you can import methods using `require('@telegram.ts/formatters/html')` or `require('@telegram.ts/formatters/markdownv')`.
- [Documentation](https://telegram-ts-formatters.surge.sh/)
- Added typings to `d.ts`.