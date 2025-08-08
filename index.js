import DiscordClient from "./modules/Discord.js";
import { Translator, DeepLTranslator } from "./modules/Translator.js";

const translator = new Translator(new DeepLTranslator());
const discord = new DiscordClient(translator);

discord.init();
