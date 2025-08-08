import * as dotenv from "dotenv";
dotenv.config();

export const env = {
    discordToken: process.env.DISCORD_TOKEN,
    channel: process.env.SUBSCRIBED_CHANNEL_ID,
    deepl: process.env.DEEPL_API_KEY,
    google: process.env.GOOGLE_API_KEY,
};
