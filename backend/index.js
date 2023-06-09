const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const { connectDB } = require("./db.config");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middlewares/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const Category = require("./models/category.model");
const Cart = require("./models/cart.model");
const token = "6010021020:AAGDrMwHEe_8Y0O7XJxpfWo2hyHnRBHcFW4";
const url = "https://7789-95-105-69-114.ngrok-free.app";
const bot = new TelegramBot(token, { polling: true });

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
connectDB();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(errorHandler);

app.listen(5000, () => console.log(`server started`));
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text == "/start") {
    await bot.sendMessage(chatId, "Кнопкаs", {
      reply_markup: {
        keyboard: [
          [{ text: "Каталог" }, { text: "Корзина" }, { text: "профиль" }],
          [{ text: "Поддержка" }, { text: "Настройки" }],
          [{ text: "Отзывы" }],
        ],
      },
    });
  }

  if (text == "Каталог") {
    const categories = await Category.find();
    await bot.sendMessage(chatId, "Каталог", {
      reply_markup: {
        inline_keyboard: categories.map((item) => [
          { text: item.title, web_app: { url: url + "/" + item.title } },
        ]),
      },
    });
  }

  if (text == "Корзина") {
    let cart = await Cart.findOne({ userName: msg.from.first_name }).populate(
      "items"
    );
    console.log(cart);
    if (cart) {
      cart.items.forEach((element) => {
        bot
          .sendPhoto(
            chatId,
            `https://ca1c-95-105-69-114.ngrok-free.app/${element.picture}`,
            {
              caption: `${element.name} цена: ${element.cost}`,
              reply_markup: {
                inline_keyboard: [[{ text: "❌", callback_data: element._id }]],
              },
            }
          )
          .then((data) => console.log(data));
      });
    } else {
      bot.sendMessage(
        chatId,
        `В корзине пусто 😔
      перейдите в Каталог, там много интересного`
      );
    }
    // console.log(cart);
    // return res.json(cart)
  }

  if (text == "Настройки") {
    await bot.sendMessage(chatId, "Настройки", {
      reply_markup: {
        keyboard: [
          [{ text: "Телефон" }, { text: "Адрес" }],
          [{ text: "Имя" }, { text: "Способо оплаты" }],
        ],
      },
    });
  }

  if (text == "Телефон") {
    const phoneNumber = await bot.sendMessage(
      msg.chat.id,
      "Ваш номер телефона",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
    bot.onReplyToMessage(msg.chat.id, phoneNumber.message_id, async (phoneMsg) => {
      const phone = phoneMsg.text;
      // save name in DB if you want to ...
      await bot.sendMessage(msg.chat.id, `ваш телефон успешно сохранён ${phone}!`);
  });
  }

  if (text == "Адрес") {
    const adressNumber = await bot.sendMessage(
      msg.chat.id,
      "Ваш адрес",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
    bot.onReplyToMessage(msg.chat.id, adressNumber.message_id, async (adressMsg) => {
      const adress = adressMsg.text;
      // save name in DB if you want to ...
      await bot.sendMessage(msg.chat.id, `ваш адрес успешно сохранён ${adress}!`);
  });
  }

  if (text == "/Имя") {
    const namePrompt = await bot.sendMessage(
      msg.chat.id,
      "Ваше имя ?",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
    bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
      const name = nameMsg.text;
      // save name in DB if you want to ...
      await bot.sendMessage(msg.chat.id, `Ваше имя ${name}!`);
  });
  }

  bot.on("callback_query", async (msg) => {
    console.log(msg);
    let cart = await Cart.findOne({ userName: msg.from.first_name }).populate(
      "items"
    );
    cart.items = cart.items.filter((item) => item._id != msg.data);
    await cart.save();
  });
});
