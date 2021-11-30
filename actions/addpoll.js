const { errorHandler } = require('../helpers')

module.exports = () => async (ctx) => {
    if (ctx.chat.type != "private") return
    try {
        ctx.deleteMessage().catch(console.log)
        userExits = await db.collection("userdata").findOne({
            _id: ctx.from.id
        })
        if (!userExits)
            return ctx.reply("User Not Found /start To Restart The Bot.")
        await ctx.reply("Enter Poll Time ex - \n1990-12-01 02:45 PM\n1990-12-02 02:45 PM \ntrue for instant Active")
        ctx.scene.enter("enter-pollTime")
    }
    catch (e) {
        errorHandler(err, ctx)
    }

}