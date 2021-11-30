const { errorHandler } = require('../helpers')
const getEmoji = require('get-random-emoji')

module.exports = () => async (ctx) => {
    try {
        emoji0 = getEmoji()
        emoji1 = getEmoji()
        emoji2 = getEmoji()
        emoji3 = getEmoji()
        emoji4 = getEmoji()
        emoji5 = getEmoji()

        var randomnumber = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        answer_emoji = "emoji" + randomnumber

        emoji_array = [[
            { text: emoji0, callback_data: 'captcha' + ' ' + 0 + ' ' + randomnumber },
            { text: emoji1, callback_data: 'captcha' + ' ' + 1 + ' ' + randomnumber },
            { text: emoji2, callback_data: 'captcha' + ' ' + 2 + ' ' + randomnumber }
        ],
        [
            { text: emoji3, callback_data: 'captcha' + ' ' + 3 + ' ' + randomnumber },
            { text: emoji4, callback_data: 'captcha' + ' ' + 4 + ' ' + randomnumber },
            { text: emoji5, callback_data: 'captcha' + ' ' + 5 + ' ' + randomnumber }
        ]]
        await ctx.reply(`@${ctx.from.username} Select ` + global[`emoji${randomnumber}`] + " This Emoji From Keyboard Below", {
            reply_markup: {
                inline_keyboard: emoji_array
            }
        }
        )
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}