import { Client, GatewayIntentBits } from "discord.js";
import sendLongMessage from "../helpers.js";
import { env } from "../env.js";
import axios from "axios";

export default class DiscordClient {
    client = null;
    translator = null;
    maxMessageLength = 2000; // По умолчанию 2000 символов максимало можно отправить в сообщение(не знаю сколько с Nitro)

    constructor(translator) {
        this.translator = translator;

        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.client.login(env.discordToken);
    }

    async ready() {
        try {
            const subscribedChannel = await this.client.channels.fetch(
                env.channel
            );

            // Получаем последнее сообщение
            const messages = await subscribedChannel.messages.fetch({
                limit: 1,
            });
            const lastMessage = messages.first();

            if (lastMessage) {
                console.log(`Последнее сообщение: ${lastMessage.content}`);
                console.log(`Автор: ${lastMessage.author.tag}`);
                console.log(`Дата: ${lastMessage.createdAt}`);
            } else {
                console.log("В канале пока нет сообщений.");
            }
        } catch (err) {
            console.error("Ошибка при получении последнего сообщения:", err);
        }
    }

    async messageCreate(message) {
        if (message.author.bot) return;

        try {
            const channel = await this.client.channels.fetch(env.channel);

            if (message.channel.id === env.channel) {
                let actualMessage = "";

                if (message.reference) {
                    const messageId = message.reference.messageId;
                    const messageToTranslate =
                        message.messageSnapshots.get(messageId);

                    actualMessage = messageToTranslate.content;
                } else {
                    actualMessage = message.content;
                }

                const translatedText =
                    await this.translator.getTranslatedMessage(actualMessage);

                if (translatedText.length === 0) {
                    return;
                }

                // Если длина сообщения больше 2000 символов делаем его частями
                if (actualMessage.length > this.maxMessageLength) {
                    await sendLongMessage(channel, translatedText);
                } else {
                    channel.send(translatedText);
                }
            }
        } catch (err) {
            console.error("Ошибка при переводе текста:", err);
        }
    }

    async n8nMessageCreate(message) {
        if (message.author.bot) return;

        try {
            if (message.channel.id === env.channel) {
                let actualMessage = "";

                if (message.reference) {
                    const messageId = message.reference.messageId;
                    const messageToTranslate =
                        message.messageSnapshots.get(messageId);

                    actualMessage = messageToTranslate.content;
                } else {
                    actualMessage = message.content;
                }

                await axios.post(
                    "http://localhost:5678/webhook/discord-message",
                    {
                        content: actualMessage,
                    }
                );
            }
        } catch (err) {
            console.error("Ошибка при переводе текста:", err);
        }
    }
    async init() {
        this.client.once("ready", this.ready.bind(this));
        this.client.on("messageCreate", this.messageCreate.bind(this));
        // this.client.on("messageCreate", this.n8nMessageCreate.bind(this)); // n8n реализация через webhook
    }
}
