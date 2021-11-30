const { errorHandler } = require("../helpers");

module.exports = () => async (ctx, next) => {
    try {
        ctx.session.pollTime = ctx.message.text
        await ctx.reply(`Enter The Title Of The Poll`)
        ctx.scene.enter("enter-pollText");
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}