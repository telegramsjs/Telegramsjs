import { Search } from '@telegram.ts/documentation';

const search = new Search('https://raw.githubusercontent.com/Sempai-07/Telegramsjs/main/src/BaseClient.d.ts');

(async () => {
  // Get the function declaration
  const functionDeclaration = await search.getFunction('sendPhoto');
  console.log(functionDeclaration);

  // Get the documentation link for the function
  const functionLink = await search.getFunctionLink('sendPhoto');
  console.log(functionLink);

  // Get the documentation link for an object
  const objectLink = await search.getObject('Message');
  console.log(objectLink);
})();

/**
sendPhoto(options: {
        chatId: number;
        threadId: number;
        photo: any;
        caption: string;
        parseMode: string;
        captionEntities: Array<object>;
        hasSpoiler: boolean;
        notification: boolean;
        content: boolean;
        replyToMessageId: number;
        allowReply: boolean;
        replyMarkup: object;
    }): Promise<object>
https://core.telegram.org/bots/api#sendphoto
https://core.telegram.org/bots/api#message
*/