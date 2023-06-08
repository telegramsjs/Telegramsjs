# MessageCollector

This is a module that provides a `MessageCollector` class, which represents a message collector. The collector collects messages from a specific chat based on provided options.

## Installation

Install the `telegramsjs` module using npm:

```shell
npm install telegramsjs
```

## Usage

### Importing the module

```javascript
const { MessageCollector } = require('telegramsjs');
```

### Creating a new MessageCollector

```javascript
const options = {
  chatId: 123456789, // The ID of the chat to collect messages from
  filter: (message) => true, // The filter function to determine which messages to collect (optional)
  time: 60000, // The duration in milliseconds for the collector to run (optional, default: 60000)
  max: 10 // The maximum number of messages to collect (optional)
};

const collector = new MessageCollector(options);
```

### Handling a new message received by the collector

```javascript
collector.handleMessage(message);
```

Handles a new message received by the collector. If the message matches the specified chat ID and passes the filter function (if provided), it will be collected by the collector.

### Getting the collected messages

```javascript
const collectedMessages = collector.collected();
```

Returns an array containing the collected messages.

### Getting the count of collected messages

```javascript
const count = collector.count();
```

Returns the count of collected messages.

### Clearing the collected messages

```javascript
const success = collector.clear();
```

Clears the collected messages. Returns `true` if the collected messages are cleared successfully, `false` otherwise.

### Setting a new filter function for the collector

```javascript
const success = collector.setFilter(filter);
```

Sets a new filter function for the collector. The filter function determines which messages should be collected. Returns `true` if the filter function is set successfully, `false` otherwise.

### Setting a new duration for the collector to run

```javascript
const success = collector.setTime(time);
```

Sets a new duration in milliseconds for the collector to run. Returns `true` if the duration is set successfully, `false` otherwise.

### Setting a new maximum number of messages to collect

```javascript
const success = collector.setMax(max);
```

Sets a new maximum number of messages to collect. Returns `true` if the maximum number is set successfully, `false` otherwise.

### Checking if the collector is currently running

```javascript
const running = collector.isRunning();
```

Returns `true` if the collector is currently running, `false` otherwise.

### Stopping the message collector

```javascript
collector.stop();
```

Stops the message collector and clears any remaining intervals or listeners.

## Example

```javascript
const collectors = new Map();

bot.on('message', (m) => {
  const chatId = m.chat.id;

  let collector = collectors.get(chatId);

  if (!collector) {
    collector = m.createMessageCollector({
      chatId: chatId,
      filter: () => true,
      time: 60000,
      max: 10
    });

    collector.on('collected', (data) => {
      console.log(`Collected messages: ${data.count}`);
      console.log('Collected messages:', data.collectedMessages);
    });

    collector.on('interval', () => {
      console.log('One minute has passed');
    });

    collector.on('end', () => {
      console.log('Message collection completed');
      console.log('Collected messages:', collector.collected());
      collectors.delete(chatId); // Remove the collector from the Map upon completion
    });

    collector.on('error', (error) => {
      console.error('An error occurred:', error);
      collectors.delete(chatId); // Remove the collector from the Map upon error
    });

    collectors.set(chatId, collector);
  }

  // collector.handleMessage(m);
  // If using the class
});
```