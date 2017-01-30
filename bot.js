var TelegramBot = require('node-telegram-bot-api');
var brain = require('./brain')
var token = '315355339:AAELo4yAS1sCh5g6RpKu63tcq-Oo9igOyOg';

var bot = new TelegramBot(token, { polling: true });

var procesar_mensaje_telegram = function(msg, match) {
  console.log('msg:', msg, 'match:', match)

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever" 

  brain.procesar(match[1], msg)
    // send back the matched "whatever" to the chat 
  bot.sendMessage(chatId, resp);
}

bot.onText(/\/gaste (.+)/, procesar_mensaje_telegram);
bot.onText(/\/reportar (.+)/, procesar_mensaje_telegram);
bot.onText(/\/spent (.+)/, procesar_mensaje_telegram);
bot.onText(/\/report (.+)/, procesar_mensaje_telegram);
bot.onText(/\/remember (.+)/, procesar_mensaje_telegram);
bot.onText(/\/spended|spend (.+)/, procesar_mensaje_telegram);

console.log('Bot listening..')