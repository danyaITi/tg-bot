/** @format */

import { SendMessageOptions } from "node-telegram-bot-api";
import { CommandEnum } from "../enums";

type Command = {
  command: CommandEnum;
  description: string;
};

export const commands: Command[] = [
  { command: CommandEnum.START, description: "Приветствие" },
  { command: CommandEnum.LEARN, description: "Учить таблицу умножения" },
  {
    command: CommandEnum.WEATHER,
    description: "Узнать погоду по местоположению",
  },
];

export const learnTableButtons: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Попробовать еще раз", callback_data: CommandEnum.LEARN }],
    ],
  },
};
