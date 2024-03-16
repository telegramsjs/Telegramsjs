const def = require("./dist");
console.log(def)
const { TelegramTypeError } = require("./dist/core/util/TelegramError");
const { ErrorCodes } = require("./dist/core/util/ErrorCodes")

// throw new TelegramTypeError(ErrorCodes.InvalidType, "options.filter", "Function");

const { TelegramBot } = require("./dist");
const { Context } = require("./dist/core/context");
const { Reaction } = require("./dist/core/structures/");
const { MessageCollector, ReactionCollector } = require("./dist/core/structures/collector");

const { join } = require("node:path");
const { readFileSync } = require("node:fs");

const client = new TelegramBot(
  "6307555613:AAHcTdg7SkYTAEu7C0pvVslAqJwzP0UIj80",
);

// for (const array of new Array(500)) {
//   client.getMe()
//    .then(console.log)b
//    .catch(console.log);
// }

const rateLimitMap = new Map();

client.on("ready", async () => {
  await client.setMyCommands({
    commands: [
      {
        command: "/photo",
        description: "Тестим отправку файлов из локалки",
      },
    ],
  });
  console.log("Бот включился!");
});

client.on("disconnect", () => {
  console.log("Бот отключился!");
});

// client.on("message", async (ctx) => {
//   await ctx.react("👀")
//   await ctx.reply("Text")
// })

client.on("message", async (ctx) => {
  if (ctx?.text !== "/dow") return;
  const file = await client.getFile("AgACAgIAAx0CbCDJKwACFs5l9Ft0I7NBOobRJkYlN_SerhEZJAACjtYxGw0ioUsCjnCRGgJ2ywEAAwIAA3MAAzQE");
  console.log(await file.writeFile("./test.png", "promise"));
})

client.on("message", async (ctx) => {
  if (ctx?.text !== "/reaction") return;

  console.time("Ждём пока не нажмёт");

  const reaction = new Reaction(ctx.api);
  await reaction.awaitReaction({
    react: { emoji: "👀", reactionType: "new" },
    timeout: 60000,
    count: 3,
    onCallback: (ctx) =>
      ctx.sendMessage("Молодец! Спасибо за реакцию 60 секунд"),
    onError: (colleaction) =>
      ctx.sendMessage(`Ты даун! Как можно за 60 секунд не найти 2 реакции? Типа ${colleaction.size} найшол`),
    filter: ({ message_id }) => message_id === ctx.message_id,
  });

  console.timeEnd("Выполнилась");
});

client.on("message", async (ctx) => {
  if (ctx?.text !== "/photo") return;
  await ctx.sendPhoto(readFileSync(join("../aoitest/anime.mp4")));
  await ctx.sendPhoto(join(process.cwd(), "../aoitest/anime.mp4"));
  await ctx.sendPhoto(
    "https://media.discordapp.net/attachments/1061974394433441795/1215569463165067315/image0.jpg?ex=65fd3a48&is=65eac548&hm=c83dac7102c5e4e6e86e16e53e0a8ecbdb4418a3427aa19f5ca1992984a8a36b&",
  );
});

client.on("chat_join_request", (ctx) => console.log(ctx))

// client.on("message", async (ctx) => {
//   if (ctx?.text !== "/link") return;
//   console.log(await client.request("getChatInviteLink", {
//     chat_id: ctx.chat.id,
//     invite_link: "https://t.me/+p5ClgKZThHhlNzA6",
//   }));
// })

client.on("message", async (ctx) => {
  if (true) return;
  const collect = new MessageCollector(client, ctx, {
    filter: (ctx, ctx1) => { 
//      console.log(ctx1);
      return `${Math.random()}`[3] > 2 ? true : false;
    },
  });
  collect.collect(ctx);
  for await (const c of collect) {
    console.log("Interator", c)
  }
  if (ctx?.text !== "/coll") return;
//  console.log(collect);
  
  collect.on("collect", (ctx, collect) => console.log("collect:", collect?.toArray?.().length))
  
  collect.on("end", () => console.log("End..."));
  collect.on("ignore", () => console.log("Ignore..."));
  collect.on("dispose", () => console.log("Disponse..."));
});

client.on("message", async (ctx) => {
  if (true) return;
  const collect = new ReactionCollector(client, ctx, {
    filter: (ctx, ctx1) => { 
      return ctx.new_reaction?.length > 0 && `${Math.random()}`[3] > 2 ? true : false;
    },
  });
  collect.collect(ctx);
  for await (const c of collect) {
    console.log("Interator", c)
  }
  if (ctx?.text !== "/rea") return;
//  console.log(collect);
  
  collect.on("collect", (ctx, collect) => console.log("collect:", collect?.toArray?.().length))
  
  collect.on("end", () => console.log("End..."));
  collect.on("ignore", () => console.log("Ignore..."));
  collect.on("dispose", () => console.log("Disponse..."));
});

client.on("message", async (ctx) => {
//   if (!ctx.has("text", ctx)) {
//     ctx.text.toLowerCase();
//   }
//   console.log(ctx, ctx.entities);
  if (ctx?.text !== "/emoji") return;
  await ctx.api.getCustomEmojiStickers(["5877565553761062314"]).then(res => {
    console.log(res);
  })
})

client.on("rate_limit", (ctx) => {
  if (rateLimitMap.has(ctx.method)) return;

  console.log("Превышен лимит запросов:", ctx);
  //   Превышен лимит запросов:  {
  //     method: 'sendMessage',
  //     date: 2024-03-07T07:49:14.856Z,
  //     datestamp: 1709797754856,
  //     parameters: {
  //       chat_id: -1001814087979,
  //       text: 'Error',
  //       message_thread_id: undefined
  //     },
  //     error_code: 429,
  //     description: 'Too Many Requests: retry after 41',
  //     retry_after: 41,
  //     migrate_to_chat_id: undefined
  //   }
  rateLimitMap.set(ctx.method, true);
  client.disconnect(true);

  setTimeout(async () => {
    rateLimitMap.delete(ctx.method);
    client.login();
  }, ctx.retry_after * 1000);
});

client.login();
