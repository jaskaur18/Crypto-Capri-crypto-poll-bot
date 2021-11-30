const { errorHandler } = require("../helpers");
const { Keyboard, Key } = require("telegram-keyboard")

module.exports = () => async (ctx, next) => {
    try {
        ctx.session.pollText = ctx.message.text
        await ctx.reply(`Good Now Enter Poll Option Button ex-
option1
option2
option3
option4`)
        ctx.scene.enter("enter-pollButton");
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}