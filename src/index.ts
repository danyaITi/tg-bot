/** @format */

import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { commands, learnTableButtons } from "./options";
import { CommandEnum } from "./enums";

const token = process.env.TOKEN_BOT;

const bot = new TelegramBot(token ?? "", { polling: true });

bot.setMyCommands(commands);

const answers: Record<number, string> = {};

const startLearnTable = async (chatId: number) => {
  const firstNumber = Math.round(Math.random() * 10);
  const secondNumber = Math.round(Math.random() * 10);

  answers[chatId] = JSON.stringify(firstNumber * secondNumber);

  await bot.sendMessage(
    chatId,
    `Сколько будет ${firstNumber} * ${secondNumber} ?`
  );
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name;

  if (msg.text === CommandEnum.START) {
    await bot.sendMessage(
      chatId,
      `Приветсвую Вас, ${firstName}, этот бот создан, что бы поучить таблицу умножения или узнать погоду по вашей геопозиции.`
    );
  }

  if (msg.text === CommandEnum.LEARN) {
    await startLearnTable(chatId);
  }

  if (!msg.entities) {
    if (msg.text && isNaN(parseInt(msg.text))) {
      await bot.sendMessage(
        chatId,
        "Пожалуйста, напишите ответ числом или цифрой ⚠️",
        learnTableButtons
      );

      return;
    }

    if (msg.text === answers[chatId]) {
      await bot.sendMessage(chatId, "Правильно! 👍", learnTableButtons);
    } else {
      await bot.sendMessage(chatId, "Неправильно! 😔", learnTableButtons);
    }
  }
});

bot.on("callback_query", async (msg) => {
  const chatId = msg.message!.chat.id;
  const text = msg.data;

  if (text === CommandEnum.LEARN) {
    await startLearnTable(chatId);
  }
});
