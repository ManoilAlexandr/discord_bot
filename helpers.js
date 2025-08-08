/**  Т.к. дискорд ограничивает кол-во сообщений которое можно послать в 2000 символов(по крайней мере без Nitro),
необходима функция разделения сообщения на части */
function splitTextByNearestMarker(text, maxLength) {
    const markers = ["###", "##"];
    const result = [];

    while (text.length > maxLength) {
        let splitIndex = -1;
        for (const marker of markers) {
            const index = text.lastIndexOf(marker, maxLength);
            if (index > splitIndex) {
                splitIndex = index;
            }
        }

        if (splitIndex <= 0) {
            splitIndex = maxLength;
        }

        const chunk = text.slice(0, splitIndex).trim();
        if (!chunk) break;
        result.push(chunk);

        text = text.slice(splitIndex).trim();
    }

    if (text.length > 0) {
        result.push(text);
    }

    return result;
}

/** Функция отправки длинных сообщений */
export default async function sendLongMessage(channel, text, maxLength = 2000) {
    const chunks = splitTextByNearestMarker(text, maxLength);

    for (const chunk of chunks) {
        await channel.send(chunk);
    }
}
