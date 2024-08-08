/** @format */

import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const token = process.env.TOKEN_BOT;

const bot = new TelegramBot(token ?? "", { polling: true });

bot.on("message", (msg) => {
  if (msg.text) {
    bot.sendMessage(msg.chat.id, msg.text);
  }
});
