const TG = require('telegram-bot-api')

const api = new TG(
  {
    token: '6235245129:AAGzbVoV0CAls__hnFh3xS2yDif1G7TK7Ws',
    /*http_proxy: {
        host: '192.168.0.1',
        port: 3128,
    }*/
  }
)

api.setMessageProvider(new TG.WebhookMessageProvider({
    //privateKey: path.join(__dirname, './private.key'),
    //publicKey: path.join(__dirname, './public.key'),
    host: '192.168.0.1',
    port: 3128
}))

api.start()

api.on('update', up => {
  console.log(up);
})

console.log(api)

api.getMe()
.then(data => {
  console.log(data)
})
.catch(data => {
  console.log(data)
})



setTimeout(function() {
  process.exit();
}, 60000);