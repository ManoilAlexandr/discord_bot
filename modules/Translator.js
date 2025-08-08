import axios from "axios";
import { env } from "../env.js";

export class DeepLTranslator {
    async getTranslatedMessage(message) {
        try {
            const response = await axios.post(
                "https://api-free.deepl.com/v2/translate",
                new URLSearchParams({
                    text: message,
                    target_lang: "RU",
                }),
                {
                    headers: {
                        Authorization: `DeepL-Auth-Key ${env.deepl}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.data.translations[0].text;
        } catch (error) {
            console.error(
                "Ошибка перевода:",
                error.response?.data || error.message
            );
            throw error;
        }
    }
}

export class LibreTranslator {
    async getTranslatedMessage(message) {
        try {
            const response = await axios.post(
                "https://translation.googleapis.com/language/translate/v2",
                {
                    q: message,
                    source: "en",
                    target: "ru",
                    format: "html",
                },
                {
                    params: { key: env.google },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            console.log(response.data.data.translations[0].translatedText);

            return response.data.data.translations[0].translatedText;
        } catch (error) {
            console.error(
                "Ошибка перевода:",
                error.response?.data || error.message
            );
            throw error;
        }
    }
}

export class Translator {
    translator = null;
    constructor(translator) {
        this.translator = translator;
    }

    getTranslatedMessage(message) {
        return this.translator.getTranslatedMessage(message);
    }
}
